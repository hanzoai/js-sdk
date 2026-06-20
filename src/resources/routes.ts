// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Routes extends APIResource {
  /**
   * Get a list of available routes in the FastAPI application.
   */
  list(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/routes', options);
  }
}

export type RouteListResponse = unknown;

export declare namespace Routes {
  export { type RouteListResponse as RouteListResponse };
}
