// hello — who am I?
//
// The smallest complete call: prove the key works and print the identity behind
// it. GET /v1/iam/oauth/userinfo (operationId get_iam_oauth_userinfo).
//
// This flow's whole job is to FAIL when the key is bad, so the route has to be
// one that actually refuses. Not every identity-shaped route does, and the two
// near misses are worth naming because both read as success:
//
//   /v1/iam/whoami  answers HTTP 200 with {"status":"error","msg":"please sign
//                   in first"} to a bogus bearer. A generated client resolves
//                   that promise, so `hello` would print an empty identity and
//                   exit 0 for a key that is refused everywhere else.
//   /v1/ai/account  answers 200 with type="anonymous-user" to a request that
//                   carries no Authorization header at all.
//
// userinfo is the OIDC identity endpoint of the one IAM, and it refuses the way
// the standard requires: 401 {"error":"invalid_token"}. Verified against
// api.hanzo.ai with a bogus bearer, not assumed from the document.
//
// The body is read through a cast because this operation declares no response
// schema — one of 684 in the document that state the route and not its shape.
// That is a document gap, not an SDK one; when the schema lands the cast goes
// away and nothing else about the call changes.
import { IamApi } from 'hanzoai';
import { config, basePath, fail } from '../client';

/** The OIDC claims userinfo returns — only the ones this flow prints. */
type UserInfo = {
  sub?: string;
  name?: string;
  preferred_username?: string;
  email?: string;
};

async function main() {
  const iam = new IamApi(config());
  const { data } = await iam.getV1IamOauthUserinfo();
  const me = data as unknown as UserInfo;

  console.log(`hello from ${basePath}`);
  console.log(`  ${me.name ?? me.preferred_username ?? '(unnamed)'} <${me.email ?? 'no email'}>`);
  console.log(`  sub ${me.sub ?? '(none)'}`);
}

main().catch(fail);
