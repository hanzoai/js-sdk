// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Cancel extends APIResource {
  /**
   * Cancel a fine-tuning job.
   *
   * This is the equivalent of POST
   * https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel
   *
   * Supported Query Params:
   *
   * - `custom_llm_provider`: Name of the LLM provider
   * - `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.
   */
  create(fineTuningJobID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1/fine_tuning/jobs/${fineTuningJobID}/cancel`, options);
  }
}

export type CancelCreateResponse = unknown;

export declare namespace Cancel {
  export { type CancelCreateResponse as CancelCreateResponse };
}
