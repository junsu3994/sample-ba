#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"

if [[ ! -d node_modules ]]; then
  echo "[run] node_modules not found. running setup first..."
  bash scripts/setup.sh
fi

if [[ ! -x node_modules/.bin/next ]]; then
  echo "[run] Next.js binary is missing. please run setup again." >&2
  exit 1
fi

echo "[run] starting Next.js dev server on http://${HOST}:${PORT}"
echo "[run] open from another device with: http://<SERVER_IP>:${PORT}"

echo "[run] command: ./node_modules/.bin/next dev -H ${HOST} -p ${PORT}"
exec ./node_modules/.bin/next dev -H "$HOST" -p "$PORT"
