// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ModelAPI from './model';
import * as InfoAPI from './info';
import { Info, InfoListParams, InfoListResponse } from './info';
import * as UpdateAPI from './update';
import {
  Update,
  UpdateDeployment,
  UpdateFullParams,
  UpdateFullResponse,
  UpdatePartialParams,
  UpdatePartialResponse,
} from './update';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Model extends APIResource {
  info: InfoAPI.Info = new InfoAPI.Info(this._client);
  update: UpdateAPI.Update = new UpdateAPI.Update(this._client);

  /**
   * Allows adding new models to the model list in the config.yaml
   */
  create(body: ModelCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/model/new', { body, ...options });
  }

  /**
   * Allows deleting models in the model list in the config.yaml
   */
  delete(body: ModelDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/model/delete', { body, ...options });
  }
}

export interface ConfigurableClientsideParamsCustomAuth {
  api_base: string;
}

export interface ModelInfo {
  id: string | null;

  base_model?: string | null;

  created_at?: string | null;

  created_by?: string | null;

  db_model?: boolean;

  team_id?: string | null;

  team_public_model_name?: string | null;

  tier?: 'free' | 'paid' | null;

  updated_at?: string | null;

  updated_by?: string | null;

  [k: string]: unknown;
}

export type ModelCreateResponse = unknown;

export type ModelDeleteResponse = unknown;

export interface ModelCreateParams {
  /**
   * LLM Params with 'model' requirement - used for completions
   */
  llm_params: ModelCreateParams.LlmParams;

  model_info: ModelInfo;

  model_name: string;
}

export namespace ModelCreateParams {
  /**
   * LLM Params with 'model' requirement - used for completions
   */
  export interface LlmParams {
    model: string;

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

export interface ModelDeleteParams {
  id: string;
}

Model.Info = Info;
Model.Update = Update;

export declare namespace Model {
  export {
    type ConfigurableClientsideParamsCustomAuth as ConfigurableClientsideParamsCustomAuth,
    type ModelInfo as ModelInfo,
    type ModelCreateResponse as ModelCreateResponse,
    type ModelDeleteResponse as ModelDeleteResponse,
    type ModelCreateParams as ModelCreateParams,
    type ModelDeleteParams as ModelDeleteParams,
  };

  export { Info as Info, type InfoListResponse as InfoListResponse, type InfoListParams as InfoListParams };

  export {
    Update as Update,
    type UpdateDeployment as UpdateDeployment,
    type UpdateFullResponse as UpdateFullResponse,
    type UpdatePartialResponse as UpdatePartialResponse,
    type UpdateFullParams as UpdateFullParams,
    type UpdatePartialParams as UpdatePartialParams,
  };
}
