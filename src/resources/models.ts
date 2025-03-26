// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Models extends APIResource {
  /**
   * Use `/model/info` - to get detailed model information, example - pricing, mode,
   * etc.
   *
   * This is just for compatibility with openai projects like aider.
   */
  list(query: ModelListParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/models', { query, ...options });
  }
}

export type ModelListResponse = unknown;

export interface ModelListParams {
  return_wildcard_routes?: boolean | null;

  team_id?: string | null;
}

export declare namespace Models {
  export { type ModelListResponse as ModelListResponse, type ModelListParams as ModelListParams };
}
