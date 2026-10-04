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
// Each row is an `AiModelInfo`: `class` (premium, ours or free) says what pays
// for it, `family` names a Hanzo model's line, and `pricing.variable` marks a
// router SKU billed at the cost of whichever model answered.
import { AiApi } from 'hanzoai';
import { anon, basePath, fail } from '../client';

async function main() {
  const { data } = await new AiApi(anon()).getModels();
  const catalog = data.data ?? [];

  console.log(`${catalog.length} models from ${basePath}`);
  for (const m of catalog.slice(0, 5)) {
    console.log(`  ${m.id}  ${m.class ?? '-'}  (${m.owned_by ?? m.provider ?? 'unattributed'})`);
  }
}

main().catch(fail);
