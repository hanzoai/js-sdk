// money — what is in the wallet, and what spent it.
//
//   GET /v1/billing/balance   cloud_get_v1_billing_balance
//   GET /v1/billing/usage     cloud_get_v1_billing_usage
//
// Neither call takes an org: both derive the tenant SERVER-side from the JWT
// `owner` claim, so a key can only ever read its own money. There is no org
// flag to pass and no X-Org-Id header to set.
//
// Both are declared with a `default` response and no `content`, so the client
// types the body as void even though the server sends JSON. That is a spec gap,
// not an SDK one — 696 of 2425 operations currently model no response body — so
// this example reads the raw axios payload rather than pretending a type it was
// not given. When the schemas land, the `as unknown` goes away and nothing else
// about the call changes.
import { BillingApi } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const billing = new BillingApi(config());

  const balance = await billing.cloudGetV1BillingBalance();
  console.log('balance:', JSON.stringify(balance.data as unknown, null, 2));

  const usage = await billing.cloudGetV1BillingUsage();
  console.log('usage:', JSON.stringify(usage.data as unknown, null, 2));
}

main().catch(fail);
