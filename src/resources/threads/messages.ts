// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Messages extends APIResource {
  /**
   * Create a message.
   *
   * API Reference -
   * https://platform.openai.com/docs/api-reference/messages/createMessage
   */
  create(threadID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1/threads/${threadID}/messages`, options);
  }

  /**
   * Returns a list of messages for a given thread.
   *
   * API Reference -
   * https://platform.openai.com/docs/api-reference/messages/listMessages
   */
  list(threadID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/threads/${threadID}/messages`, options);
  }
}

export type MessageCreateResponse = unknown;

export type MessageListResponse = unknown;

export declare namespace Messages {
  export {
    type MessageCreateResponse as MessageCreateResponse,
    type MessageListResponse as MessageListResponse,
  };
}
