// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
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
    return client.azure.create(endpoint);
  },
});

registerApiMethod({
  name: 'update_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
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
    return client.azure.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
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
    return client.azure.delete(endpoint);
  },
});

registerApiMethod({
  name: 'call_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
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
    return client.azure.call(endpoint);
  },
});

registerApiMethod({
  name: 'patch_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
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
    return client.azure.patch(endpoint);
  },
});
