#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$project_dir/netlify-dist"

case "$output_dir" in
  "$project_dir/netlify-dist") ;;
  *) echo "Unexpected output directory" >&2; exit 1 ;;
esac

rm -rf "$output_dir"
mkdir -p "$output_dir"

cp \
  "$project_dir/index.html" \
  "$project_dir/c-services.html" \
  "$project_dir/c-team.html" \
  "$project_dir/c-contact.html" \
  "$project_dir/thanks.html" \
  "$project_dir/service-hosting.html" \
  "$project_dir/service-comedy.html" \
  "$project_dir/service-dance.html" \
  "$project_dir/service-media.html" \
  "$project_dir/service-music.html" \
  "$project_dir/variants.css" \
  "$project_dir/c-site.js" \
  "$project_dir/_headers" \
  "$output_dir/"

cp -R "$project_dir/assets" "$output_dir/assets"
