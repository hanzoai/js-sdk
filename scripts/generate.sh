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

# THE GENERATOR IS A TOOL; THE DOCUMENT IS AN ARGUMENT. They had one name here
# and it broke the lane. `SPEC_REF` is the ref of the DOCUMENT — hanzoai/ci's
# client lane exports a hanzoai/cloud sha or v-tag — and it was also handed to
# `git clone -b` on hanzoai/openapi, which is a different repository and has
# never had a ref by that name. So every CI regeneration died at the clone, and
# by hand it worked only because SPEC_REF defaulted to `main` and both repos
# happen to have one. The generator is cloned at its own default branch now.
OPENAPI="${OPENAPI:-}"
if [ -z "$OPENAPI" ]; then
  OPENAPI="$(mktemp -d)"
  trap 'rm -rf "$OPENAPI"' EXIT
  git clone --depth 1 -q https://git.hanzo.ai/hanzoai/openapi "$OPENAPI"
fi

# uv rather than a bare python3: the driver needs PyYAML, and the arc runner
# image promises no interpreter at all, let alone one with it installed.
# THE DOCUMENT AS AN ARGUMENT. hanzoai/ci's client: lane fetches openapi.yaml at
# the sha hanzoai/cloud just deployed and exports SPEC; the driver projects THAT
# rather than the checkout's own hanzo.yaml. With SPEC unset nothing changes —
# a maintainer regenerating by hand still gets the checkout's document.
if [ -n "${SPEC:-}" ]; then set -- --spec "$SPEC" "$@"; fi
exec uv run --with pyyaml python3 "$OPENAPI/generate.py" typescript --repo "$PWD" "$@"
