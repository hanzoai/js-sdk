// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_threads',
  description:
    'Create a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/createThread',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.threads.create();
  },
});

registerApiMethod({
  name: 'retrieve_threads',
  description:
    'Retrieves a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/getThread',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'string',
        title: 'Thread Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { thread_id } = args;
    return client.threads.retrieve(thread_id);
  },
});
