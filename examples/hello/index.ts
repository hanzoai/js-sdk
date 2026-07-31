// hello — who am I?
//
// The smallest complete call: prove the key works and print the identity behind
// it. GET /v1/bot/auth/me (operationId bot_authMe).
//
// This flow's whole job is to FAIL when the key is bad, so the route has to be
// one that actually checks. Not every identity-shaped route does: /v1/ai/account
// answers 200 with type="anonymous-user" to a request carrying no Authorization
// header at all, so a `hello` built on it prints a cheerful identity for a key
// that would 401 everywhere else — worse than no check, because it reads as
// proof. /v1/bot/auth/me answers 403 {"error":"no validated principal"}.
// Verified against api.hanzo.ai, not assumed from the spec.
import { AuthApi } from 'hanzoai';
import { config, basePath, fail } from '../client';

async function main() {
  const auth = new AuthApi(config());
  const { data: me } = await auth.botAuthMe();

  console.log(`hello from ${basePath}`);
  console.log(`  ${me.displayName ?? me.handle ?? '(unnamed)'} <${me.email ?? 'no email'}>`);
  console.log(`  id ${me.id} · role ${me.role}`);
}

main().catch(fail);
