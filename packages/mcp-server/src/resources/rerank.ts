// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.rerank.create();
  },
});

registerApiMethod({
  name: 'create_v1_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.rerank.createV1();
  },
});

registerApiMethod({
  name: 'create_v2_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.rerank.createV2();
  },
});
