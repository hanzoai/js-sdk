// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_vertex_ai',
  description:
    'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { endpoint } = args;
    return client.vertexAI.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_vertex_ai',
  description:
    'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { endpoint } = args;
    return client.vertexAI.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_vertex_ai',
  description:
    'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { endpoint } = args;
    return client.vertexAI.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_vertex_ai',
  description:
    'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { endpoint } = args;
    return client.vertexAI.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_vertex_ai',
  description:
    'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { endpoint } = args;
    return client.vertexAI.patch(endpoint);
  },
});
