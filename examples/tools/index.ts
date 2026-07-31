// tools — list the MCP tools this key can reach.
//
// POST /v1/automations/mcp (operationId automations_mcp) is the JSON-RPC 2.0
// MCP surface in hanzo.yaml, and the only one with typed request/response
// schemas — `method` is an enum the client checks at compile time, so
// `tools/lst` is a type error here rather than a -32601 at runtime.
//
// JSON-RPC reports failure INSIDE a 200: a bad method comes back as
// `error: { code, message }`, not an HTTP 4xx, so axios does not throw. Check
// `error` before reading `result`.
import { MCPApi, AutomationsMcpRequestMethodEnum } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const mcp = new MCPApi(config());
  const { data } = await mcp.automationsMcp({
    automationsMcpRequest: {
      jsonrpc: '2.0',
      id: 1,
      method: AutomationsMcpRequestMethodEnum.ToolsList,
    },
  });

  if (data.error) {
    console.error(`JSON-RPC ${data.error.code}: ${data.error.message}`);
    process.exit(1);
  }

  const tools: Array<{ name: string; description?: string }> = data.result?.tools ?? [];
  console.log(`${tools.length} tools`);
  for (const t of tools) {
    console.log(`  ${t.name} — ${t.description ?? '(no description)'}`);
  }
}

main().catch(fail);
