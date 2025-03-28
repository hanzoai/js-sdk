// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_threads_messages',
  description:
    'Create a message.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/createMessage',
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
    return client.threads.messages.create(thread_id);
  },
});

registerApiMethod({
  name: 'list_threads_messages',
  description:
    'Returns a list of messages for a given thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/listMessages',
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
    return client.threads.messages.list(thread_id);
  },
});
