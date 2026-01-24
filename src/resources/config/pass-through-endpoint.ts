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
   * Update a pass-through endpoint by ID.
   */
  update(
    endpointID: string,
    body: PassThroughEndpointUpdateParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/config/pass_through_endpoint/${endpointID}`, { body, ...options });
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
   * Delete a pass-through endpoint by ID.
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
   * The route to be added to the LiteLLM Proxy Server.
   */
  path: string;

  /**
   * The URL to which requests for this path should be forwarded.
   */
  target: string;

  /**
   * Optional unique identifier for the pass-through endpoint. If not provided,
   * endpoints will be identified by path for backwards compatibility.
   */
  id?: string | null;

  /**
   * Whether authentication is required for the pass-through endpoint. If True,
   * requests to the endpoint will require a valid LiteLLM API key.
   */
  auth?: boolean;

  /**
   * The USD cost per request to the target endpoint. This is used to calculate the
   * cost of the request to the target endpoint.
   */
  cost_per_request?: number;

  /**
   * Guardrails configuration for this passthrough endpoint. Dict keys are guardrail
   * names, values are optional settings for field targeting. When set, all
   * org/team/key level guardrails will also execute. Defaults to None (no guardrails
   * execute).
   */
  guardrails?: { [key: string]: PassThroughGenericEndpoint.Guardrails | null } | null;

  /**
   * Key-value pairs of headers to be forwarded with the request. You can set any key
   * value pair here and it will be forwarded to your target endpoint
   */
  headers?: { [key: string]: unknown };

  /**
   * If True, requests to subpaths of the path will be forwarded to the target
   * endpoint. For example, if the path is /bria and include_subpath is True,
   * requests to /bria/v1/text-to-image/base/2.3 will be forwarded to the target
   * endpoint.
   */
  include_subpath?: boolean;
}

export namespace PassThroughGenericEndpoint {
  /**
   * Settings for a specific guardrail on a passthrough endpoint.
   *
   * Allows field-level targeting for guardrail execution.
   */
  export interface Guardrails {
    /**
     * JSONPath expressions for input field targeting (pre_call). Examples: 'query',
     * 'documents[*].text', 'messages[*].content'. If not specified, guardrail runs on
     * entire request payload.
     */
    request_fields?: Array<string> | null;

    /**
     * JSONPath expressions for output field targeting (post_call). Examples:
     * 'results[*].text', 'output'. If not specified, guardrail runs on entire response
     * payload.
     */
    response_fields?: Array<string> | null;
  }
}

export type PassThroughEndpointCreateResponse = unknown;

export type PassThroughEndpointUpdateResponse = unknown;

export interface PassThroughEndpointCreateParams {
  /**
   * The route to be added to the LiteLLM Proxy Server.
   */
  path: string;

  /**
   * The URL to which requests for this path should be forwarded.
   */
  target: string;

  /**
   * Optional unique identifier for the pass-through endpoint. If not provided,
   * endpoints will be identified by path for backwards compatibility.
   */
  id?: string | null;

  /**
   * Whether authentication is required for the pass-through endpoint. If True,
   * requests to the endpoint will require a valid LiteLLM API key.
   */
  auth?: boolean;

  /**
   * The USD cost per request to the target endpoint. This is used to calculate the
   * cost of the request to the target endpoint.
   */
  cost_per_request?: number;

  /**
   * Guardrails configuration for this passthrough endpoint. Dict keys are guardrail
   * names, values are optional settings for field targeting. When set, all
   * org/team/key level guardrails will also execute. Defaults to None (no guardrails
   * execute).
   */
  guardrails?: { [key: string]: PassThroughEndpointCreateParams.Guardrails | null } | null;

  /**
   * Key-value pairs of headers to be forwarded with the request. You can set any key
   * value pair here and it will be forwarded to your target endpoint
   */
  headers?: { [key: string]: unknown };

  /**
   * If True, requests to subpaths of the path will be forwarded to the target
   * endpoint. For example, if the path is /bria and include_subpath is True,
   * requests to /bria/v1/text-to-image/base/2.3 will be forwarded to the target
   * endpoint.
   */
  include_subpath?: boolean;
}

export namespace PassThroughEndpointCreateParams {
  /**
   * Settings for a specific guardrail on a passthrough endpoint.
   *
   * Allows field-level targeting for guardrail execution.
   */
  export interface Guardrails {
    /**
     * JSONPath expressions for input field targeting (pre_call). Examples: 'query',
     * 'documents[*].text', 'messages[*].content'. If not specified, guardrail runs on
     * entire request payload.
     */
    request_fields?: Array<string> | null;

    /**
     * JSONPath expressions for output field targeting (post_call). Examples:
     * 'results[*].text', 'output'. If not specified, guardrail runs on entire response
     * payload.
     */
    response_fields?: Array<string> | null;
  }
}

export interface PassThroughEndpointUpdateParams {
  /**
   * The route to be added to the LiteLLM Proxy Server.
   */
  path: string;

  /**
   * The URL to which requests for this path should be forwarded.
   */
  target: string;

  /**
   * Optional unique identifier for the pass-through endpoint. If not provided,
   * endpoints will be identified by path for backwards compatibility.
   */
  id?: string | null;

  /**
   * Whether authentication is required for the pass-through endpoint. If True,
   * requests to the endpoint will require a valid LiteLLM API key.
   */
  auth?: boolean;

  /**
   * The USD cost per request to the target endpoint. This is used to calculate the
   * cost of the request to the target endpoint.
   */
  cost_per_request?: number;

  /**
   * Guardrails configuration for this passthrough endpoint. Dict keys are guardrail
   * names, values are optional settings for field targeting. When set, all
   * org/team/key level guardrails will also execute. Defaults to None (no guardrails
   * execute).
   */
  guardrails?: { [key: string]: PassThroughEndpointUpdateParams.Guardrails | null } | null;

  /**
   * Key-value pairs of headers to be forwarded with the request. You can set any key
   * value pair here and it will be forwarded to your target endpoint
   */
  headers?: { [key: string]: unknown };

  /**
   * If True, requests to subpaths of the path will be forwarded to the target
   * endpoint. For example, if the path is /bria and include_subpath is True,
   * requests to /bria/v1/text-to-image/base/2.3 will be forwarded to the target
   * endpoint.
   */
  include_subpath?: boolean;
}

export namespace PassThroughEndpointUpdateParams {
  /**
   * Settings for a specific guardrail on a passthrough endpoint.
   *
   * Allows field-level targeting for guardrail execution.
   */
  export interface Guardrails {
    /**
     * JSONPath expressions for input field targeting (pre_call). Examples: 'query',
     * 'documents[*].text', 'messages[*].content'. If not specified, guardrail runs on
     * entire request payload.
     */
    request_fields?: Array<string> | null;

    /**
     * JSONPath expressions for output field targeting (post_call). Examples:
     * 'results[*].text', 'output'. If not specified, guardrail runs on entire response
     * payload.
     */
    response_fields?: Array<string> | null;
  }
}

export interface PassThroughEndpointListParams {
  endpoint_id?: string | null;

  team_id?: string | null;
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
    type PassThroughEndpointUpdateParams as PassThroughEndpointUpdateParams,
    type PassThroughEndpointListParams as PassThroughEndpointListParams,
    type PassThroughEndpointDeleteParams as PassThroughEndpointDeleteParams,
  };
}
