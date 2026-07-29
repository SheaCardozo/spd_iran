#!/usr/bin/env bash
set -eu

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
tools_root="$repo_root/.tools"
uv_cache="$tools_root/uv-cache"
uv_python="$tools_root/uv-python"
venv="$tools_root/transcription/venv"

if [ ! -x "$tools_root/uv/uv" ]; then
  echo "Run scripts/bootstrap-ocr.sh first to install the repository-local uv binary." >&2
  exit 1
fi

if [ ! -x "$venv/bin/python" ]; then
  UV_CACHE_DIR="$uv_cache" UV_PYTHON_INSTALL_DIR="$uv_python" \
    "$tools_root/uv/uv" venv --python "$tools_root/ocr/venv/bin/python" "$venv"
fi

UV_CACHE_DIR="$uv_cache" UV_PYTHON_INSTALL_DIR="$uv_python" \
  "$tools_root/uv/uv" pip install \
  --python "$venv/bin/python" faster-whisper==1.2.1

"$venv/bin/python" -c \
  "import faster_whisper; print('faster-whisper', faster_whisper.__version__)"
