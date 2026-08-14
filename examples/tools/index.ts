// tools — which MCP servers this key can reach.
//
// GET /v1/mcp/servers (operationId get_mcp_servers): the external MCP servers
// the caller's org has enabled, which is the half of the tool surface that is
// per-org configuration rather than a property of the binary.
//
// THIS FLOW HAS MOVED ONCE BEFORE, FOR EXACTLY THIS REASON, AND THE RULE IT
// FOLLOWED THEN IS THE RULE IT FOLLOWS NOW. It used to read GET /v1/tools while
// POST /v1/mcp — the fleet's one JSON-RPC MCP door, and the thing an MCP client
// actually speaks — was live but UNDECLARED; calling an undeclared route would
// have meant a hand-rolled HTTP request inside a generated client, which is the
// exact drift these SDKs exist to prevent. It then moved onto the door when the
// retired hand-authored master declared it.
//
// The door is STILL not in the document this client is now generated from:
// hanzoai/cloud's openapi.yaml declares /v1/mcp/servers and /v1/mcp/servers/{id}
// and does NOT declare POST /v1/mcp, while the live door answers tools/list with
// 833 tools. So the flow moves back to a declared neighbour rather than reach for
// a route the document does not carry.
//
// WHEN THE DOOR IS DECLARED, MOVE THIS FLOW ONTO IT. The one-line test: does
// `paths['/v1/mcp']` exist in the document? If yes, this becomes a generated
// mcpRpc({method: 'tools/list'}) call and reads `result.tools`, and the note
// above becomes history for the second time.
import { McpApi } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const mcp = new McpApi(config());
  const { data } = await mcp.getMcpServers();

  const servers = data.servers ?? [];
  console.log(`${servers.length} MCP server(s) enabled for this org`);
  for (const s of servers.slice(0, 5)) {
    console.log(`  ${s.name ?? '(unnamed)'} — ${s.url ?? s.source ?? '(no endpoint)'}`);
  }
  if (servers.length > 5) console.log(`  … and ${servers.length - 5} more`);
}

main().catch(fail);
