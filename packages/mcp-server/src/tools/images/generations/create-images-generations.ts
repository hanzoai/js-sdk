// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
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
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.images.generations.create();
};

export default { metadata, tool, handler };
