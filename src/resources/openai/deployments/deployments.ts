// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ChatAPI from './chat';
import { Chat, ChatCompleteResponse } from './chat';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Deployments extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);

  /**
   * Follows the exact same API spec as
   * `OpenAI's Completions API https://platform.openai.com/docs/api-reference/completions`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/completions
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "gpt-3.5-turbo-instruct",
   *     "prompt": "Once upon a time",
   *     "max_tokens": 50,
   *     "temperature": 0.7
   * }'
   * ```
   */
  complete(model: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/openai/deployments/${model}/completions`, options);
  }

  /**
   * Follows the exact same API spec as
   * `OpenAI's Embeddings API https://platform.openai.com/docs/api-reference/embeddings`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/embeddings
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "text-embedding-ada-002",
   *     "input": "The quick brown fox jumps over the lazy dog"
   * }'
   * ```
   */
  embed(model: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/openai/deployments/${model}/embeddings`, options);
  }
}

export type DeploymentCompleteResponse = unknown;

export type DeploymentEmbedResponse = unknown;

Deployments.Chat = Chat;

export declare namespace Deployments {
  export {
    type DeploymentCompleteResponse as DeploymentCompleteResponse,
    type DeploymentEmbedResponse as DeploymentEmbedResponse,
  };

  export { Chat as Chat, type ChatCompleteResponse as ChatCompleteResponse };
}
