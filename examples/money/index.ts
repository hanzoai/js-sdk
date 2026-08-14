// money — what is in the wallet, and what spent it.
//
//   GET /v1/billing/balance   get_billing_balance
//   GET /v1/billing/usage     get_billing_usage
//
// Neither takes an org: the server derives the tenant from the token's `owner`
// claim, so a key can only ever read its own money. No org flag, no X-Org-Id.
//
// Neither declares a response schema either, so the client types the body void
// even though the server sends JSON. That is a document gap, not an SDK one —
// 834 of the document's 2479 operations state the route and not its shape — so
// this reads the raw payload rather than pretending a type it was not given.
import { BillingApi } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const billing = new BillingApi(config());

  const balance = await billing.getBillingBalance();
  console.log('balance:', JSON.stringify(balance.data as unknown, null, 2));

  const usage = await billing.getBillingUsage();
  console.log('usage:', JSON.stringify(usage.data as unknown, null, 2));
}

main().catch(fail);
