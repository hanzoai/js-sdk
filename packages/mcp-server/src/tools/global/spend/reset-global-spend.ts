// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'global.spend',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/global/spend/reset',
  operationId: 'global_spend_reset_global_spend_reset_post',
};

export const tool: Tool = {
  name: 'reset_global_spend',
  description:
    'ADMIN ONLY / MASTER KEY Only Endpoint\n\nGlobally reset spend for All API Keys and Teams, maintain LLM_SpendLogs\n\n1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there\n2. LLM_VerificationTokens spend will be set = 0\n3. LLM_TeamTable spend will be set = 0',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.global.spend.reset();
};

export default { metadata, tool, handler };
