#!/usr/bin/env bash
# The call site. Nothing about HOW this SDK is generated lives here.
#
# The invocation is logic and lives once, in `generate.py`; every per-language
# knob is data in `sdks.yaml` beside it. This file says "typescript, into this
# checkout" and nothing else. It used to re-declare the generator name, the -o
# layout and the whole --additional-properties string; that second copy of the
# contract drifted, and running the canonical driver against this repo produced
# an orphan second copy of all 2143 files.
#
#   ./scripts/generate.sh              # regenerate src/
#   ./scripts/generate.sh --check      # fail if committed src/ has drifted
#
# BOTH INPUTS ARRIVE AS VALUES. $SPEC is the document, already fetched at a
# pinned ref and digest-checked; $OPENAPI is the checkout holding the driver.
# hanzoai/ci's client lane sets both, because it holds the one credential that
# reads this forge. This script used to clone the driver itself, anonymously,
# from a private repo — so every CI regeneration died at the clone.
#
# uv rather than a bare python3: the driver needs PyYAML and the runner image
# promises no interpreter at all, let alone one with it installed.
#
# Requires: java 17+, uv.
set -euo pipefail
cd "$(dirname "$0")/.."

: "${OPENAPI:?the generator lives in hanzoai/openapi; hanzoai/ci's client lane sets OPENAPI, or point it at a checkout}"

if [ -n "${SPEC:-}" ]; then set -- --spec "$SPEC" "$@"; fi

exec uv run --with pyyaml python3 "$OPENAPI/generate.py" typescript --repo "$PWD" "$@"
