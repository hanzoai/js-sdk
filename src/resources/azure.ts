// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Azure extends APIResource {
  /**
   * Call any azure endpoint using the proxy.
   *
   * Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`
   *
   * Checks if the deployment id in the url is a litellm model name. If so, it will
   * route using the llm_router.allm_passthrough_route.
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/azure/${endpoint}`, options);
  }

  /**
   * Call any azure endpoint using the proxy.
   *
   * Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`
   *
   * Checks if the deployment id in the url is a litellm model name. If so, it will
   * route using the llm_router.allm_passthrough_route.
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/azure/${endpoint}`, options);
  }

  /**
   * Call any azure endpoint using the proxy.
   *
   * Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`
   *
   * Checks if the deployment id in the url is a litellm model name. If so, it will
   * route using the llm_router.allm_passthrough_route.
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/azure/${endpoint}`, options);
  }

  /**
   * Call any azure endpoint using the proxy.
   *
   * Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`
   *
   * Checks if the deployment id in the url is a litellm model name. If so, it will
   * route using the llm_router.allm_passthrough_route.
   */
  call(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/azure/${endpoint}`, options);
  }

  /**
   * Call any azure endpoint using the proxy.
   *
   * Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`
   *
   * Checks if the deployment id in the url is a litellm model name. If so, it will
   * route using the llm_router.allm_passthrough_route.
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/azure/${endpoint}`, options);
  }
}

export type AzureCreateResponse = unknown;

export type AzureUpdateResponse = unknown;

export type AzureDeleteResponse = unknown;

export type AzureCallResponse = unknown;

export type AzurePatchResponse = unknown;

export declare namespace Azure {
  export {
    type AzureCreateResponse as AzureCreateResponse,
    type AzureUpdateResponse as AzureUpdateResponse,
    type AzureDeleteResponse as AzureDeleteResponse,
    type AzureCallResponse as AzureCallResponse,
    type AzurePatchResponse as AzurePatchResponse,
  };
}
