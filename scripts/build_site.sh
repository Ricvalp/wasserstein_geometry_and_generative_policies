#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ASSET_VERSION="20260603"

mkdir -p docs/assets docs/definitions docs/explanations docs/proofs

pandoc main.tex \
  --from latex \
  --to html5 \
  --standalone \
  --toc \
  --mathjax \
  --css "assets/site.css?v=${ASSET_VERSION}" \
  --include-after-body scripts/include-preview.html \
  --metadata title="Wasserstein Geometry and Generative Policies" \
  --output docs/index.html

cp main.pdf docs/main.pdf
cp definitions/*.pdf docs/definitions/
cp explanations/*.pdf docs/explanations/
cp proofs/*.pdf docs/proofs/

for source in definitions/*.tex; do
  target="docs/definitions/$(basename "${source%.tex}").html"
  pandoc "$source" \
    --from latex \
    --to html5 \
    --standalone \
    --mathjax \
    --css "../assets/site.css?v=${ASSET_VERSION}" \
    --metadata title="$(basename "${source%.tex}" | tr '_' ' ')" \
    --output "$target"
done

for source in explanations/*.tex; do
  target="docs/explanations/$(basename "${source%.tex}").html"
  pandoc "$source" \
    --from latex \
    --to html5 \
    --standalone \
    --mathjax \
    --css "../assets/site.css?v=${ASSET_VERSION}" \
    --metadata title="$(basename "${source%.tex}" | tr '_' ' ')" \
    --output "$target"
done

for source in proofs/*.tex; do
  target="docs/proofs/$(basename "${source%.tex}").html"
  pandoc "$source" \
    --from latex \
    --to html5 \
    --standalone \
    --mathjax \
    --css "../assets/site.css?v=${ASSET_VERSION}" \
    --metadata title="$(basename "${source%.tex}" | tr '_' ' ')" \
    --output "$target"
done
