// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SpeechAPI from './speech';
import { Speech, SpeechCreateResponse } from './speech';
import * as TranscriptionsAPI from './transcriptions';
import { TranscriptionCreateParams, TranscriptionCreateResponse, Transcriptions } from './transcriptions';

export class Audio extends APIResource {
  speech: SpeechAPI.Speech = new SpeechAPI.Speech(this._client);
  transcriptions: TranscriptionsAPI.Transcriptions = new TranscriptionsAPI.Transcriptions(this._client);
}

Audio.Speech = Speech;
Audio.Transcriptions = Transcriptions;

export declare namespace Audio {
  export { Speech as Speech, type SpeechCreateResponse as SpeechCreateResponse };

  export {
    Transcriptions as Transcriptions,
    type TranscriptionCreateResponse as TranscriptionCreateResponse,
    type TranscriptionCreateParams as TranscriptionCreateParams,
  };
}
