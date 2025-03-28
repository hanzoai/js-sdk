// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
    return client.anthropic.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
    return client.anthropic.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
    return client.anthropic.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
    return client.anthropic.delete(endpoint);
  },
});

registerApiMethod({
  name: 'modify_anthropic',
  description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
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
    return client.anthropic.modify(endpoint);
  },
});
