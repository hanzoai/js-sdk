// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { tools, handlers } from './tools';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import './resources/top-level';
import './resources/models';
import './resources/openai/openai';
import './resources/openai/deployments/deployments';
import './resources/openai/deployments/chat';
import './resources/engines/engines';
import './resources/engines/chat';
import './resources/chat/chat';
import './resources/chat/completions';
import './resources/completions';
import './resources/embeddings';
import './resources/images/images';
import './resources/images/generations';
import './resources/audio/audio';
import './resources/audio/speech';
import './resources/audio/transcriptions';
import './resources/assistants';
import './resources/threads/threads';
import './resources/threads/messages';
import './resources/threads/runs';
import './resources/moderations';
import './resources/utils';
import './resources/model/model';
import './resources/model/info';
import './resources/model/update';
import './resources/model-group';
import './resources/routes';
import './resources/responses/responses';
import './resources/responses/input-items';
import './resources/batches/batches';
import './resources/batches/cancel';
import './resources/rerank';
import './resources/fine-tuning/fine-tuning';
import './resources/fine-tuning/jobs/jobs';
import './resources/fine-tuning/jobs/cancel';
import './resources/credentials';
import './resources/vertex-ai';
import './resources/gemini';
import './resources/cohere';
import './resources/anthropic';
import './resources/bedrock';
import './resources/eu-assemblyai';
import './resources/assemblyai';
import './resources/azure';
import './resources/langfuse';
import './resources/config/config';
import './resources/config/pass-through-endpoint';
import './resources/test';
import './resources/health';
import './resources/active';
import './resources/settings';
import './resources/key/key';
import './resources/key/regenerate';
import './resources/user';
import './resources/team/team';
import './resources/team/model';
import './resources/team/callback';
import './resources/organization/organization';
import './resources/organization/info';
import './resources/customer';
import './resources/spend';
import './resources/global/global';
import './resources/global/spend';
import './resources/provider';
import './resources/cache/cache';
import './resources/cache/redis';
import './resources/guardrails';
import './resources/add';
import './resources/delete';
import './resources/files/files';
import './resources/files/content';
import './resources/budget';
import Hanzo from 'hanzoai';
export { tools, handlers } from './tools';

// Instantiate client
const client = new Hanzo();

// Create server instance
export const server = new Server(
  {
    name: 'hanzo_api',
    version: '0.0.1-alpha.3',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

export function initServer() {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools,
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    const handler = handlers[name];
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    const result = await handler(client, args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  });
}

async function main() {
  initServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
  });
}
