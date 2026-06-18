// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChatAPI from './chat';
import { Chat, ChatCompleteResponse } from './chat';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Engines extends APIResource {
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
    return this._client.post(path`/engines/${model}/completions`, options);
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
    return this._client.post(path`/engines/${model}/embeddings`, options);
  }
}

export type EngineCompleteResponse = unknown;

export type EngineEmbedResponse = unknown;

Engines.Chat = Chat;

export declare namespace Engines {
  export {
    type EngineCompleteResponse as EngineCompleteResponse,
    type EngineEmbedResponse as EngineEmbedResponse,
  };

  export { Chat as Chat, type ChatCompleteResponse as ChatCompleteResponse };
}
