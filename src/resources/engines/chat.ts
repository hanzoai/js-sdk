// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Chat extends APIResource {
  /**
   * Follows the exact same API spec as
   * `OpenAI's Chat API https://platform.openai.com/docs/api-reference/chat`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/chat/completions
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "gpt-4o",
   *     "messages": [
   *         {
   *             "role": "user",
   *             "content": "Hello!"
   *         }
   *     ]
   * }'
   * ```
   */
  complete(model: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/engines/${model}/chat/completions`, options);
  }
}

export type ChatCompleteResponse = unknown;

export declare namespace Chat {
  export { type ChatCompleteResponse as ChatCompleteResponse };
}
