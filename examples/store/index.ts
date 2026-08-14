// store — a KV round-trip: provision a store, read it back, delete it.
//
//   POST   /v1/kv          post_kv          provision
//   GET    /v1/kv/{name}   get_kv_by_name      read back
//   DELETE /v1/kv/{name}   delete_kv_by_name   tear down
//
// This is the PROVISIONING plane. The per-key data plane the document also
// describes (/v1/kv/keys/{key}) is not mounted anywhere — GET 404s and
// PUT/DELETE 405 at api.hanzo.ai, and kv.hanzo.ai 404s the whole prefix — so a
// set/get/delete round-trip on keys would be an example that cannot run.
// These three all answer 403 unauthenticated, i.e. routed and gated.
//
// The delete runs in `finally`, so a failed read still tears the store down
// rather than leaving it billable for the next run to collide with.
import { KvApi } from 'hanzoai';
import { config, fail } from '../client';

const name = `example-store-${Date.now()}`;

async function main() {
  const kv = new KvApi(config());

  await kv.postKv({ provisionRequest: { name } });
  console.log(`provisioned ${name}`);

  try {
    const { data: store } = await kv.getKvByName({ name });
    console.log(`read back: ${store.name} · ${store.kind} · status ${store.status}`);
    console.log(`  host ${store.host}:${store.port}`);
  } finally {
    await kv.deleteKvByName({ name });
    console.log(`deleted ${name}`);
  }
}

main().catch(fail);
