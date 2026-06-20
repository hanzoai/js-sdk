// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Speech extends APIResource {
  /**
   * Same params as:
   *
   * https://platform.openai.com/docs/api-reference/audio/createSpeech
   */
  create(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/audio/speech', options);
  }
}

export type SpeechCreateResponse = unknown;

export declare namespace Speech {
  export { type SpeechCreateResponse as SpeechCreateResponse };
}
