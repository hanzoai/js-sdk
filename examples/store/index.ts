// store — a KV round-trip: set, read it back, delete.
//
//   PUT    /v1/kv/keys/{key}   kv_setKey
//   GET    /v1/kv/keys/{key}   kv_getKey
//   DELETE /v1/kv/keys/{key}   kv_deleteKey
//
// The delete runs in `finally`, so a failed read still cleans up rather than
// leaving the key behind for the next run to collide with.
import { KeysApi } from 'hanzoai';
import { config, fail } from '../client';

const key = `examples/store/${Date.now()}`;
const value = 'hello from the hanzoai SDK';

async function main() {
  const kv = new KeysApi(config());

  await kv.kvSetKey({ key, kvSetKeyRequest: { value, ttl: 60 } });
  console.log(`set ${key}`);

  try {
    const { data } = await kv.kvGetKey({ key });
    console.log('read back:', JSON.stringify(data));
  } finally {
    await kv.kvDeleteKey({ key });
    console.log(`deleted ${key}`);
  }
}

main().catch(fail);
