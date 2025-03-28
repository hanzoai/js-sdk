// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_assistants',
  description:
    'Create assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.assistants.create();
  },
});

registerApiMethod({
  name: 'list_assistants',
  description:
    'Returns a list of assistants.\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.assistants.list();
  },
});

registerApiMethod({
  name: 'delete_assistants',
  description:
    'Delete assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
  inputSchema: {
    type: 'object',
    properties: {
      assistant_id: {
        type: 'string',
        title: 'Assistant Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { assistant_id } = args;
    return client.assistants.delete(assistant_id);
  },
});
