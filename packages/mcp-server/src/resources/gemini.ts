// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
    return client.gemini.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
    return client.gemini.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
    return client.gemini.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
    return client.gemini.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_gemini',
  description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
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
    return client.gemini.patch(endpoint);
  },
});
