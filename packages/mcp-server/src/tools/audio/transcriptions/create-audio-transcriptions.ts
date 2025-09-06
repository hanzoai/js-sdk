// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'audio.transcriptions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/audio/transcriptions',
  operationId: 'audio_transcriptions_v1_audio_transcriptions_post',
};

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
    required: ['file'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.audio.transcriptions.create(body)) as object);
};

export default { metadata, tool, handler };
