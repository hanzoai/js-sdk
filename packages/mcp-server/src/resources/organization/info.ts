// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'retrieve_organization_info',
  description: 'Get the org specific information',
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.info.retrieve(body);
  },
});

registerApiMethod({
  name: 'deprecated_organization_info',
  description: 'DEPRECATED: Use GET /organization/info instead',
  inputSchema: {
    type: 'object',
    properties: {
      organizations: {
        type: 'array',
        title: 'Organizations',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.organization.info.deprecated(body);
  },
});
