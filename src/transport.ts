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

/**
 * The request option that marks a request as sent with this Configuration. Its
 * value is this module's own interceptor, so two copies of the package sharing
 * one axios each type only their own requests, with their own classes.
 */
const MARK = 'hanzoUsage';

/** A stream body is read this far at most; a refusal is a few hundred bytes of JSON. */
const CAP = 1 << 16;

type Manager = { handlers?: Array<{ rejected?: unknown } | null> };

export class Configuration extends Generated {
  constructor(param: ConfigurationParameters = {}) {
    super(param);
    this.baseOptions = { ...this.baseOptions, [MARK]: refused };
    // Checked, not remembered: a test teardown's `interceptors.response.clear()`
    // removes it, and the next Configuration puts it back.
    const installed = (axios.interceptors.response as unknown as Manager).handlers?.some((h) => h?.rejected === refused);
    if (!installed) axios.interceptors.response.use(undefined, refused);
  }
}

/** Rethrow a marked 402 or 429 as the usage refusal its body names; anything else as it came. */
async function refused(err: unknown): Promise<never> {
  const e = err as AxiosError | undefined;
  const res = e?.response;
  const config = e?.config as (Record<string, unknown> & { signal?: unknown; timeout?: number }) | undefined;
  if (!res || config?.[MARK] !== refused || (res.status !== 402 && res.status !== 429)) throw err;
  let parsed: unknown;
  try {
    parsed = await body(res, config);
  } catch {
    // A body that cannot be read names nothing: the answer is the one axios gave.
    throw err;
  }
  throw limited(res.status, parsed, header(res.headers, 'x-request-id'), err) ?? err;
}

/**
 * The body as JSON where it is JSON. axios hands it over parsed by default and
 * raw when the caller asked for a buffer, a blob or a stream. A stream is read
 * only when it says it is JSON — a refusal is, an event stream never is — at
 * most CAP bytes, no longer than the caller's signal and timeout allow, and
 * without taking it from the caller: `res.data` is left holding a stream of the
 * same family that yields every byte again.
 */
async function body(res: AxiosResponse, config: { signal?: unknown; timeout?: number }): Promise<unknown> {
  let data: unknown = res.data;
  if (web(data) || node(data)) {
    if (!/json/i.test(header(res.headers, 'content-type') ?? '')) return undefined;
    const read = web(data) ? peekWeb(data, config) : peekNode(data, config);
    const { text, again } = await read;
    res.data = again;
    data = text;
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

/** Read a WHATWG stream through `peek`, and hand back a WHATWG stream that replays it. */
async function peekWeb(stream: ReadableStream<Uint8Array>, config: { signal?: unknown; timeout?: number }) {
  const reader = stream.getReader();
  const { text, rest } = await peek(() => reader.read(), config);
  const again = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const step = await rest.next();
      if (step.done) controller.close();
      else controller.enqueue(step.value as Uint8Array);
    },
    cancel: (reason) => reader.cancel(reason),
  });
  return { text, again };
}

/** Read a Node stream through `peek`; `Readable.from` comes off its own constructor, so no bundle gains node:stream. */
async function peekNode(stream: Stream, config: { signal?: unknown; timeout?: number }) {
  const it = stream[Symbol.asyncIterator]();
  const { text, rest } = await peek(() => it.next(), config);
  return { text, again: stream.constructor.from(rest) };
}

const STOP = Symbol('stop');

/**
 * Read chunks until the end, CAP bytes, the caller's abort or its timeout,
 * whichever comes first. `text` is the whole body only when the end was
 * reached — anything less names no refusal. `rest` yields every chunk read and
 * then whatever is left, including a read still in flight and a failure, so the
 * caller's stream loses nothing.
 */
async function peek(next: () => Promise<IteratorResult<unknown>>, config: { signal?: unknown; timeout?: number }) {
  const seen: unknown[] = [];
  const decoder = new TextDecoder();
  let text = '';
  let done = false;
  let failed: { error: unknown } | undefined;
  let pending: Promise<IteratorResult<unknown>> | undefined;

  let timer: ReturnType<typeof setTimeout> | undefined;
  let quit: (() => void) | undefined;
  const stop = new Promise<typeof STOP>((resolve) => {
    quit = () => resolve(STOP);
    const signal = config.signal as AbortSignal | undefined;
    if (signal && typeof signal.addEventListener === 'function') {
      if (signal.aborted) resolve(STOP);
      signal.addEventListener('abort', () => resolve(STOP), { once: true });
    }
    if (config.timeout && config.timeout > 0) timer = setTimeout(() => resolve(STOP), config.timeout);
  });

  try {
    while (text.length < CAP) {
      pending = next();
      const step = await Promise.race([pending, stop]);
      if (step === STOP) break;
      pending = undefined;
      if (step.done) {
        done = true;
        break;
      }
      seen.push(step.value);
      text += typeof step.value === 'string' ? step.value : decoder.decode(step.value as Uint8Array, { stream: true });
    }
  } catch (error) {
    pending = undefined;
    failed = { error };
  } finally {
    if (timer) clearTimeout(timer);
    quit?.();
  }

  async function* rest() {
    yield* seen;
    if (failed) throw failed.error;
    if (pending) {
      const step = await pending;
      if (step.done) return;
      yield step.value;
    }
    while (!done) {
      const step = await next();
      if (step.done) return;
      yield step.value;
    }
  }
  return { text: done ? text : undefined, rest: rest() };
}
