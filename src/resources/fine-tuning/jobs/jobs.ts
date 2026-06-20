// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CancelAPI from './cancel';
import { Cancel, CancelCreateResponse } from './cancel';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Jobs extends APIResource {
  cancel: CancelAPI.Cancel = new CancelAPI.Cancel(this._client);

  /**
   * Creates a fine-tuning job which begins the process of creating a new model from
   * a given dataset. This is the equivalent of POST
   * https://api.openai.com/v1/fine_tuning/jobs
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/fine-tuning/create
   *
   * Example Curl:
   *
   * ```
   * curl http://localhost:4000/v1/fine_tuning/jobs       -H "Content-Type: application/json"       -H "Authorization: Bearer sk-1234"       -d '{
   *     "model": "gpt-3.5-turbo",
   *     "training_file": "file-abc123",
   *     "hyperparameters": {
   *       "n_epochs": 4
   *     }
   *   }'
   * ```
   */
  create(body: JobCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/fine_tuning/jobs', { body, ...options });
  }

  /**
   * Retrieves a fine-tuning job. This is the equivalent of GET
   * https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}
   *
   * Supported Query Params:
   *
   * - `custom_llm_provider`: Name of the LLM provider
   * - `fine_tuning_job_id`: The ID of the fine-tuning job to retrieve.
   */
  retrieve(fineTuningJobID: string, query: JobRetrieveParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/fine_tuning/jobs/${fineTuningJobID}`, { query, ...options });
  }

  /**
   * Lists fine-tuning jobs for the organization. This is the equivalent of GET
   * https://api.openai.com/v1/fine_tuning/jobs
   *
   * Supported Query Params:
   *
   * - `custom_llm_provider`: Name of the LLM provider
   * - `after`: Identifier for the last job from the previous pagination request.
   * - `limit`: Number of fine-tuning jobs to retrieve (default is 20).
   */
  list(query: JobListParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/fine_tuning/jobs', { query, ...options });
  }
}

export type JobCreateResponse = unknown;

export type JobRetrieveResponse = unknown;

export type JobListResponse = unknown;

export interface JobCreateParams {
  custom_llm_provider: 'openai' | 'azure' | 'vertex_ai';

  model: string;

  training_file: string;

  hyperparameters?: JobCreateParams.Hyperparameters | null;

  integrations?: Array<string> | null;

  seed?: number | null;

  suffix?: string | null;

  validation_file?: string | null;

  [k: string]: unknown;
}

export namespace JobCreateParams {
  export interface Hyperparameters {
    batch_size?: string | number | null;

    learning_rate_multiplier?: string | number | null;

    n_epochs?: string | number | null;
  }
}

export interface JobRetrieveParams {
  custom_llm_provider: 'openai' | 'azure';
}

export interface JobListParams {
  custom_llm_provider: 'openai' | 'azure';

  after?: string | null;

  limit?: number | null;
}

Jobs.Cancel = Cancel;

export declare namespace Jobs {
  export {
    type JobCreateResponse as JobCreateResponse,
    type JobRetrieveResponse as JobRetrieveResponse,
    type JobListResponse as JobListResponse,
    type JobCreateParams as JobCreateParams,
    type JobRetrieveParams as JobRetrieveParams,
    type JobListParams as JobListParams,
  };

  export { Cancel as Cancel, type CancelCreateResponse as CancelCreateResponse };
}
