// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Content extends APIResource {
  /**
   * Returns information about a specific file. that can be used across - Assistants
   * API, Batch API This is the equivalent of GET
   * https://api.openai.com/v1/files/{file_id}/content
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/files/retrieve-contents
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/files/file-abc123/content         -H "Authorization: Bearer sk-1234"
   *
   * ```
   */
  retrieve(fileID: string, params: ContentRetrieveParams, options?: RequestOptions): APIPromise<unknown> {
    const { provider } = params;
    return this._client.get(path`/${provider}/v1/files/${fileID}/content`, options);
  }
}

export type ContentRetrieveResponse = unknown;

export interface ContentRetrieveParams {
  provider: string;
}

export declare namespace Content {
  export {
    type ContentRetrieveResponse as ContentRetrieveResponse,
    type ContentRetrieveParams as ContentRetrieveParams,
  };
}
