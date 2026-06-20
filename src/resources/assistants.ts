// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Assistants extends APIResource {
  /**
   * Create assistant
   *
   * API Reference docs -
   * https://platform.openai.com/docs/api-reference/assistants/createAssistant
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/assistants', options);
  }

  /**
   * Returns a list of assistants.
   *
   * API Reference docs -
   * https://platform.openai.com/docs/api-reference/assistants/listAssistants
   */
  list(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/assistants', options);
  }

  /**
   * Delete assistant
   *
   * API Reference docs -
   * https://platform.openai.com/docs/api-reference/assistants/createAssistant
   */
  delete(assistantID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/assistants/${assistantID}`, options);
  }
}

export type AssistantCreateResponse = unknown;

export type AssistantListResponse = unknown;

export type AssistantDeleteResponse = unknown;

export declare namespace Assistants {
  export {
    type AssistantCreateResponse as AssistantCreateResponse,
    type AssistantListResponse as AssistantListResponse,
    type AssistantDeleteResponse as AssistantDeleteResponse,
  };
}
