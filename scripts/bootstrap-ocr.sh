#!/usr/bin/env bash
set -eu

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
tools_root="$repo_root/.tools"
ocr_root="$tools_root/ocr/root"
deb_root="$tools_root/ocr/debs"
uv_cache="$tools_root/uv-cache"
uv_python="$tools_root/uv-python"

mkdir -p "$tools_root/uv" "$ocr_root" "$deb_root" "$uv_cache" "$uv_python"

if [ ! -x "$tools_root/uv/uv" ]; then
  installer="$(mktemp)"
  curl -LsSf https://astral.sh/uv/install.sh -o "$installer"
  UV_UNMANAGED_INSTALL="$tools_root/uv" sh "$installer"
  rm "$installer"
fi

packages="
cdebconf fonts-croscore fonts-freefont-otf fonts-freefont-ttf
fonts-liberation fonts-noto-core fonts-noto-mono fonts-texgyre
fonts-urw-base35 ghostscript libarchive13t64 libdebian-installer4
libdeflate0 libfontenc1 libgif7 libgomp1 libgs-common libgs10
libgs10-common libice6 libicu78 libidn12 libijs-0.35 libjbig0
libjbig2dec0 libjpeg-turbo8 libjpeg8 libleptonica6 liblerc4
libopenjp2-7 libpaper2 libqpdf30 libsm6 libtesseract5 libtextwrap1
libtiff6 libwebp7 libwebpmux3 libxt6t64 lsb-base poppler-data qpdf
tesseract-ocr tesseract-ocr-eng tesseract-ocr-fas tesseract-ocr-osd
xfonts-encodings xfonts-utils
"

if [ ! -x "$ocr_root/usr/bin/tesseract" ]; then
  (
    cd "$deb_root"
    # shellcheck disable=SC2086
    apt-get download $packages
  )
  for package in "$deb_root"/*.deb; do
    dpkg-deb -x "$package" "$ocr_root"
  done
fi

if [ ! -x "$tools_root/ocr/venv/bin/python" ]; then
  UV_CACHE_DIR="$uv_cache" UV_PYTHON_INSTALL_DIR="$uv_python" \
    "$tools_root/uv/uv" python install 3.12
  UV_CACHE_DIR="$uv_cache" UV_PYTHON_INSTALL_DIR="$uv_python" \
    "$tools_root/uv/uv" venv --python 3.12 "$tools_root/ocr/venv"
fi
UV_CACHE_DIR="$uv_cache" UV_PYTHON_INSTALL_DIR="$uv_python" \
  "$tools_root/uv/uv" pip install \
  --python "$tools_root/ocr/venv/bin/python" ocrmypdf==17.8.1

node "$repo_root/scripts/research-ocr.js" doctor
