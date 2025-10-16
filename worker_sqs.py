#!/usr/bin/env python3
"""
Simple SQS -> Textract worker.
- Polls SQS 'timber-textract-queue'
- For each message expects JSON with either:
  - document_id  (will look up source_path in DB)
  - s3_path or s3_uri or s3Key (s3://bucket/key or bucket/key)
  - plain key/path text
- Calls Textract (sync DetectDocumentText) using S3 or local bytes
- Writes simple analysis JSON to documents.analysis_data and sets status='completed' (or 'failed')
- Uses psql CLI to update DB (no extra Python DB libs required)
"""
import os, time, json, subprocess, sys, boto3, base64
from datetime import datetime

REGION = os.getenv("AWS_REGION", "us-east-1")
QUEUE_NAME = os.getenv("SQS_QUEUE_NAME", "timber-textract-queue")
DB_URL = os.getenv("DATABASE_URL")

if not DB_URL:
    print("ERROR: DATABASE_URL not set"); sys.exit(1)

sqs = boto3.client("sqs", region_name=REGION)
textract = boto3.client("textract", region_name=REGION)
s3 = boto3.client("s3", region_name=REGION)

def get_queue_url():
    return sqs.get_queue_url(QueueName=QUEUE_NAME)["QueueUrl"]

def run_psql_query(q):
    p = subprocess.run(["psql", DB_URL, "-t", "-A", "-c", q], capture_output=True, text=True)
    if p.returncode != 0:
        raise RuntimeError(f"psql error: {p.stderr.strip()}")
    return p.stdout.strip()

def parse_s3_uri(s):
    s = s.strip()
    if s.startswith("s3://"):
        parts = s[5:].split("/",1)
        return parts[0], parts[1] if len(parts)>1 else ""
    # try "bucket/key..." if two parts and bucket looks like aws bucket (no dots required)
    if "/" in s and not s.startswith("/"):
        # treat as bucket/key if it looks like bucket (heuristic)
        parts = s.split("/",1)
        return parts[0], parts[1]
    return None, s  # None bucket means not an s3 uri

def textract_from_s3(bucket, key):
    resp = textract.detect_document_text(Document={'S3Object': {'Bucket': bucket, 'Name': key}})
    # collect text blocks
    lines = []
    for b in resp.get("Blocks", []):
        if b.get("BlockType") == "LINE":
            lines.append(b.get("Text",""))
    return {"text": "\n".join(lines), "full_response": resp}

def textract_from_bytes(data_bytes):
    resp = textract.detect_document_text(Document={'Bytes': data_bytes})
    lines = []
    for b in resp.get("Blocks", []):
        if b.get("BlockType") == "LINE":
            lines.append(b.get("Text",""))
    return {"text": "\n".join(lines), "full_response": resp}

def update_document_completed(doc_id, analysis_json):
    now = datetime.utcnow().isoformat()
    safe_json = analysis_json.replace("'", "''")
    q = f"UPDATE documents SET status='completed', analysis_data = '{safe_json}', processed_at = now() WHERE id = '{doc_id}' RETURNING id;"
    result = run_psql_query(q)
    if not result or result.strip() == '':
        raise RuntimeError(f"Document {doc_id} not found in database - UPDATE affected 0 rows")
    return result

def update_document_failed(doc_id, msg):
    safe_msg = msg.replace("'", "''")
    q = f"UPDATE documents SET status='failed', last_error = '{safe_msg}', last_error_at = now() WHERE id = '{doc_id}' RETURNING id;"
    result = run_psql_query(q)
    if not result or result.strip() == '':
        raise RuntimeError(f"Document {doc_id} not found in database - UPDATE affected 0 rows")
    return result

def find_doc_by_source(source):
    q = f"SELECT id, source_path FROM documents WHERE source_path LIKE '%{source}%' LIMIT 1;"
    out = run_psql_query(q)
    if not out:
        return None, None
    parts = out.split("|")
    if len(parts)==2:
        return parts[0].strip(), parts[1].strip()
    # fallback: only id returned
    return parts[0].strip(), source

def process_message(body):
    # try parse JSON
    doc_id = None
    source = None
    bucket = None
    key = None
    try:
        payload = json.loads(body)
    except Exception:
        payload = None

    if payload and isinstance(payload, dict):
        doc_id = payload.get("document_id") or payload.get("id") or payload.get("documentId")
        source = payload.get("source_path") or payload.get("sourcePath") or payload.get("s3_path") or payload.get("s3_uri") or payload.get("s3Key") or payload.get("key")
    else:
        source = body.strip()

    # if doc_id present, lookup source_path in DB
    if doc_id and (not source):
        try:
            q = f"SELECT source_path FROM documents WHERE id='{doc_id}' LIMIT 1;"
            src = run_psql_query(q)
            source = src.strip()
        except Exception as e:
            print("DB lookup failed for id", doc_id, e)
            raise

    # if source looks like s3 uri, parse
    if source:
        b, k = parse_s3_uri(source)
        if b:
            bucket, key = b, k
        else:
            # could be local file path
            key = source

    # If we don't have doc_id, try to find doc by source
    if not doc_id and source:
        found_id, _ = find_doc_by_source(source)
        if found_id:
            doc_id = found_id

    if not doc_id:
        raise RuntimeError("No document id found or matched in DB for message")

    print("Processing doc:", doc_id, "source:", source, "s3:", (bucket, key))

    # Attempt Textract
    try:
        if bucket:
            analysis = textract_from_s3(bucket, key)
        else:
            # try local file
            if os.path.exists(key):
                with open(key, "rb") as f:
                    data = f.read()
                analysis = textract_from_bytes(data)
            else:
                # try if source is "bucket/key" with S3 bucket override env
                s3_bucket_env = os.getenv("S3_BUCKET")
                if s3_bucket_env and "/" in key:
                    bparts = key.split("/",1)
                    analysis = textract_from_s3(s3_bucket_env, bparts[1])
                else:
                    raise RuntimeError("Cannot find file locally and no S3 bucket info")
        # prepare simple analysis JSON
        simple = {"extracted_text": analysis.get("text",""), "textract_blocks_count": len(analysis.get("full_response",{}).get("Blocks",[]))}
        analysis_json = json.dumps(simple)
        update_document_completed(doc_id, analysis_json)
        return True, None
    except Exception as e:
        try:
            update_document_failed(doc_id, str(e))
        except Exception:
            pass
        return False, str(e)

def main():
    queue_url = get_queue_url()
    print("SQS worker started, queue:", queue_url)
    while True:
        try:
            resp = sqs.receive_message(QueueUrl=queue_url, MaxNumberOfMessages=1, WaitTimeSeconds=20, VisibilityTimeout=120)
            msgs = resp.get("Messages", [])
            if not msgs:
                continue
            for m in msgs:
                body = m.get("Body","")
                receipt = m.get("ReceiptHandle")
                print("MSG:", body[:200])
                try:
                    ok, err = process_message(body)
                    if ok:
                        sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=receipt)
                        print("Processed and deleted message")
                    else:
                        print("Processing failed:", err)
                        # do not delete -> will be retried and eventually go to DLQ
                except Exception as e:
                    print("Fatal processing error:", e)
                    # do not delete; let SQS retry
        except KeyboardInterrupt:
            print("Stopping worker.")
            sys.exit(0)
        except Exception as e:
            print("SQS poll/process error:", e)
            time.sleep(5)

if __name__ == "__main__":
    main()
