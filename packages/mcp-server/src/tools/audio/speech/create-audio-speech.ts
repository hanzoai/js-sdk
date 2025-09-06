// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'audio.speech',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/audio/speech',
  operationId: 'audio_speech_v1_audio_speech_post',
};

export const tool: Tool = {
  name: 'create_audio_speech',
  description: 'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createSpeech',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.audio.speech.create()) as object);
};

export default { metadata, tool, handler };
