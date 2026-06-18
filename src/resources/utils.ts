// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Utils extends APIResource {
  /**
   * Returns supported openai params for a given llm model name
   *
   * e.g. `gpt-4` vs `gpt-3.5-turbo`
   *
   * Example curl:
   *
   * ```
   * curl -X GET --location 'http://localhost:4000/utils/supported_openai_params?model=gpt-3.5-turbo-16k'         --header 'Authorization: Bearer sk-1234'
   * ```
   */
  getSupportedOpenAIParams(
    query: UtilGetSupportedOpenAIParamsParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/utils/supported_openai_params', { query, ...options });
  }

  /**
   * Token Counter
   */
  tokenCounter(body: UtilTokenCounterParams, options?: RequestOptions): APIPromise<UtilTokenCounterResponse> {
    return this._client.post('/utils/token_counter', { body, ...options });
  }

  /**
   * Transform Request
   */
  transformRequest(
    body: UtilTransformRequestParams,
    options?: RequestOptions,
  ): APIPromise<UtilTransformRequestResponse> {
    return this._client.post('/utils/transform_request', { body, ...options });
  }
}

export type UtilGetSupportedOpenAIParamsResponse = unknown;

export interface UtilTokenCounterResponse {
  model_used: string;

  request_model: string;

  tokenizer_type: string;

  total_tokens: number;
}

export interface UtilTransformRequestResponse {
  error?: string | null;

  raw_request_api_base?: string | null;

  raw_request_body?: unknown | null;

  raw_request_headers?: unknown | null;
}

export interface UtilGetSupportedOpenAIParamsParams {
  model: string;
}

export interface UtilTokenCounterParams {
  model: string;

  messages?: Array<unknown> | null;

  prompt?: string | null;
}

export interface UtilTransformRequestParams {
  call_type:
    | 'embedding'
    | 'aembedding'
    | 'completion'
    | 'acompletion'
    | 'atext_completion'
    | 'text_completion'
    | 'image_generation'
    | 'aimage_generation'
    | 'moderation'
    | 'amoderation'
    | 'atranscription'
    | 'transcription'
    | 'aspeech'
    | 'speech'
    | 'rerank'
    | 'arerank'
    | '_arealtime'
    | 'create_batch'
    | 'acreate_batch'
    | 'aretrieve_batch'
    | 'retrieve_batch'
    | 'pass_through_endpoint'
    | 'anthropic_messages'
    | 'get_assistants'
    | 'aget_assistants'
    | 'create_assistants'
    | 'acreate_assistants'
    | 'delete_assistant'
    | 'adelete_assistant'
    | 'acreate_thread'
    | 'create_thread'
    | 'aget_thread'
    | 'get_thread'
    | 'a_add_message'
    | 'add_message'
    | 'aget_messages'
    | 'get_messages'
    | 'arun_thread'
    | 'run_thread'
    | 'arun_thread_stream'
    | 'run_thread_stream'
    | 'afile_retrieve'
    | 'file_retrieve'
    | 'afile_delete'
    | 'file_delete'
    | 'afile_list'
    | 'file_list'
    | 'acreate_file'
    | 'create_file'
    | 'afile_content'
    | 'file_content'
    | 'create_fine_tuning_job'
    | 'acreate_fine_tuning_job'
    | 'acancel_fine_tuning_job'
    | 'cancel_fine_tuning_job'
    | 'alist_fine_tuning_jobs'
    | 'list_fine_tuning_jobs'
    | 'aretrieve_fine_tuning_job'
    | 'retrieve_fine_tuning_job'
    | 'responses'
    | 'aresponses';

  request_body: unknown;
}

export declare namespace Utils {
  export {
    type UtilGetSupportedOpenAIParamsResponse as UtilGetSupportedOpenAIParamsResponse,
    type UtilTokenCounterResponse as UtilTokenCounterResponse,
    type UtilTransformRequestResponse as UtilTransformRequestResponse,
    type UtilGetSupportedOpenAIParamsParams as UtilGetSupportedOpenAIParamsParams,
    type UtilTokenCounterParams as UtilTokenCounterParams,
    type UtilTransformRequestParams as UtilTransformRequestParams,
  };
}
