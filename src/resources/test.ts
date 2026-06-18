// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Test extends APIResource {
  /**
   * [DEPRECATED] use `/health/liveliness` instead.
   *
   * A test endpoint that pings the proxy server to check if it's healthy.
   *
   * Parameters: request (Request): The incoming request.
   *
   * Returns: dict: A dictionary containing the route of the request URL.
   */
  ping(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/test', options);
  }
}

export type TestPingResponse = unknown;

export declare namespace Test {
  export { type TestPingResponse as TestPingResponse };
}
