// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_audio_transcriptions',
  description:
    'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createTranscription?lang=curl',
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        title: 'File',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.audio.transcriptions.create(body);
  },
});
