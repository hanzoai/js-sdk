// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'audio.speech',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_audio_speech',
  description: 'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createSpeech',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.audio.speech.create();
};

export default { metadata, tool, handler };
