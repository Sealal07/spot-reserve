#!/bin/sh

set -e

echo "Waiting for database..."

python -m app.seed_db

echo "Starting FastAPI..."
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload