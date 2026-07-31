// hello — who am I?
//
// The smallest complete call: prove the key works and print the identity behind
// it. GET /v1/ai/account (operationId ai_getAccount).
//
// This is also where you meet the envelope, because every /v1/ai/* route uses
// it: `status` is the OUTCOME, not the HTTP code. A handled failure comes back
// as HTTP 200 with status: 'error' and a human `msg`, so axios does NOT throw
// and a client that only checks the status line reports success on a failure.
// Branch on `status`. Every AI-plane example in this repo does.
import { AccountApi } from 'hanzoai';
import { config, basePath, fail } from '../client';

async function main() {
  const account = new AccountApi(config());
  const { data } = await account.aiGetAccount();

  if (data.status !== 'ok') {
    console.error(`account read failed: ${data.msg ?? 'no message'}`);
    process.exit(1);
  }

  console.log(`hello from ${basePath}`);
  console.log(JSON.stringify(data.data, null, 2));
}

main().catch(fail);
