// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Runs extends APIResource {
  /**
   * Create a run.
   *
   * API Reference: https://platform.openai.com/docs/api-reference/runs/createRun
   */
  create(threadID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1/threads/${threadID}/runs`, options);
  }
}

export type RunCreateResponse = unknown;

export declare namespace Runs {
  export { type RunCreateResponse as RunCreateResponse };
}
