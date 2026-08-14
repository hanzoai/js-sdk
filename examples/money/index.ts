// money — what is in the wallet, and what spent it.
//
//   GET /v1/billing/balance   get_billing_balance
//   GET /v1/billing/usage     get_billing_usage
//
// Neither call takes an org: both derive the tenant SERVER-side from the JWT
// `owner` claim, so a key can only ever read its own money. There is no org
// flag to pass and no X-Org-Id header to set.
//
// Neither declares a response schema, so the client types the body as void even
// though the server sends JSON. That is a document gap, not an SDK one — 684 of
// the document's 1636 operations state the route and not its shape — so this
// example reads the raw axios payload rather than pretending a type it was not
// given. When the schemas land, the `as unknown` goes away and nothing else
// about the call changes.
//
// Note the neighbouring addresses this client now carries: `/v1/billing/methods`
// and `/v1/billing/gpu/eligibility`. The retired hand-authored master published
// `payment-methods` and `gpu-eligibility` instead, and both of those 404 against
// api.hanzo.ai. Generating from the code's own document is what stopped this SDK
// shipping addresses the server does not serve.
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
