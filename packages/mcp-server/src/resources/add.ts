// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'add_allowed_ip_add',
  description: 'Add Allowed Ip',
  inputSchema: {
    type: 'object',
    properties: {
      ip: {
        type: 'string',
        title: 'Ip',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.add.addAllowedIP(body);
  },
});
