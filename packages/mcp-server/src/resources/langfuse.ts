// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
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
    return client.langfuse.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
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
    return client.langfuse.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
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
    return client.langfuse.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
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
    return client.langfuse.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
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
    return client.langfuse.patch(endpoint);
  },
});
