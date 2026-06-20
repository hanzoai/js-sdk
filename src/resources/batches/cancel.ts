// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Cancel extends APIResource {
  /**
   * Cancel a batch. This is the equivalent of POST
   * https://api.openai.com/v1/batches/{batch_id}/cancel
   *
   * Supports Identical Params as:
   * https://platform.openai.com/docs/api-reference/batch/cancel
   *
   * Example Curl
   *
   * ```
   * curl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST
   *
   * ```
   */
  cancel(
    batchID: string,
    params: CancelCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { provider } = params ?? {};
    return this._client.post(path`/batches/${batchID}/cancel`, { query: { provider }, ...options });
  }
}

export type CancelCancelResponse = unknown;

export interface CancelCancelParams {
  provider?: string | null;
}

export declare namespace Cancel {
  export { type CancelCancelResponse as CancelCancelResponse, type CancelCancelParams as CancelCancelParams };
}
