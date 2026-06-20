// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';

export class Transcriptions extends APIResource {
  /**
   * Same params as:
   *
   * https://platform.openai.com/docs/api-reference/audio/createTranscription?lang=curl
   */
  create(body: TranscriptionCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(
      '/v1/audio/transcriptions',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export type TranscriptionCreateResponse = unknown;

export interface TranscriptionCreateParams {
  file: Uploadable;
}

export declare namespace Transcriptions {
  export {
    type TranscriptionCreateResponse as TranscriptionCreateResponse,
    type TranscriptionCreateParams as TranscriptionCreateParams,
  };
}
