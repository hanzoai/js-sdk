// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_bedrock',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
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
    return client.bedrock.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_bedrock',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
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
    return client.bedrock.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_bedrock',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
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
    return client.bedrock.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_bedrock',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
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
    return client.bedrock.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_bedrock',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
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
    return client.bedrock.patch(endpoint);
  },
});
