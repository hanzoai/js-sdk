// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Guardrails extends APIResource {
  /**
   * List the guardrails that are available on the proxy server
   *
   * 👉 [Guardrail docs](https://docs.hanzo.ai/docs/proxy/guardrails/quick_start)
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
    guardrail_info: unknown | null;

    guardrail_name: string;

    /**
     * The returned LLM Params object for /guardrails/list
     */
    llm_params: Guardrail.LlmParams;
  }

  export namespace Guardrail {
    /**
     * The returned LLM Params object for /guardrails/list
     */
    export interface LlmParams {
      guardrail: string;

      mode: string | Array<string>;

      default_on?: boolean;
    }
  }
}

export declare namespace Guardrails {
  export { type GuardrailListResponse as GuardrailListResponse };
}
