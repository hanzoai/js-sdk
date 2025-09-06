// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'images.generations',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/images/generations',
  operationId: 'image_generation_v1_images_generations_post',
};

export const tool: Tool = {
  name: 'create_images_generations',
  description: 'Image Generation',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.images.generations.create()) as object);
};

export default { metadata, tool, handler };
