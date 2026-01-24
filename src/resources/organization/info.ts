// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationAPI from './organization';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Info extends APIResource {
  /**
   * Get the org specific information
   */
  retrieve(
    query: InfoRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationAPI.OrganizationTableWithMembers> {
    return this._client.get('/organization/info', { query, ...options });
  }

  /**
   * DEPRECATED: Use GET /organization/info instead
   */
  deprecated(body: InfoDeprecatedParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/organization/info', { body, ...options });
  }
}

export type InfoDeprecatedResponse = unknown;

export interface InfoRetrieveParams {
  organization_id: string;
}

export interface InfoDeprecatedParams {
  organizations: Array<string>;
}

export declare namespace Info {
  export {
    type InfoDeprecatedResponse as InfoDeprecatedResponse,
    type InfoRetrieveParams as InfoRetrieveParams,
    type InfoDeprecatedParams as InfoDeprecatedParams,
  };
}
