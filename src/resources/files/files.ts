// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ContentAPI from './content';
import { Content, ContentRetrieveParams, ContentRetrieveResponse } from './content';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  content: ContentAPI.Content = new ContentAPI.Content(this._client);

  /**
   * Upload a file that can be used across - Assistants API, Batch API This is the
   * equivalent of POST https://api.openai.com/v1/files
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/files/create
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/files         -H "Authorization: Bearer sk-1234"         -F purpose="batch"         -F file="@mydata.jsonl"
   *
   * ```
   */
  create(provider: string, body: FileCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(
      path`/${provider}/v1/files`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Returns information about a specific file. that can be used across - Assistants
   * API, Batch API This is the equivalent of GET
   * https://api.openai.com/v1/files/{file_id}
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/files/retrieve
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/files/file-abc123         -H "Authorization: Bearer sk-1234"
   *
   * ```
   */
  retrieve(fileID: string, params: FileRetrieveParams, options?: RequestOptions): APIPromise<unknown> {
    const { provider } = params;
    return this._client.get(path`/${provider}/v1/files/${fileID}`, options);
  }

  /**
   * Returns information about a specific file. that can be used across - Assistants
   * API, Batch API This is the equivalent of GET https://api.openai.com/v1/files/
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/files/list
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/files        -H "Authorization: Bearer sk-1234"
   *
   * ```
   */
  list(
    provider: string,
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/${provider}/v1/files`, { query, ...options });
  }

  /**
   * Deletes a specified file. that can be used across - Assistants API, Batch API
   * This is the equivalent of DELETE https://api.openai.com/v1/files/{file_id}
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/files/delete
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/files/file-abc123     -X DELETE     -H "Authorization: Bearer $OPENAI_API_KEY"
   *
   * ```
   */
  delete(fileID: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    const { provider } = params;
    return this._client.delete(path`/${provider}/v1/files/${fileID}`, options);
  }
}

export type FileCreateResponse = unknown;

export type FileRetrieveResponse = unknown;

export type FileListResponse = unknown;

export type FileDeleteResponse = unknown;

export interface FileCreateParams {
  file: Uploadable;

  purpose: string;

  custom_llm_provider?: string;
}

export interface FileRetrieveParams {
  provider: string;
}

export interface FileListParams {
  purpose?: string | null;
}

export interface FileDeleteParams {
  provider: string;
}

Files.Content = Content;

export declare namespace Files {
  export {
    type FileCreateResponse as FileCreateResponse,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileCreateParams as FileCreateParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileListParams as FileListParams,
    type FileDeleteParams as FileDeleteParams,
  };

  export {
    Content as Content,
    type ContentRetrieveResponse as ContentRetrieveResponse,
    type ContentRetrieveParams as ContentRetrieveParams,
  };
}
