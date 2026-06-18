// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Credentials extends APIResource {
  /**
   * [BETA] endpoint. This might change unexpectedly. Stores credential in DB.
   * Reloads credentials in memory.
   */
  create(body: CredentialCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/credentials', { body, ...options });
  }

  /**
   * [BETA] endpoint. This might change unexpectedly.
   */
  list(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/credentials', options);
  }

  /**
   * [BETA] endpoint. This might change unexpectedly.
   */
  delete(credentialName: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/credentials/${credentialName}`, options);
  }
}

export interface CredentialItem {
  credential_info: unknown;

  credential_name: string;

  credential_values: unknown;
}

export type CredentialCreateResponse = unknown;

export type CredentialListResponse = unknown;

export type CredentialDeleteResponse = unknown;

export interface CredentialCreateParams {
  credential_info: unknown;

  credential_name: string;

  credential_values?: unknown | null;

  model_id?: string | null;
}

export declare namespace Credentials {
  export {
    type CredentialItem as CredentialItem,
    type CredentialCreateResponse as CredentialCreateResponse,
    type CredentialListResponse as CredentialListResponse,
    type CredentialDeleteResponse as CredentialDeleteResponse,
    type CredentialCreateParams as CredentialCreateParams,
  };
}
