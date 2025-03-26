// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Assemblyai extends APIResource {
  /**
   * Assemblyai Proxy Route
   */
  create(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  retrieve(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  update(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.put(path`/assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  delete(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/assemblyai/${endpoint}`, options);
  }

  /**
   * Assemblyai Proxy Route
   */
  patch(endpoint: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/assemblyai/${endpoint}`, options);
  }
}

export type AssemblyaiCreateResponse = unknown;

export type AssemblyaiRetrieveResponse = unknown;

export type AssemblyaiUpdateResponse = unknown;

export type AssemblyaiDeleteResponse = unknown;

export type AssemblyaiPatchResponse = unknown;

export declare namespace Assemblyai {
  export {
    type AssemblyaiCreateResponse as AssemblyaiCreateResponse,
    type AssemblyaiRetrieveResponse as AssemblyaiRetrieveResponse,
    type AssemblyaiUpdateResponse as AssemblyaiUpdateResponse,
    type AssemblyaiDeleteResponse as AssemblyaiDeleteResponse,
    type AssemblyaiPatchResponse as AssemblyaiPatchResponse,
  };
}
