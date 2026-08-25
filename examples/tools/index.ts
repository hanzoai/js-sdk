// tools — what this key can call.
//
// GET /v1/tools (get_tools): every tool the caller may see, from every source —
// connector, function, zap-service, agent, skill, mcp — deduplicated by name.
// `source` and `activated` narrow it.
//
// This flow has moved twice, both times for the same reason, and the rule is
// worth stating once: it calls a route the DOCUMENT declares. POST /v1/mcp is
// the fleet's JSON-RPC MCP endpoint and is live, but it is not in the document, and
// hand-rolling an HTTP request inside a generated client is the drift these SDKs
// exist to prevent. /v1/tools is declared and typed, so the flow sits here.
import { ToolsApi } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const { data } = await new ToolsApi(config()).getTools();

  const tools = data.tools ?? [];
  console.log(`${tools.length} tool(s) visible to this key`);
  for (const t of tools.slice(0, 10)) {
    console.log(`  ${t.name ?? '(unnamed)'} [${t.source ?? '?'}] — ${t.description ?? ''}`);
  }
  if (tools.length > 10) console.log(`  … and ${tools.length - 10} more`);
}

main().catch(fail);
