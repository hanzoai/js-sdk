// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SpendAPI from './spend';
import {
  Spend,
  SpendListTagsParams,
  SpendListTagsResponse,
  SpendResetResponse,
  SpendRetrieveReportParams,
  SpendRetrieveReportResponse,
} from './spend';

export class Global extends APIResource {
  spend: SpendAPI.Spend = new SpendAPI.Spend(this._client);
}

Global.Spend = Spend;

export declare namespace Global {
  export {
    Spend as Spend,
    type SpendListTagsResponse as SpendListTagsResponse,
    type SpendResetResponse as SpendResetResponse,
    type SpendRetrieveReportResponse as SpendRetrieveReportResponse,
    type SpendListTagsParams as SpendListTagsParams,
    type SpendRetrieveReportParams as SpendRetrieveReportParams,
  };
}
