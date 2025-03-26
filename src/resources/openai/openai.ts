// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DeploymentsAPI from './deployments/deployments';
import { DeploymentCompleteResponse, DeploymentEmbedResponse, Deployments } from './deployments/deployments';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class OpenAI extends APIResource {
  deployments: DeploymentsAPI.Deployments = new DeploymentsAPI.Deployments(this._client);

  /**
   * Simple pass-through for OpenAI. Use this if you want to directly send a request
   * to OpenAI.
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/openai/${endpoint}`, options);
  }

  /**
   * Simple pass-through for OpenAI. Use this if you want to directly send a request
   * to OpenAI.
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/openai/${endpoint}`, options);
  }

  /**
   * Simple pass-through for OpenAI. Use this if you want to directly send a request
   * to OpenAI.
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/openai/${endpoint}`, options);
  }

  /**
   * Simple pass-through for OpenAI. Use this if you want to directly send a request
   * to OpenAI.
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/openai/${endpoint}`, options);
  }

  /**
   * Simple pass-through for OpenAI. Use this if you want to directly send a request
   * to OpenAI.
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/openai/${endpoint}`, options);
  }
}

export type OpenAICreateResponse = unknown;

export type OpenAIRetrieveResponse = unknown;

export type OpenAIUpdateResponse = unknown;

export type OpenAIDeleteResponse = unknown;

export type OpenAIPatchResponse = unknown;

OpenAI.Deployments = Deployments;

export declare namespace OpenAI {
  export {
    type OpenAICreateResponse as OpenAICreateResponse,
    type OpenAIRetrieveResponse as OpenAIRetrieveResponse,
    type OpenAIUpdateResponse as OpenAIUpdateResponse,
    type OpenAIDeleteResponse as OpenAIDeleteResponse,
    type OpenAIPatchResponse as OpenAIPatchResponse,
  };

  export {
    Deployments as Deployments,
    type DeploymentCompleteResponse as DeploymentCompleteResponse,
    type DeploymentEmbedResponse as DeploymentEmbedResponse,
  };
}
