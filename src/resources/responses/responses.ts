// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InputItemsAPI from './input-items';
import { InputItemListResponse, InputItems } from './input-items';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Responses extends APIResource {
  inputItems: InputItemsAPI.InputItems = new InputItemsAPI.InputItems(this._client);

  /**
   * Follows the OpenAI Responses API spec:
   * https://platform.openai.com/docs/api-reference/responses
   *
   * Supports background mode with polling_via_cache for partial response retrieval.
   * When background=true and polling_via_cache is enabled, returns a polling_id
   * immediately and streams the response in the background, updating Redis cache.
   *
   * ```bash
   * # Normal request
   * curl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d '{
   *     "model": "gpt-4o",
   *     "input": "Tell me about AI"
   * }'
   *
   * # Background request with polling
   * curl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d '{
   *     "model": "gpt-4o",
   *     "input": "Tell me about AI",
   *     "background": true
   * }'
   * ```
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/responses', options);
  }

  /**
   * Get a response by ID.
   *
   * Supports both:
   *
   * - Polling IDs (litellm*poll*\*): Returns cumulative cached content from
   *   background responses
   * - Provider response IDs: Passes through to provider API
   *
   * Follows the OpenAI Responses API spec:
   * https://platform.openai.com/docs/api-reference/responses/get
   *
   * ```bash
   * # Get polling response
   * curl -X GET http://localhost:4000/v1/responses/litellm_poll_abc123     -H "Authorization: Bearer sk-1234"
   *
   * # Get provider response
   * curl -X GET http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"
   * ```
   */
  retrieve(responseID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/responses/${responseID}`, options);
  }

  /**
   * Delete a response by ID.
   *
   * Supports both:
   *
   * - Polling IDs (litellm*poll*\*): Deletes from Redis cache
   * - Provider response IDs: Passes through to provider API
   *
   * Follows the OpenAI Responses API spec:
   * https://platform.openai.com/docs/api-reference/responses/delete
   *
   * ```bash
   * curl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"
   * ```
   */
  delete(responseID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/responses/${responseID}`, options);
  }
}

export type ResponseCreateResponse = unknown;

export type ResponseRetrieveResponse = unknown;

export type ResponseDeleteResponse = unknown;

Responses.InputItems = InputItems;

export declare namespace Responses {
  export {
    type ResponseCreateResponse as ResponseCreateResponse,
    type ResponseRetrieveResponse as ResponseRetrieveResponse,
    type ResponseDeleteResponse as ResponseDeleteResponse,
  };

  export { InputItems as InputItems, type InputItemListResponse as InputItemListResponse };
}
