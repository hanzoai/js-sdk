// The one place an example learns where the API is and who it is.
//
// Every flow imports this and nothing else configures a client, so there is a
// single answer to "which base URL?" and "which env var?" across all six.
import { Configuration } from 'hanzoai';

/** Default host. `HANZO_BASE_URL` overrides it (staging, a local cloud, a tunnel). */
export const basePath = process.env.HANZO_BASE_URL ?? 'https://api.hanzo.ai';

/**
 * Fail loudly and early when the key is absent.
 *
 * Without this the SDK sends an unauthenticated request and the flow dies on a
 * 401 several frames deep, which reads like an API bug rather than an unset
 * shell variable.
 */
export function apiKey(): string {
  const key = process.env.HANZO_API_KEY;
  if (!key) {
    throw new Error('HANZO_API_KEY is not set — export an IAM JWT or an hk- cloud key');
  }
  return key;
}

/** Bearer auth: `accessToken` becomes `Authorization: Bearer <key>`, which is the spec's only scheme. */
export const config = (): Configuration =>
  new Configuration({ basePath, accessToken: apiKey() });

/**
 * Print an error the way a caller can act on.
 *
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
