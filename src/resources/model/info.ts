// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Info extends APIResource {
  /**
   * Provides more info about each model in /models, including config.yaml
   * descriptions (except api key and api base)
   *
   * Parameters: llm_model_id: Optional[str] = None (this is the value of
   * `x-llm-model-id` returned in response headers)
   *
   *     - When llm_model_id is passed, it will return the info for that specific model
   *     - When llm_model_id is not passed, it will return the info for all models
   *
   * Returns: Returns a dictionary containing information about each model.
   *
   * Example Response:
   *
   * ```json
   * {
   *   "data": [
   *     {
   *       "model_name": "fake-openai-endpoint",
   *       "llm_params": {
   *         "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",
   *         "model": "openai/fake"
   *       },
   *       "model_info": {
   *         "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",
   *         "db_model": false
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  list(query: InfoListParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/model/info', { query, ...options });
  }
}

export type InfoListResponse = unknown;

export interface InfoListParams {
  llm_model_id?: string | null;
}

export declare namespace Info {
  export { type InfoListResponse as InfoListResponse, type InfoListParams as InfoListParams };
}
