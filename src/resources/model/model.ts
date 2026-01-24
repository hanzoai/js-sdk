// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
   * LiteLLM Params with 'model' requirement - used for completions
   */
  litellm_params: ModelCreateParams.LitellmParams;

  model_info: ModelInfo;

  model_name: string;

  [k: string]: unknown;
}

export namespace ModelCreateParams {
  /**
   * LiteLLM Params with 'model' requirement - used for completions
   */
  export interface LitellmParams {
    model: string;

    api_base?: string | null;

    api_key?: string | null;

    api_version?: string | null;

    auto_router_config?: string | null;

    auto_router_config_path?: string | null;

    auto_router_default_model?: string | null;

    auto_router_embedding_model?: string | null;

    aws_access_key_id?: string | null;

    aws_bedrock_runtime_endpoint?: string | null;

    aws_region_name?: string | null;

    aws_secret_access_key?: string | null;

    budget_duration?: string | null;

    cache_creation_input_audio_token_cost?: number | null;

    cache_creation_input_token_cost?: number | null;

    cache_creation_input_token_cost_above_1hr?: number | null;

    cache_creation_input_token_cost_above_200k_tokens?: number | null;

    cache_read_input_audio_token_cost?: number | null;

    cache_read_input_token_cost?: number | null;

    cache_read_input_token_cost_above_200k_tokens?: number | null;

    cache_read_input_token_cost_flex?: number | null;

    cache_read_input_token_cost_priority?: number | null;

    citation_cost_per_token?: number | null;

    configurable_clientside_auth_params?: Array<
      string | LitellmParams.ConfigurableClientsideParamsCustomAuthInput
    > | null;

    custom_llm_provider?: string | null;

    gcs_bucket_name?: string | null;

    input_cost_per_audio_per_second?: number | null;

    input_cost_per_audio_per_second_above_128k_tokens?: number | null;

    input_cost_per_audio_token?: number | null;

    input_cost_per_character?: number | null;

    input_cost_per_character_above_128k_tokens?: number | null;

    input_cost_per_image?: number | null;

    input_cost_per_image_above_128k_tokens?: number | null;

    input_cost_per_pixel?: number | null;

    input_cost_per_query?: number | null;

    input_cost_per_second?: number | null;

    input_cost_per_token?: number | null;

    input_cost_per_token_above_128k_tokens?: number | null;

    input_cost_per_token_above_200k_tokens?: number | null;

    input_cost_per_token_batches?: number | null;

    input_cost_per_token_cache_hit?: number | null;

    input_cost_per_token_flex?: number | null;

    input_cost_per_token_priority?: number | null;

    input_cost_per_video_per_second?: number | null;

    input_cost_per_video_per_second_above_128k_tokens?: number | null;

    input_cost_per_video_per_second_above_15s_interval?: number | null;

    input_cost_per_video_per_second_above_8s_interval?: number | null;

    litellm_credential_name?: string | null;

    litellm_trace_id?: string | null;

    max_budget?: number | null;

    max_file_size_mb?: number | null;

    max_retries?: number | null;

    merge_reasoning_content_in_choices?: boolean | null;

    milvus_text_field?: string | null;

    mock_response?: string | LitellmParams.ModelResponse | unknown | null;

    model_info?: { [key: string]: unknown } | null;

    organization?: string | null;

    output_cost_per_audio_per_second?: number | null;

    output_cost_per_audio_token?: number | null;

    output_cost_per_character?: number | null;

    output_cost_per_character_above_128k_tokens?: number | null;

    output_cost_per_image?: number | null;

    output_cost_per_image_token?: number | null;

    output_cost_per_pixel?: number | null;

    output_cost_per_reasoning_token?: number | null;

    output_cost_per_second?: number | null;

    output_cost_per_token?: number | null;

    output_cost_per_token_above_128k_tokens?: number | null;

    output_cost_per_token_above_200k_tokens?: number | null;

    output_cost_per_token_batches?: number | null;

    output_cost_per_token_flex?: number | null;

    output_cost_per_token_priority?: number | null;

    output_cost_per_video_per_second?: number | null;

    region_name?: string | null;

    rpm?: number | null;

    s3_bucket_name?: string | null;

    s3_encryption_key_id?: string | null;

    search_context_cost_per_query?: { [key: string]: unknown } | null;

