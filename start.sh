#!/usr/bin/env bash
# start.sh – start backend + frontend (Linux / macOS)
# Usage:  bash start.sh
set -euo pipefail

PYTHON=python3

echo "=============================================="
echo "  Film Revenue Analyzer – Starting Services"
echo "=============================================="
echo ""

# Start backend in background
echo "Starting Backend (FastAPI on :5000)..."
$PYTHON backend/main.py &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

sleep 2

# Start frontend in background
echo "Starting Frontend (React on :3000)..."
(cd frontend && npm start) &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "Services started:"
echo "  Frontend : http://localhost:3000"
echo "  Backend  : http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both services."

# Wait and propagate Ctrl+C to children
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM
wait
