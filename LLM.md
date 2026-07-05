# LLM.md - Hanzo TypeScript SDK

## Overview
TypeScript/JavaScript client for the Hanzo Cloud API
(`https://api.hanzo.ai/v1`). Covers the full unified surface — AI inference
plus every `/v1/<service>` product. npm package: `hanzoai`.

## The ONE way: generated from the OpenAPI spec

Generated, never hand-written. Source of truth is `hanzoai/openapi`
`hanzo.yaml`. Generator is **openapi-generator** (`typescript-axios`) — no
Stainless.

```bash
./scripts/generate.sh                    # regenerate src/ from hanzoai/openapi@main
SPEC=/path/to/hanzo.yaml ./scripts/generate.sh
npm run build                            # tsc -> dist (CJS) + dist/esm (ESM)
```

Never edit `src/*.ts` by hand — change the spec in `hanzoai/openapi` and
regenerate. CI (`generate.yml`) does this on every spec change via a
`spec-update` repository_dispatch.

## Auth
```ts
import { Configuration, ChatCompletionsApi } from "hanzoai";

const config = new Configuration({
  basePath: "https://api.hanzo.ai",
  accessToken: process.env.HANZO_API_KEY,   // IAM JWT or hk- Cloud API key
});
```

## Release
Push a semver tag `vX.Y.Z` → `publish-npm.yml` builds and `npm publish`es.
Semver only, never a sha pin.

## Note: `packages/mcp-server`
The Stainless-era MCP server under `packages/mcp-server` targets the old
client surface and is not rebuilt by the root pipeline. It needs its own
regeneration against the new surface before it can be republished (tracked
separately).
