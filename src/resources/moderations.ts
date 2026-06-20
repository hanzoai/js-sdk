// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Moderations extends APIResource {
  /**
   * The moderations endpoint is a tool you can use to check whether content complies
   * with an LLM Providers policies.
   *
   * Quick Start
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/moderations'     --header 'Content-Type: application/json'     --header 'Authorization: Bearer sk-1234'     --data '{"input": "Sample text goes here", "model": "text-moderation-stable"}'
   * ```
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/moderations', options);
  }
}

export type ModerationCreateResponse = unknown;

export declare namespace Moderations {
  export { type ModerationCreateResponse as ModerationCreateResponse };
}