    stream_timeout?: number | string | null;

    tiered_pricing?: Array<{ [key: string]: unknown }> | null;

    timeout?: number | string | null;

    tpm?: number | null;

    use_in_pass_through?: boolean | null;

    use_litellm_proxy?: boolean | null;

    vector_store_id?: string | null;

    vertex_credentials?: string | { [key: string]: unknown } | null;

    vertex_location?: string | null;

    vertex_project?: string | null;

    watsonx_region_name?: string | null;

    [k: string]: unknown;
  }

  export namespace LitellmParams {
    export interface ConfigurableClientsideParamsCustomAuthInput {
      api_base: string;

      [k: string]: unknown;
    }

    export interface ModelResponse {
      id: string;

      choices: Array<ModelResponse.Choices | { [key: string]: unknown }>;

      created: number;

      object: string;

      model?: string | null;

      system_fingerprint?: string | null;

      [k: string]: unknown;
    }

    export namespace ModelResponse {
      export interface Choices {
        finish_reason: string;

        index: number;

        message: Choices.Message;

        logprobs?: Choices.ChoiceLogprobs | unknown | null;

        provider_specific_fields?: { [key: string]: unknown } | null;

        [k: string]: unknown;
      }

      export namespace Choices {
        export interface Message {
          content: string | null;

          function_call: Message.FunctionCall | null;

          role: 'assistant' | 'user' | 'system' | 'tool' | 'function';

          tool_calls: Array<{ [key: string]: unknown }> | null;

          annotations?: Array<Message.Annotation> | null;

          audio?: Message.Audio | null;

          images?: Array<Message.Image> | null;

          provider_specific_fields?: { [key: string]: unknown } | null;

          reasoning_content?: string | null;

          thinking_blocks?: Array<
            Message.ChatCompletionThinkingBlock | Message.ChatCompletionRedactedThinkingBlock
          > | null;

          [k: string]: unknown;
        }

        export namespace Message {
          export interface FunctionCall {
            arguments: string;

            name?: string | null;

            [k: string]: unknown;
          }

          export interface Annotation {
            type?: 'url_citation';

            url_citation?: Annotation.URLCitation;

            [k: string]: unknown;
          }

          export namespace Annotation {
            export interface URLCitation {
              end_index?: number;

              start_index?: number;

              title?: string;

              url?: string;

              [k: string]: unknown;
            }
          }

          export interface Audio {
            id: string;

            data: string;

            expires_at: number;

            transcript: string;

            [k: string]: unknown;
          }

          export interface Image {
            image_url: Image.ImageURL;

            index: number;

            type: 'image_url';

            [k: string]: unknown;
          }

          export namespace Image {
            export interface ImageURL {
              url: string;

              detail?: string | null;

              [k: string]: unknown;
            }
          }

          export interface ChatCompletionThinkingBlock {
            type: 'thinking';

            cache_control?:
              | { [key: string]: unknown }
              | ChatCompletionThinkingBlock.ChatCompletionCachedContent
              | null;

            signature?: string;

            thinking?: string;
          }

          export namespace ChatCompletionThinkingBlock {
            export interface ChatCompletionCachedContent {
              type: 'ephemeral';
            }
          }

          export interface ChatCompletionRedactedThinkingBlock {
            type: 'redacted_thinking';

            cache_control?:
              | { [key: string]: unknown }
              | ChatCompletionRedactedThinkingBlock.ChatCompletionCachedContent
              | null;

            data?: string;
          }

          export namespace ChatCompletionRedactedThinkingBlock {
            export interface ChatCompletionCachedContent {
              type: 'ephemeral';
            }
          }
        }

        export interface ChoiceLogprobs {
          content?: Array<ChoiceLogprobs.Content> | null;

          [k: string]: unknown;
        }

        export namespace ChoiceLogprobs {
          export interface Content {
            token: string;

            logprob: number;

            top_logprobs: Array<Content.TopLogprob>;

            bytes?: Array<number> | null;

            [k: string]: unknown;
          }

          export namespace Content {
            export interface TopLogprob {
              token: string;

              logprob: number;

              bytes?: Array<number> | null;

              [k: string]: unknown;
            }
          }
        }
      }
    }
  }
}

export interface ModelDeleteParams {
  id: string;
}

Model.Info = Info;
Model.Update = Update;

export declare namespace Model {
  export {
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
