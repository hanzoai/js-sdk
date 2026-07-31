// tools — list the tools this key can reach.
//
// GET /v1/tools (operationId cloud_get_v1_tools), the catalog behind the MCP
// surface: each entry is a tool name, its description and its input schema.
//
// A note on the MCP door, because it is easy to pick the wrong one. There is a
// live JSON-RPC endpoint at POST /v1/mcp that answers `tools/list` with the
// same catalog (730 tools at the time of writing) — but it is NOT in
// hanzo.yaml, so the generator emits no method for it and an example would have
// to bypass the SDK to call it, which defeats the point of an SDK example. Of
// the MCP routes that ARE declared, /v1/automations/mcp returns 405 at
// api.hanzo.ai. So this catalog read is the one that is both generated and
// served. When /v1/mcp is added to the spec, this flow should move to it.
import { ToolsApi } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const tools = new ToolsApi(config());
  const { data } = await tools.cloudGetV1Tools({});

  const list = data.tools ?? [];
  console.log(`${list.length} tools`);
  for (const t of list.slice(0, 20)) {
    console.log(`  ${t.name} — ${t.description ?? '(no description)'}`);
  }
  if (list.length > 20) console.log(`  … and ${list.length - 20} more`);
}

main().catch(fail);
