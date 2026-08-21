// store — a KV round-trip: provision a store, read it back, delete it.
//
//   POST   /v1/instances/kv          post_instances_kv            provision
//   GET    /v1/instances/kv/{name}   get_instances_kv_by_name     read back
//   DELETE /v1/instances/kv/{name}   delete_instances_kv_by_name  tear down
//
// KV used to sit at /v1/kv beside its own siblings — datastore, docdb, s3,
// search, sql, vector — each with its own class and its own spelling of the
// same three verbs. They are one shape now, under /v1/instances, so this
// example reads as the others do and switching store kinds is switching a word.
//
// This is the PROVISIONING plane: it hands back where the store lives, not what
// is in it. Nothing here writes a key.
//
// The delete runs in `finally`, so a failed read still tears the store down
// rather than leaving it billable for the next run to collide with.
import { InstancesApi } from 'hanzoai';
import { config, fail } from '../client';

const name = `example-store-${Date.now()}`;

async function main() {
  const kv = new InstancesApi(config());

  await kv.postInstancesKv({ provisionRequest: { name } });
  console.log(`provisioned ${name}`);

  try {
    const { data: store } = await kv.getInstancesKvByName({ name });
    console.log(`read back: ${store.name} · ${store.kind} · status ${store.status}`);
    console.log(`  host ${store.host}:${store.port}`);
  } finally {
    await kv.deleteInstancesKvByName({ name });
    console.log(`deleted ${name}`);
  }
}

main().catch(fail);
