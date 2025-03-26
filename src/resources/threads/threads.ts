// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MessagesAPI from './messages';
import { MessageCreateResponse, MessageListResponse, Messages } from './messages';
import * as RunsAPI from './runs';
import { RunCreateResponse, Runs } from './runs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Threads extends APIResource {
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

  /**
   * Create a thread.
   *
   * API Reference -
   * https://platform.openai.com/docs/api-reference/threads/createThread
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/threads', options);
  }

  /**
   * Retrieves a thread.
   *
   * API Reference - https://platform.openai.com/docs/api-reference/threads/getThread
   */
  retrieve(threadID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/threads/${threadID}`, options);
  }
}

export type ThreadCreateResponse = unknown;

export type ThreadRetrieveResponse = unknown;

Threads.Messages = Messages;
Threads.Runs = Runs;

export declare namespace Threads {
  export {
    type ThreadCreateResponse as ThreadCreateResponse,
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
  };

  export {
    Messages as Messages,
    type MessageCreateResponse as MessageCreateResponse,
    type MessageListResponse as MessageListResponse,
  };

  export { Runs as Runs, type RunCreateResponse as RunCreateResponse };
}
