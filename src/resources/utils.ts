// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Utils extends APIResource {
  /**
   * Returns supported openai params for a given litellm model name
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
   * Args: request: TokenCountRequest call_endpoint: bool - When set to "True" it
   * will call the token counting endpoint - e.g Anthropic or Google AI Studio Token
   * Counting APIs.
   *
   * Returns: TokenCountResponse
   */
  tokenCounter(
    params: UtilTokenCounterParams,
    options?: RequestOptions,
  ): APIPromise<UtilTokenCounterResponse> {
    const { call_endpoint, ...body } = params;
    return this._client.post('/utils/token_counter', { query: { call_endpoint }, body, ...options });
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

  error?: boolean;

  error_message?: string | null;

  original_response?: { [key: string]: unknown } | null;

  status_code?: number | null;
}

export interface UtilTransformRequestResponse {
  error?: string | null;

  raw_request_api_base?: string | null;

  raw_request_body?: { [key: string]: unknown } | null;

  raw_request_headers?: { [key: string]: unknown } | null;
}

export interface UtilGetSupportedOpenAIParamsParams {
  model: string;
}

export interface UtilTokenCounterParams {
  /**
   * Body param
   */
  model: string;

  /**
   * Query param
   */
  call_endpoint?: boolean;

  /**
   * Body param
   */
  contents?: Array<{ [key: string]: unknown }> | null;

  /**
   * Body param
   */
  messages?: Array<{ [key: string]: unknown }> | null;

  /**
   * Body param
   */
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
    | 'image_edit'
    | 'aimage_edit'
    | 'moderation'
    | 'amoderation'
    | 'atranscription'
    | 'transcription'
    | 'aspeech'
    | 'speech'
    | 'rerank'
    | 'arerank'
    | 'search'
    | 'asearch'
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
    | 'create_video'
    | 'acreate_video'
    | 'avideo_retrieve'
    | 'video_retrieve'
    | 'avideo_content'
    | 'video_content'
    | 'video_remix'
    | 'avideo_remix'
    | 'video_list'
    | 'avideo_list'
    | 'video_retrieve_job'
    | 'avideo_retrieve_job'
    | 'video_delete'
    | 'avideo_delete'
    | 'vector_store_file_create'
    | 'avector_store_file_create'
    | 'vector_store_file_list'
    | 'avector_store_file_list'
    | 'vector_store_file_retrieve'
    | 'avector_store_file_retrieve'
    | 'vector_store_file_content'
    | 'avector_store_file_content'
    | 'vector_store_file_update'
    | 'avector_store_file_update'
    | 'vector_store_file_delete'
    | 'avector_store_file_delete'
    | 'vector_store_create'
    | 'avector_store_create'
    | 'vector_store_search'
    | 'avector_store_search'
    | 'create_container'
    | 'acreate_container'
    | 'list_containers'
    | 'alist_containers'
    | 'retrieve_container'
    | 'aretrieve_container'
    | 'delete_container'
    | 'adelete_container'
    | 'list_container_files'
    | 'alist_container_files'
    | 'upload_container_file'
    | 'aupload_container_file'
    | 'acancel_fine_tuning_job'
    | 'cancel_fine_tuning_job'
    | 'alist_fine_tuning_jobs'
    | 'list_fine_tuning_jobs'
    | 'aretrieve_fine_tuning_job'
    | 'retrieve_fine_tuning_job'
    | 'responses'
    | 'aresponses'
    | 'alist_input_items'
    | 'llm_passthrough_route'
    | 'allm_passthrough_route'
    | 'generate_content'
    | 'agenerate_content'
    | 'generate_content_stream'
    | 'agenerate_content_stream'
    | 'ocr'
    | 'aocr'
    | 'call_mcp_tool'
    | 'asend_message'
    | 'send_message'
    | 'acreate_skill';

  request_body: { [key: string]: unknown };
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
