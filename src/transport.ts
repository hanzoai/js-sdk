// transport — the Configuration this package exports.
//
// It is the generated Configuration plus one thing: every request a generated
// *Api class sends with it travels through an axios adapter that turns a usage
// refusal into its typed error (usage.ts). Every other answer, success or
// failure, passes through untouched — a 400 is still the AxiosError it was.
//
// The adapter rides in `baseOptions`, which the generated client spreads into
// every request it builds, so no *Api class is touched and nothing global is:
// axios itself and any other caller of it are left as they were. An adapter the
// caller put in `baseOptions` is the one wrapped; otherwise axios's default.
//
// hanzo.ts exports this class under the generated one's name, so
// `new Configuration({ accessToken })` from 'hanzoai' is this one, and so is
// `Client.configuration`.

import axios, { type AxiosAdapter, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { Configuration as Generated, type ConfigurationParameters } from './configuration';
import { limited } from './usage';

type Inner = Parameters<typeof axios.getAdapter>[0];

/** axios's resolver also takes the request, which is how `env.fetch` reaches the fetch adapter. */
const resolve = axios.getAdapter as (adapters: Inner, config: InternalAxiosRequestConfig) => AxiosAdapter;

/** The body axios carried on a failed answer. An adapter hands it over unparsed. */
function parsed(data: unknown): unknown {
  if (typeof data !== 'string') return data;
  try {
    return JSON.parse(data) as unknown;
  } catch {
    return data;
  }
}

export class Configuration extends Generated {
  constructor(param: ConfigurationParameters = {}) {
    super(param);
    const inner: Inner = param.baseOptions?.adapter ?? axios.defaults.adapter;
    const adapter: AxiosAdapter = (config) =>
      resolve(inner, config)(config).catch((err: AxiosError) => {
        const res = err?.response;
        throw (res && limited(res.status, parsed(res.data), err)) || err;
      });
    this.baseOptions = { ...this.baseOptions, adapter };
  }
}
