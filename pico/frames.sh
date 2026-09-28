#!/usr/bin/env bash
# Parte o voo em frames WebP para o scrub.
# Uso: bash frames.sh voo.mp4 [fps] [largura] [qualidade]
# Escreve numa pasta nova por corrida (frames-<data>) e aponta frames/ para ela, sem apagar nada.
set -e
VIDEO="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
FPS="${2:-10}"; LARG="${3:-1600}"; QUAL="${4:-72}"
cd "$(dirname "$0")"
DEST="frames-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEST"
ffmpeg -loglevel error -i "$VIDEO" -vf "fps=$FPS,scale=$LARG:-2:flags=lanczos" -c:v libwebp -quality $QUAL -compression_level 6 "$DEST/f_%04d.webp"
N=$(ls "$DEST" | grep -c '^f_')
cp "$DEST/$(ls "$DEST" | grep '^f_' | sort | tail -1)" "$DEST/fim.webp"
if [ -d frames ] && [ ! -L frames ]; then mv frames "frames-antes-$(date +%s)"; fi
if [ -L frames ]; then unlink frames; fi
cp -r "$DEST" frames
sed -i -E "s/window.__TOTAL_FRAMES__ \|\| [0-9]+/window.__TOTAL_FRAMES__ || $N/" index.html
du -ch frames/f_*.webp | tail -1
echo "$N frames em $DEST (copiados para frames/)"
