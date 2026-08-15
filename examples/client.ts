// Where the API is, who we are, and how to print a failure. Every flow imports
// this and nothing else configures a client.
import { Configuration } from 'hanzoai';

/** Default host. `HANZO_BASE_URL` overrides it (staging, a local cloud, a tunnel). */
export const basePath = process.env.HANZO_BASE_URL ?? 'https://api.hanzo.ai';

/** Fail on the unset variable rather than on the 401 it causes three frames later. */
export function apiKey(): string {
  const key = process.env.HANZO_API_KEY;
  if (!key) {
    throw new Error('HANZO_API_KEY is not set — export an IAM access token or a cloud API key');
  }
  return key;
}

/**
 * The credential goes in `accessToken`, and that is the only place it goes.
 *
 * The document declares one securityScheme — `bearer`, http/bearer — and a
 * top-level `security: [bearer]`, so every operation that does not opt out with
 * `security: []` now generates `await setBearerAuthToObject(header, config)`,
 * which reads this field and writes `Authorization: Bearer <token>`. 2498 call
 * sites across 191 of the 192 api classes.
 *
 * These examples used to set the header by hand through `baseOptions`, because
 * a document with no securityScheme generates no auth code and `accessToken`
 * was inert. That workaround is gone: one field, one header, one way.
 */
export const config = (): Configuration =>
  new Configuration({ basePath, accessToken: apiKey() });

/** No credential. The four operations the document marks `security: []` take this. */
export const anon = (): Configuration => new Configuration({ basePath });

/**
 * axios buries the server's message in `response.data`; the bare `.message` is
 * always "Request failed with status code 4xx", which says nothing.
 */
export function fail(err: unknown): never {
  const e = err as { response?: { status?: number; data?: unknown }; message?: string };
  if (e.response) {
    console.error(`HTTP ${e.response.status}:`, JSON.stringify(e.response.data));
  } else {
    console.error(e.message ?? err);
  }
  process.exit(1);
}
