// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_responses',
  description:
    'Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses\n\n```bash\ncurl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d \'{\n    "model": "gpt-4o",\n    "input": "Tell me about AI"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.responses.create();
  },
});

registerApiMethod({
  name: 'retrieve_responses',
  description:
    'Get a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/get\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { response_id } = args;
    return client.responses.retrieve(response_id);
  },
});

registerApiMethod({
  name: 'delete_responses',
  description:
    'Delete a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/delete\n\n```bash\ncurl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { response_id } = args;
    return client.responses.delete(response_id);
  },
});
