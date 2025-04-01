// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.audio.transcriptions.create(body);
};

export default { tool, handler };
