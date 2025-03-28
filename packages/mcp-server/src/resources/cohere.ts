// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
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
    return client.cohere.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
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
    return client.cohere.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
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
    return client.cohere.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
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
    return client.cohere.delete(endpoint);
  },
});

registerApiMethod({
  name: 'modify_cohere',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
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
    return client.cohere.modify(endpoint);
  },
});
