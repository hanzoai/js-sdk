// models — the catalog, with no credential at all.
//
// GET /v1/models (get_models) is one of four operations the document marks
// `security: []`, so the generator emits no auth call for it and this program
// needs nothing exported to run. It is the flow to reach for when the question
// is "does the client talk to the server", separate from "is my key any good".
//
// The other three are GET /v1/models/providers, GET /v1/commands and
// GET /v1/openapi.json. Everything else inherits the document's top-level
// `security: [bearer]`.
//
// `data` arrives untyped because this operation declares no response schema —
// one of 891 in the document that state the route and not its shape.
import { AiApi } from 'hanzoai';
import { anon, basePath, fail } from '../client';

type Catalog = { data: Array<{ id: string; owned_by?: string; provider?: string }> };

async function main() {
  const { data } = await new AiApi(anon()).getModels();
  const catalog = (data as unknown as Catalog).data;

  console.log(`${catalog.length} models from ${basePath}`);
  for (const m of catalog.slice(0, 5)) {
    console.log(`  ${m.id}  (${m.owned_by ?? m.provider ?? 'unattributed'})`);
  }
}

main().catch(fail);
