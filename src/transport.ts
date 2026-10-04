// transport — the Configuration this package exports.
//
// It is the generated Configuration plus one thing: a request a generated *Api
// class sends with it that comes back 402 or 429 with a usage refusal in the
// body throws that refusal's typed error (usage.ts). Every other answer passes
// through untouched — a 400 is still the AxiosError it was.
//
// The error path is axios's own: one response interceptor on the axios instance
// the generated classes use by default, installed by the first Configuration
// built. It acts only on requests marked as this package's, and the mark rides
// in `baseOptions`, which the generated client spreads into every request it
// builds — so the caller's other axios traffic, adapters and transforms are left
// as they were. An axios instance passed as an *Api's third argument has
// interceptors of its own, and a refusal through it stays an AxiosError.
//
// hanzo.ts exports this class under the generated one's name, so
// `new Configuration({ accessToken })` from 'hanzoai' is this one, and so is
// `Client.configuration`.

import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { Configuration as Generated, type ConfigurationParameters } from './configuration';
import { header, limited } from './usage';

/** The request option that marks a request as sent with this Configuration. */
const MARK = 'hanzoUsage';

/** A stream body over this is not a refusal, which is a few hundred bytes of JSON. */
const CAP = 1 << 16;

let installed = false;

export class Configuration extends Generated {
  constructor(param: ConfigurationParameters = {}) {
    super(param);
    this.baseOptions = { ...this.baseOptions, [MARK]: true };
    if (!installed) {
      installed = true;
      axios.interceptors.response.use(undefined, refused);
    }
  }
}

/** Rethrow a marked 402 or 429 as the usage refusal its body names; anything else as it came. */
async function refused(err: unknown): Promise<never> {
  const res = (err as AxiosError | undefined)?.response;
  const marked = (err as AxiosError | undefined)?.config as Record<string, unknown> | undefined;
  if (!res || marked?.[MARK] !== true || (res.status !== 402 && res.status !== 429)) throw err;
  throw limited(res.status, await body(res), header(res.headers, 'x-request-id'), err) ?? err;
}

/**
 * The body as JSON where it is JSON. axios hands it over parsed by default and
 * raw when the caller asked for a buffer, a blob or a stream; a stream is read
 * without taking it from the caller — `res.data` is left holding one that
 * yields every byte again.
 */
async function body(res: AxiosResponse): Promise<unknown> {
  let data: unknown = res.data;
  if (web(data)) {
    const [mine, theirs] = data.tee();
    res.data = theirs;
    data = await new Response(mine).text();
  } else if (node(data)) {
    const read = await drain(data);
    res.data = read.again;
    data = read.text;
  } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
    data = await data.text();
  } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    data = new TextDecoder().decode(data as Uint8Array);
  }
  if (typeof data !== 'string') return data;
  try {
    return JSON.parse(data) as unknown;
  } catch {
    return data;
  }
}

/** A WHATWG stream: the fetch and xhr adapters' `responseType: 'stream'`. */
const web = (v: unknown): v is ReadableStream<Uint8Array> =>
  typeof (v as ReadableStream | null)?.tee === 'function' && typeof (v as ReadableStream).getReader === 'function';

/** A Node stream: the http adapter's `responseType: 'stream'`. */
type Stream = AsyncIterable<unknown> & { pipe: unknown; constructor: { from(source: AsyncIterable<unknown>): unknown } };
const node = (v: unknown): v is Stream =>
  typeof (v as Stream | null)?.pipe === 'function' &&
  typeof (v as Stream)[Symbol.asyncIterator] === 'function' &&
  typeof (v as Stream).constructor?.from === 'function';

/**
 * Read up to CAP bytes of a Node stream, and a stream of the same family that
 * replays them and then the rest. `Readable.from` is reached through the
 * stream's own constructor, so nothing here imports node:stream into a bundle.
 */
async function drain(stream: Stream): Promise<{ text: string; again: unknown }> {
  const it = stream[Symbol.asyncIterator]();
  const seen: unknown[] = [];
  const decoder = new TextDecoder();
  let text = '';
  let size = 0;
  let done = false;
  while (size < CAP) {
    const step = await it.next();
    if (step.done) {
      done = true;
      break;
    }
    seen.push(step.value);
    const chunk = typeof step.value === 'string' ? step.value : decoder.decode(step.value as Uint8Array, { stream: true });
    text += chunk;
    size += chunk.length;
  }
  async function* replay() {
    yield* seen;
    while (!done) {
      const step = await it.next();
      if (step.done) return;
      yield step.value;
    }
  }
  return { text, again: stream.constructor.from(replay()) };
}
