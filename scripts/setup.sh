#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[setup] project root: $ROOT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "[setup] error: node is not installed." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[setup] error: npm is not installed." >&2
  exit 1
fi

if [[ -f package-lock.json ]]; then
  echo "[setup] installing dependencies with npm ci..."
  npm ci
else
  echo "[setup] package-lock.json not found. installing dependencies with npm install..."
  npm install
fi

echo "[setup] done. run the app with: bash scripts/run.sh"
