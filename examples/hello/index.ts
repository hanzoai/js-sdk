// hello — who am I?
//
// GET /v1/iam/oauth/userinfo (get_iam_oauth_userinfo), the OIDC identity
// endpoint of the one IAM.
//
// This flow's job is to FAIL on a bad key, so the route has to be one that
// refuses. Two identity-shaped neighbours do not: /v1/iam/whoami answers 200
// with {"status":"error"} and /v1/ai/account answers 200 type="anonymous-user"
// to a request carrying no header at all. Either would print a cheerful
// identity for a key that is refused everywhere else. userinfo answers 401
// {"error":"invalid_token"}.
//
// The body is read through a cast because this operation declares no response
// schema — one of 891 in the document that state the route and not its shape.
import { IamApi } from 'hanzoai';
import { config, basePath, fail } from '../client';

type UserInfo = {
  sub?: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  organization?: string;
  iss?: string;
};

async function main() {
  const iam = new IamApi(config());
  const { data } = await iam.getIamOauthUserinfo();
  const me = data as unknown as UserInfo;

  console.log(`hello from ${basePath}`);
  console.log(`  sub ${me.sub ?? '(none)'} in org ${me.organization ?? '(none)'}`);
  console.log(`  ${me.name ?? me.preferred_username ?? '(unnamed)'} <${me.email ?? 'no email'}>`);
  console.log(`  issued by ${me.iss ?? '(unknown issuer)'}`);
}

main().catch(fail);
