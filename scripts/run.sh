#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
MODE="${MODE:-foreground}"
LOG_DIR="${LOG_DIR:-.logs}"
LOG_FILE="${LOG_FILE:-$LOG_DIR/next-dev.log}"

if [[ ! -d node_modules ]]; then
  echo "[run] node_modules not found. running setup first..."
  bash scripts/setup.sh
fi

if [[ ! -x node_modules/.bin/next ]]; then
  echo "[run] Next.js binary is missing. please run setup again." >&2
  exit 1
fi

CMD=(npm run dev -- -H "$HOST" -p "$PORT")

if [[ "$MODE" == "background" ]]; then
  mkdir -p "$LOG_DIR"
  echo "[run] starting Next.js in background on http://${HOST}:${PORT}"
  nohup "${CMD[@]}" >"$LOG_FILE" 2>&1 &
  PID=$!
  echo "[run] pid: $PID"
  echo "[run] log: $LOG_FILE"
  echo "[run] follow log: tail -f $LOG_FILE"
  exit 0
fi

echo "[run] starting Next.js dev server on http://${HOST}:${PORT}"
set +e
"${CMD[@]}"
EXIT_CODE=$?
set -e

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "[run] dev server exited with code $EXIT_CODE" >&2
  echo "[run] check: PORT conflict, dependency install status, or runtime errors." >&2
  echo "[run] for detached run: MODE=background bash scripts/run.sh" >&2
fi

exit $EXIT_CODE
