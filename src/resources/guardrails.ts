// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Guardrails extends APIResource {
  /**
   * List the guardrails that are available on the proxy server
   *
   * 👉 [Guardrail docs](https://docs.litellm.ai/docs/proxy/guardrails/quick_start)
   *
   * Example Request:
   *
   * ```bash
   * curl -X GET "http://localhost:4000/guardrails/list" -H "Authorization: Bearer <your_api_key>"
   * ```
   *
   * Example Response:
   *
   * ```json
   * {
   *   "guardrails": [
   *     {
   *       "guardrail_name": "bedrock-pre-guard",
   *       "guardrail_info": {
   *         "params": [
   *           {
   *             "name": "toxicity_score",
   *             "type": "float",
   *             "description": "Score between 0-1 indicating content toxicity level"
   *           },
   *           {
   *             "name": "pii_detection",
   *             "type": "boolean"
   *           }
   *         ]
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  list(options?: RequestOptions): APIPromise<GuardrailListResponse> {
    return this._client.get('/guardrails/list', options);
  }
}

export interface GuardrailListResponse {
  guardrails: Array<GuardrailListResponse.Guardrail>;
}

export namespace GuardrailListResponse {
  export interface Guardrail {
    guardrail_name: string;

    created_at?: string | null;

    guardrail_definition_location?: 'db' | 'config';

    guardrail_id?: string | null;

    guardrail_info?: { [key: string]: unknown } | null;

    litellm_params?: Guardrail.LitellmParams | null;

    updated_at?: string | null;
  }

  export namespace Guardrail {
    export interface LitellmParams {
      /**
       * Additional provider-specific parameters for generic guardrail APIs
       */
      additional_provider_specific_params?: { [key: string]: unknown } | null;

      /**
       * Base URL for the guardrail service API
       */
      api_base?: string | null;

      /**
       * Optional custom API endpoint for Model Armor
       */
      api_endpoint?: string | null;

      /**
       * API key for the guardrail service
       */
      api_key?: string | null;

      /**
       * Threshold configuration for Lakera guardrail categories
       */
      category_thresholds?: LitellmParams.CategoryThresholds | null;

      /**
       * Path to Google Cloud credentials JSON file or JSON string
       */
      credentials?: string | null;

      /**
       * Whether the guardrail is enabled by default
       */
      default_on?: boolean | null;

      /**
       * Configuration for detect-secrets guardrail
       */
      detect_secrets_config?: { [key: string]: unknown } | null;

      /**
       * When True, guardrails only receive the latest message for the relevant role
       * (e.g., newest user input pre-call, newest assistant output post-call)
       */
      experimental_use_latest_role_message_only?: boolean | null;

      /**
       * Whether to fail the request if Model Armor encounters an error
       */
      fail_on_error?: boolean | null;

      /**
       * Name of the guardrail in guardrails.ai
       */
      guard_name?: string | null;

      /**
       * Google Cloud location/region (e.g., us-central1)
       */
      location?: string | null;

      /**
       * Will mask request content if guardrail makes any changes
       */
      mask_request_content?: boolean | null;

      /**
       * Will mask response content if guardrail makes any changes
       */
      mask_response_content?: boolean | null;

      /**
       * Optional field if guardrail requires a 'model' parameter
       */
      model?: string | null;

      /**
       * Recipe for input (LLM request)
       */
      pangea_input_recipe?: string | null;

      /**
       * Recipe for output (LLM response)
       */
      pangea_output_recipe?: string | null;

      /**
       * The ID of your Model Armor template
       */
      template_id?: string | null;

      /**
       * Custom message when a guardrail blocks an action. Supports placeholders like
       * {tool_name}, {rule_id}, and {default_message}.
       */
      violation_message_template?: string | null;

      [k: string]: unknown;
    }

    export namespace LitellmParams {
      /**
       * Threshold configuration for Lakera guardrail categories
       */
      export interface CategoryThresholds {
        jailbreak?: number;

        prompt_injection?: number;

        [k: string]: unknown;
      }
    }
  }
}

export declare namespace Guardrails {
  export { type GuardrailListResponse as GuardrailListResponse };
}
