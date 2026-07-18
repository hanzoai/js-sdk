#!/usr/bin/env bash
# Regenerate the Hanzo TypeScript SDK from the unified OpenAPI spec.
#
# The ONE way: hanzoai/openapi `hanzo.yaml` is the single source of truth. This
# SDK is generated from it with openapi-generator (typescript-axios) — no
# Stainless, no hand-drift.
#
#   ./scripts/generate.sh                 # pulls spec from hanzoai/openapi@main
#   SPEC=/path/to/hanzo.yaml ./scripts/generate.sh   # local spec override
#
# Requires: java 17+, curl.
set -euo pipefail
cd "$(dirname "$0")/.."

GENERATOR_VERSION="${GENERATOR_VERSION:-7.14.0}"
# hanzoai/openapi is private — fetch hanzo.yaml through the GitHub API with a
# token (SPEC_TOKEN). raw.githubusercontent.com only serves public repos (it
# 404s on a private repo). Local override still honored: SPEC=/path/to/hanzo.yaml.
SPEC_REPO="${SPEC_REPO:-hanzoai/openapi}"
SPEC_REF="${SPEC_REF:-main}"
SPEC="${SPEC:-}"
JAR="${JAR:-/tmp/openapi-generator-cli-${GENERATOR_VERSION}.jar}"

if [ -z "$SPEC" ]; then
  : "${SPEC_TOKEN:?SPEC_TOKEN required to read private $SPEC_REPO}"
  SPEC="$(mktemp)"
  curl -fsSL -H "Authorization: Bearer $SPEC_TOKEN" -H "Accept: application/vnd.github.raw" \
    "https://api.github.com/repos/$SPEC_REPO/contents/hanzo.yaml?ref=$SPEC_REF" -o "$SPEC"
fi
if [ ! -f "$JAR" ]; then
  curl -fsSL -o "$JAR" \
    "https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${GENERATOR_VERSION}/openapi-generator-cli-${GENERATOR_VERSION}.jar"
fi

OUT="$(mktemp -d)"
java -jar "$JAR" generate \
  -i "$SPEC" -g typescript-axios \
  --additional-properties=npmName=hanzoai,supportsES6=true,useSingleRequestParameter=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models \
  --git-user-id=hanzoai --git-repo-id=js-sdk \
  -o "$OUT"

# The repo root owns package.json / tsconfig. Keep only the generated sources.
# Separate api/ + models/ dirs keep every file small (no 10MB monolith).
rm -rf src
mkdir -p src
cp -r "$OUT"/api "$OUT"/models src/
cp "$OUT"/api.ts "$OUT"/base.ts "$OUT"/common.ts "$OUT"/configuration.ts "$OUT"/index.ts src/
echo "generated $(find src -name '*.ts' | wc -l) TS files into src/ (api + models split)"
