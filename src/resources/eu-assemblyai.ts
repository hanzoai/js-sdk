// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class EuAssemblyai extends APIResource {
  /**
   * Assemblyai Proxy Route
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/eu.assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/eu.assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/eu.assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/eu.assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/eu.assemblyai/${endpoint}`, options);
  }
}

export type EuAssemblyaiCreateResponse = unknown;

export type EuAssemblyaiRetrieveResponse = unknown;

export type EuAssemblyaiUpdateResponse = unknown;

export type EuAssemblyaiDeleteResponse = unknown;

export type EuAssemblyaiPatchResponse = unknown;

export declare namespace EuAssemblyai {
  export {
    type EuAssemblyaiCreateResponse as EuAssemblyaiCreateResponse,
    type EuAssemblyaiRetrieveResponse as EuAssemblyaiRetrieveResponse,
    type EuAssemblyaiUpdateResponse as EuAssemblyaiUpdateResponse,
    type EuAssemblyaiDeleteResponse as EuAssemblyaiDeleteResponse,
    type EuAssemblyaiPatchResponse as EuAssemblyaiPatchResponse,
  };
}
