// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_config_pass_through_endpoint',
  description: 'Create new pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      headers: {
        type: 'object',
        title: 'Headers',
        description:
          'Key-value pairs of headers to be forwarded with the request. You can set any key value pair here and it will be forwarded to your target endpoint',
      },
      path: {
        type: 'string',
        title: 'Path',
        description: 'The route to be added to the LLM Proxy Server.',
      },
      target: {
        type: 'string',
        title: 'Target',
        description: 'The URL to which requests for this path should be forwarded.',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.config.passThroughEndpoint.create(body);
  },
});

registerApiMethod({
  name: 'update_config_pass_through_endpoint',
  description: 'Update a pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { endpoint_id } = args;
    return client.config.passThroughEndpoint.update(endpoint_id);
  },
});

registerApiMethod({
  name: 'list_config_pass_through_endpoint',
  description:
    'GET configured pass through endpoint.\n\nIf no endpoint_id given, return all configured endpoints.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.config.passThroughEndpoint.list(body);
  },
});

registerApiMethod({
  name: 'delete_config_pass_through_endpoint',
  description: 'Delete a pass-through endpoint\n\nReturns - the deleted endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.config.passThroughEndpoint.delete(body);
  },
});
