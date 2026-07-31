#!/usr/bin/env bash
# The call site. Nothing about HOW this SDK is generated lives here.
#
# The generator invocation is logic and lives ONCE, in hanzoai/openapi:
# generate.py (the driver) + sdks.yaml (every per-language knob, as data) +
# hanzo.yaml (the spec). This file only says "typescript, into this checkout".
#
# It used to re-declare the generator name, the -o layout and the whole
# --additional-properties string. That is a second copy of the contract, and it
# drifted: sdks.yaml and this script disagreed about modelPackage and about
# whether the client lands in src/ or src/cloud/, so running the canonical
# driver against this repo produced an orphan second copy of all 2143 files.
# One declaration, one outcome.
#
#   ./scripts/generate.sh              # clone hanzoai/openapi, regenerate src/
#   OPENAPI=~/work/hanzo/openapi ./scripts/generate.sh    # use a local checkout
#   ./scripts/generate.sh --check      # fail if committed src/ has drifted
#
# Requires: java 17+, uv, git.
set -euo pipefail
cd "$(dirname "$0")/.."

OPENAPI="${OPENAPI:-}"
if [ -z "$OPENAPI" ]; then
  OPENAPI="$(mktemp -d)"
  trap 'rm -rf "$OPENAPI"' EXIT
  git clone --depth 1 -q https://github.com/hanzoai/openapi "$OPENAPI"
fi

# uv rather than a bare python3: the driver needs PyYAML, and the arc runner
# image promises no interpreter at all, let alone one with it installed.
exec uv run --with pyyaml python3 "$OPENAPI/generate.py" typescript --repo "$PWD" "$@"
