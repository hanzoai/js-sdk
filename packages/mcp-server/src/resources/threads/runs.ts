// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_threads_runs',
  description:
    'Create a run.\n\nAPI Reference: https://platform.openai.com/docs/api-reference/runs/createRun',
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
    return client.threads.runs.create(thread_id);
  },
});
