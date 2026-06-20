// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Model extends APIResource {
  /**
   * Add models to a team's allowed model list. Only proxy admin or team admin can
   * add models.
   *
   * Parameters:
   *
   * - team_id: str - Required. The team to add models to
   * - models: List[str] - Required. List of models to add to the team
   *
   * Example Request:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/model/add'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "team_id": "team-1234",
   *     "models": ["gpt-4", "claude-2"]
   * }'
   * ```
   */
  add(body: ModelAddParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/team/model/add', { body, ...options });
  }

  /**
   * Remove models from a team's allowed model list. Only proxy admin or team admin
   * can remove models.
   *
   * Parameters:
   *
   * - team_id: str - Required. The team to remove models from
   * - models: List[str] - Required. List of models to remove from the team
   *
   * Example Request:
   *
   * ```
   * curl --location 'http://0.0.0.0:4000/team/model/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
   *     "team_id": "team-1234",
   *     "models": ["gpt-4"]
   * }'
   * ```
   */
  remove(body: ModelRemoveParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/team/model/delete', { body, ...options });
  }
}

export type ModelAddResponse = unknown;

export type ModelRemoveResponse = unknown;

export interface ModelAddParams {
  models: Array<string>;

  team_id: string;
}

export interface ModelRemoveParams {
  models: Array<string>;

  team_id: string;
}

export declare namespace Model {
  export {
    type ModelAddResponse as ModelAddResponse,
    type ModelRemoveResponse as ModelRemoveResponse,
    type ModelAddParams as ModelAddParams,
    type ModelRemoveParams as ModelRemoveParams,
  };
}
