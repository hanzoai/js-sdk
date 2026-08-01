// tools — list the MCP tools this key can reach.
//
// POST /v1/mcp (operationId mcp_rpc), the fleet's one MCP door: it composes the
// typed product operations with the external MCP servers the caller's org has
// enabled. JSON-RPC, so the method travels in the body rather than the path.
//
// This flow used to read GET /v1/tools, because /v1/mcp was live but UNDECLARED
// and calling it would have meant a hand-rolled HTTP request inside a generated
// client — the exact drift these SDKs exist to prevent. It is in hanzo.yaml now,
// so the flow is finally the generated call it always wanted to be; the note
// that used to end this comment said to make exactly this move. The REST
// catalogue is still there and still typed, it is simply not what an MCP client
// speaks — and it currently answers with an empty list while the door answers
// with 833 tools, which is the other half of why this flow moved.
//
// JSON-RPC reports failure INSIDE a 200, so `error` is read before `result`: an
// example that trusts the HTTP status alone prints nothing at all on a
// server-side refusal and calls it success.
import { MCPApi, McpRequestJsonrpcEnum, McpRequestMethodEnum } from 'hanzoai';
import type { McpCatalog } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const mcp = new MCPApi(config());
  const { data } = await mcp.mcpRpc({
    mcpRequest: {
      jsonrpc: McpRequestJsonrpcEnum._20,
      id: '1',
      method: McpRequestMethodEnum.ToolsList,
    },
  });

  if (data.error) throw new Error(`MCP ${data.error.code}: ${data.error.message}`);

  // `result` is a union — one door serves initialize, tools/list and
  // tools/call — and tools/list is the catalogue branch.
  const list = (data.result as McpCatalog | undefined)?.tools ?? [];
  if (list.length === 0) throw new Error('tools/list returned an empty catalogue');

  console.log(`${list.length} tools`);
  for (const t of list.slice(0, 3)) {
    console.log(`  ${t.name} — ${t.description ?? '(no description)'}`);
  }
  console.log(`  … and ${list.length - 3} more`);
}

main().catch(fail);
