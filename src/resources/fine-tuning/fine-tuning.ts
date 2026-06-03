// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as JobsAPI from './jobs/jobs';
import {
  JobCreateParams,
  JobCreateResponse,
  JobListParams,
  JobListResponse,
  JobRetrieveParams,
  JobRetrieveResponse,
  Jobs,
} from './jobs/jobs';

export class FineTuning extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
}

FineTuning.Jobs = Jobs;

export declare namespace FineTuning {
  export {
    Jobs as Jobs,
    type JobCreateResponse as JobCreateResponse,
    type JobRetrieveResponse as JobRetrieveResponse,
    type JobListResponse as JobListResponse,
    type JobCreateParams as JobCreateParams,
    type JobRetrieveParams as JobRetrieveParams,
    type JobListParams as JobListParams,
  };
}
