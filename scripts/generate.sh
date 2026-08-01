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

SPEC_REPO="${SPEC_REPO:-hanzoai/openapi}"
SPEC_REF="${SPEC_REF:-main}"

OPENAPI="${OPENAPI:-}"
if [ -z "$OPENAPI" ]; then
  OPENAPI="$(mktemp -d)"
  trap 'rm -rf "$OPENAPI"' EXIT
  # hanzoai/openapi is PRIVATE. A runner has no git credentials, so CI passes a
  # contents:read token as SPEC_TOKEN; on a dev box your existing gh/ssh
  # credentials already cover it and no token is wanted.
  #
  # The token goes in a header, not in the remote URL — a URL is echoed back in
  # git's own error messages and lands in the log the one time this fails.
  if [ -n "${SPEC_TOKEN:-}" ]; then
    auth="$(printf 'x-access-token:%s' "$SPEC_TOKEN" | base64 | tr -d '\n')"
    git -c "http.extraheader=AUTHORIZATION: basic $auth" \
      clone --depth 1 -q -b "$SPEC_REF" "https://github.com/$SPEC_REPO" "$OPENAPI"
  else
    git clone --depth 1 -q -b "$SPEC_REF" "https://github.com/$SPEC_REPO" "$OPENAPI"
  fi
fi

# uv rather than a bare python3: the driver needs PyYAML, and the arc runner
# image promises no interpreter at all, let alone one with it installed.
# THE DOCUMENT AS AN ARGUMENT. hanzoai/ci's client: lane fetches openapi.yaml at
# the sha hanzoai/cloud just deployed and exports SPEC; the driver projects THAT
# rather than the checkout's own hanzo.yaml. With SPEC unset nothing changes —
# a maintainer regenerating by hand still gets the checkout's document.
if [ -n "${SPEC:-}" ]; then set -- --spec "$SPEC" "$@"; fi
exec uv run --with pyyaml python3 "$OPENAPI/generate.py" typescript --repo "$PWD" "$@"
