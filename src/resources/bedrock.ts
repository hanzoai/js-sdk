// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Bedrock extends APIResource {
  /**
   * This is the v1 passthrough for Bedrock. V2 is handled by the `/bedrock/v2`
   * endpoint. [Docs](https://docs.litellm.ai/docs/pass_through/bedrock)
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/bedrock/${endpoint}`, options);
  }

  /**
   * This is the v1 passthrough for Bedrock. V2 is handled by the `/bedrock/v2`
   * endpoint. [Docs](https://docs.litellm.ai/docs/pass_through/bedrock)
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/bedrock/${endpoint}`, options);
  }

  /**
   * This is the v1 passthrough for Bedrock. V2 is handled by the `/bedrock/v2`
   * endpoint. [Docs](https://docs.litellm.ai/docs/pass_through/bedrock)
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/bedrock/${endpoint}`, options);
  }

  /**
   * This is the v1 passthrough for Bedrock. V2 is handled by the `/bedrock/v2`
   * endpoint. [Docs](https://docs.litellm.ai/docs/pass_through/bedrock)
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/bedrock/${endpoint}`, options);
  }

  /**
   * This is the v1 passthrough for Bedrock. V2 is handled by the `/bedrock/v2`
   * endpoint. [Docs](https://docs.litellm.ai/docs/pass_through/bedrock)
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/bedrock/${endpoint}`, options);
  }
}

export type BedrockCreateResponse = unknown;

export type BedrockRetrieveResponse = unknown;

export type BedrockUpdateResponse = unknown;

export type BedrockDeleteResponse = unknown;

export type BedrockPatchResponse = unknown;

export declare namespace Bedrock {
  export {
    type BedrockCreateResponse as BedrockCreateResponse,
    type BedrockRetrieveResponse as BedrockRetrieveResponse,
    type BedrockUpdateResponse as BedrockUpdateResponse,
    type BedrockDeleteResponse as BedrockDeleteResponse,
    type BedrockPatchResponse as BedrockPatchResponse,
  };
}
