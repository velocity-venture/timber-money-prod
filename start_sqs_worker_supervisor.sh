#!/usr/bin/env bash
while true; do
  python3 -u worker_sqs.py >> worker_sqs.log 2>&1
  echo "$(date -u) Worker exited with code $?. Respawning in 5s..." >> worker_sqs.log
  sleep 5
done
