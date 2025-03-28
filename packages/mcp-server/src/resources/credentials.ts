// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_credentials',
  description:
    '[BETA] endpoint. This might change unexpectedly.\nStores credential in DB.\nReloads credentials in memory.',
  inputSchema: {
    type: 'object',
    properties: {
      credential_info: {
        type: 'object',
        title: 'Credential Info',
      },
      credential_name: {
        type: 'string',
        title: 'Credential Name',
      },
      credential_values: {
        type: 'object',
        title: 'Credential Values',
      },
      model_id: {
        type: 'string',
        title: 'Model Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.credentials.create(body);
  },
});

registerApiMethod({
  name: 'list_credentials',
  description: '[BETA] endpoint. This might change unexpectedly.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.credentials.list();
  },
});

registerApiMethod({
  name: 'delete_credentials',
  description: '[BETA] endpoint. This might change unexpectedly.',
  inputSchema: {
    type: 'object',
    properties: {
      credential_name: {
        type: 'string',
        title: 'Credential Name',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { credential_name } = args;
    return client.credentials.delete(credential_name);
  },
});
