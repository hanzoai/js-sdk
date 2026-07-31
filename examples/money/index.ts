// money — what is in the wallet, and what spent it.
//
//   GET /v1/billing/balance   billing_billingBalance   prepaid credit balance
//   GET /v1/billing/usage     billing_billingUsage     per-request usage ledger
//
// Neither call takes an org: both derive the tenant SERVER-side from the JWT
// `owner` claim, so a key can only ever read its own money. There is no org
// flag to pass and no X-Org-Id header to set.
import { BillingApi } from 'hanzoai';
import { config, fail } from '../client';

async function main() {
  const billing = new BillingApi(config());

  const { data: balance } = await billing.billingBillingBalance({});
  console.log('balance:', JSON.stringify(balance, null, 2));

  // Unbounded, the ledger is every request the org ever made. Ask for a window.
  const end = new Date();
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
  const { data: usage } = await billing.billingBillingUsage({
    start: start.toISOString(),
    end: end.toISOString(),
  });
  console.log('usage (last 7d):', JSON.stringify(usage, null, 2));
}

main().catch(fail);
