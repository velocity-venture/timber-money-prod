#!/bin/bash
# Start SQS Textract Worker
# Usage: ./start_sqs_worker.sh

echo "🚀 Starting SQS Textract Worker..."

# Kill any existing worker
pkill -f "python.*worker_sqs.py" 2>/dev/null && echo "   Stopped existing worker"

# Start worker with proper logging
nohup python3 -u worker_sqs.py > worker_sqs.log 2>&1 < /dev/null &
WORKER_PID=$!

# Detach from shell
disown $WORKER_PID 2>/dev/null || true

sleep 2

# Verify it's running
if ps -p $WORKER_PID > /dev/null 2>&1; then
    echo "✅ Worker started successfully!"
    echo "   PID: $WORKER_PID"
    echo "   Queue: timber-textract-queue"
    echo "   Log: worker_sqs.log"
    echo ""
    echo "📊 Monitor with: tail -f worker_sqs.log"
    echo "🛑 Stop with: pkill -f worker_sqs.py"
else
    echo "❌ Worker failed to start"
    echo "📝 Check worker_sqs.log for errors"
    exit 1
fi
