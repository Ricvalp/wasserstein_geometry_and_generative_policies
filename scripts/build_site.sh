#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p docs/assets docs/definitions docs/explanations

pandoc main.tex \
  --from latex \
  --to html5 \
  --standalone \
  --toc \
  --mathjax \
  --css assets/site.css \
  --include-after-body scripts/include-preview.html \
  --metadata title="Wasserstein Geometry and Generative Policies" \
  --output docs/index.html

cp main.pdf docs/main.pdf
cp definitions/*.pdf docs/definitions/
cp explanations/*.pdf docs/explanations/

for source in definitions/*.tex; do
  target="docs/definitions/$(basename "${source%.tex}").html"
  pandoc "$source" \
    --from latex \
    --to html5 \
    --standalone \
    --mathjax \
    --css ../assets/site.css \
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
    --css ../assets/site.css \
    --metadata title="$(basename "${source%.tex}" | tr '_' ' ')" \
    --output "$target"
done
