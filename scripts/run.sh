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
set +e
npm run dev -- -H "$HOST" -p "$PORT"
EXIT_CODE=$?
set -e

echo "[run] Next.js dev server stopped (exit code: ${EXIT_CODE})"
if [[ $EXIT_CODE -ne 0 ]]; then
  echo "[run] check 1) dependency install 2) port conflict 3) runtime errors" >&2
fi

exit $EXIT_CODE
