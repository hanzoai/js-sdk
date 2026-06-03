// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ModelAPI from './model';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Update extends APIResource {
  /**
   * Edit existing model params
   */
  full(body: UpdateFullParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/model/update', { body, ...options });
  }

  /**
   * PATCH Endpoint for partial model updates.
   *
   * Only updates the fields specified in the request while preserving other existing
   * values. Follows proper PATCH semantics by only modifying provided fields.
   *
   * Args: model_id: The ID of the model to update patch_data: The fields to update
   * and their new values user_api_key_dict: User authentication information
   *
   * Returns: Updated model information
   *
   * Raises: ProxyException: For various error conditions including authentication
   * and database errors
   */
  partial(modelID: string, body: UpdatePartialParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/model/${modelID}/update`, { body, ...options });
  }
}

export interface UpdateDeployment {
  llm_params?: UpdateDeployment.LlmParams | null;

  model_info?: ModelAPI.ModelInfo | null;

  model_name?: string | null;
}

export namespace UpdateDeployment {
  export interface LlmParams {
    api_base?: string | null;

    api_key?: string | null;

    api_version?: string | null;

    aws_access_key_id?: string | null;

    aws_region_name?: string | null;

    aws_secret_access_key?: string | null;

    budget_duration?: string | null;

    configurable_clientside_auth_params?: Array<
      string | ModelAPI.ConfigurableClientsideParamsCustomAuth
    > | null;

    custom_llm_provider?: string | null;

    input_cost_per_second?: number | null;

    input_cost_per_token?: number | null;

    llm_trace_id?: string | null;

    max_budget?: number | null;

    max_file_size_mb?: number | null;

    max_retries?: number | null;

    merge_reasoning_content_in_choices?: boolean | null;

    model?: string | null;

    model_info?: unknown | null;

    organization?: string | null;

    output_cost_per_second?: number | null;

    output_cost_per_token?: number | null;

    region_name?: string | null;

    rpm?: number | null;

    stream_timeout?: number | string | null;

    timeout?: number | string | null;

    tpm?: number | null;

    use_in_pass_through?: boolean | null;

    vertex_credentials?: unknown | string | null;

    vertex_location?: string | null;

    vertex_project?: string | null;

    watsonx_region_name?: string | null;

    [k: string]: unknown;
  }
}

export type UpdateFullResponse = unknown;

export type UpdatePartialResponse = unknown;

export interface UpdateFullParams {
  llm_params?: UpdateFullParams.LlmParams | null;

  model_info?: ModelAPI.ModelInfo | null;

  model_name?: string | null;
}

export namespace UpdateFullParams {
  export interface LlmParams {
    api_base?: string | null;

    api_key?: string | null;

    api_version?: string | null;

    aws_access_key_id?: string | null;

    aws_region_name?: string | null;

    aws_secret_access_key?: string | null;

    budget_duration?: string | null;

    configurable_clientside_auth_params?: Array<
      string | ModelAPI.ConfigurableClientsideParamsCustomAuth
    > | null;

    custom_llm_provider?: string | null;

    input_cost_per_second?: number | null;

    input_cost_per_token?: number | null;

    llm_trace_id?: string | null;

    max_budget?: number | null;

    max_file_size_mb?: number | null;

    max_retries?: number | null;

    merge_reasoning_content_in_choices?: boolean | null;

    model?: string | null;

    model_info?: unknown | null;

    organization?: string | null;

    output_cost_per_second?: number | null;

    output_cost_per_token?: number | null;

    region_name?: string | null;

    rpm?: number | null;

    stream_timeout?: number | string | null;

    timeout?: number | string | null;

    tpm?: number | null;

    use_in_pass_through?: boolean | null;

    vertex_credentials?: unknown | string | null;

    vertex_location?: string | null;

    vertex_project?: string | null;

    watsonx_region_name?: string | null;

    [k: string]: unknown;
  }
}

export interface UpdatePartialParams {
  llm_params?: UpdatePartialParams.LlmParams | null;

  model_info?: ModelAPI.ModelInfo | null;

  model_name?: string | null;
}

export namespace UpdatePartialParams {
  export interface LlmParams {
    api_base?: string | null;

    api_key?: string | null;

    api_version?: string | null;

    aws_access_key_id?: string | null;

    aws_region_name?: string | null;

    aws_secret_access_key?: string | null;

    budget_duration?: string | null;

    configurable_clientside_auth_params?: Array<
      string | ModelAPI.ConfigurableClientsideParamsCustomAuth
    > | null;

    custom_llm_provider?: string | null;

    input_cost_per_second?: number | null;

    input_cost_per_token?: number | null;

    llm_trace_id?: string | null;

    max_budget?: number | null;

    max_file_size_mb?: number | null;

    max_retries?: number | null;

    merge_reasoning_content_in_choices?: boolean | null;

    model?: string | null;

    model_info?: unknown | null;

    organization?: string | null;

    output_cost_per_second?: number | null;

    output_cost_per_token?: number | null;

    region_name?: string | null;

    rpm?: number | null;

    stream_timeout?: number | string | null;

    timeout?: number | string | null;

    tpm?: number | null;

    use_in_pass_through?: boolean | null;

    vertex_credentials?: unknown | string | null;

    vertex_location?: string | null;

    vertex_project?: string | null;

    watsonx_region_name?: string | null;

    [k: string]: unknown;
  }
}

export declare namespace Update {
  export {
    type UpdateDeployment as UpdateDeployment,
    type UpdateFullResponse as UpdateFullResponse,
    type UpdatePartialResponse as UpdatePartialResponse,
    type UpdateFullParams as UpdateFullParams,
    type UpdatePartialParams as UpdatePartialParams,
  };
}
