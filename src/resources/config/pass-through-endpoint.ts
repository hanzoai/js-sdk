// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class PassThroughEndpoint extends APIResource {
  /**
   * Create new pass-through endpoint
   */
  create(body: PassThroughEndpointCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/config/pass_through_endpoint', { body, ...options });
  }

  /**
   * Update a pass-through endpoint
   */
  update(endpointID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/config/pass_through_endpoint/${endpointID}`, options);
  }

  /**
   * GET configured pass through endpoint.
   *
   * If no endpoint_id given, return all configured endpoints.
   */
  list(
    query: PassThroughEndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PassThroughEndpointResponse> {
    return this._client.get('/config/pass_through_endpoint', { query, ...options });
  }

  /**
   * Delete a pass-through endpoint
   *
   * Returns - the deleted endpoint
   */
  delete(
    params: PassThroughEndpointDeleteParams,
    options?: RequestOptions,
  ): APIPromise<PassThroughEndpointResponse> {
    const { endpoint_id } = params;
    return this._client.delete('/config/pass_through_endpoint', { query: { endpoint_id }, ...options });
  }
}

export interface PassThroughEndpointResponse {
  endpoints: Array<PassThroughGenericEndpoint>;
}

export interface PassThroughGenericEndpoint {
  /**
   * Key-value pairs of headers to be forwarded with the request. You can set any key
   * value pair here and it will be forwarded to your target endpoint
   */
  headers: unknown;

  /**
   * The route to be added to the LLM Proxy Server.
   */
  path: string;

  /**
   * The URL to which requests for this path should be forwarded.
   */
  target: string;
}

export type PassThroughEndpointCreateResponse = unknown;

export type PassThroughEndpointUpdateResponse = unknown;

export interface PassThroughEndpointCreateParams {
  /**
   * Key-value pairs of headers to be forwarded with the request. You can set any key
   * value pair here and it will be forwarded to your target endpoint
   */
  headers: unknown;

  /**
   * The route to be added to the LLM Proxy Server.
   */
  path: string;

  /**
   * The URL to which requests for this path should be forwarded.
   */
  target: string;
}

export interface PassThroughEndpointListParams {
  endpoint_id?: string | null;
}

export interface PassThroughEndpointDeleteParams {
  endpoint_id: string;
}

export declare namespace PassThroughEndpoint {
  export {
    type PassThroughEndpointResponse as PassThroughEndpointResponse,
    type PassThroughGenericEndpoint as PassThroughGenericEndpoint,
    type PassThroughEndpointCreateResponse as PassThroughEndpointCreateResponse,
    type PassThroughEndpointUpdateResponse as PassThroughEndpointUpdateResponse,
    type PassThroughEndpointCreateParams as PassThroughEndpointCreateParams,
    type PassThroughEndpointListParams as PassThroughEndpointListParams,
    type PassThroughEndpointDeleteParams as PassThroughEndpointDeleteParams,
  };
}
