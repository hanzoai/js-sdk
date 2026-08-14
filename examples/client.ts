// Where the API is, who we are, and how to print a failure. Every flow imports
// this and nothing else configures a client.
import { Configuration } from 'hanzoai';

/** Default host. `HANZO_BASE_URL` overrides it (staging, a local cloud, a tunnel). */
export const basePath = process.env.HANZO_BASE_URL ?? 'https://api.hanzo.ai';

/** Fail on the unset variable rather than on the 401 it causes three frames later. */
export function apiKey(): string {
  const key = process.env.HANZO_API_KEY;
  if (!key) {
    throw new Error('HANZO_API_KEY is not set — export an IAM JWT or an hk- cloud key');
  }
  return key;
}

/**
 * Bearer auth goes through `baseOptions`, NOT through `accessToken`.
 *
 * The API document declares no securityScheme, so the generator emitted no auth
 * code at all: `new Configuration({ accessToken })` type-checks, sends no
 * Authorization header, and every call comes back 401 or 403. Measured, not
 * assumed — a local server that echoes its headers sees nothing from
 * `accessToken` and `Bearer …` from the line below.
 *
 * `baseOptions` works because every generated operation spreads it into the
 * axios request, so a header set once here reaches all 2502 of them. When the
 * document grows a securityScheme this becomes `accessToken` and nothing else
 * about these examples changes.
 */
export const config = (): Configuration =>
  new Configuration({
    basePath,
    baseOptions: { headers: { Authorization: `Bearer ${apiKey()}` } },
  });

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
