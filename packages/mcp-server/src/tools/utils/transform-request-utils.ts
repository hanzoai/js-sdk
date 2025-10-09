// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'utils',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/utils/transform_request',
  operationId: 'transform_request_utils_transform_request_post',
};

export const tool: Tool = {
  name: 'transform_request_utils',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nTransform Request\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/util_transform_request_response',\n  $defs: {\n    util_transform_request_response: {\n      type: 'object',\n      title: 'RawRequestTypedDict',\n      properties: {\n        error: {\n          type: 'string',\n          title: 'Error'\n        },\n        raw_request_api_base: {\n          type: 'string',\n          title: 'Raw Request Api Base'\n        },\n        raw_request_body: {\n          type: 'object',\n          title: 'Raw Request Body',\n          additionalProperties: true\n        },\n        raw_request_headers: {\n          type: 'object',\n          title: 'Raw Request Headers',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      call_type: {
        type: 'string',
        title: 'CallTypes',
        enum: [
          'embedding',
          'aembedding',
          'completion',
          'acompletion',
          'atext_completion',
          'text_completion',
          'image_generation',
          'aimage_generation',
          'moderation',
          'amoderation',
          'atranscription',
          'transcription',
          'aspeech',
          'speech',
          'rerank',
          'arerank',
          '_arealtime',
          'create_batch',
          'acreate_batch',
          'aretrieve_batch',
          'retrieve_batch',
          'pass_through_endpoint',
          'anthropic_messages',
          'get_assistants',
          'aget_assistants',
          'create_assistants',
          'acreate_assistants',
          'delete_assistant',
          'adelete_assistant',
          'acreate_thread',
          'create_thread',
          'aget_thread',
          'get_thread',
          'a_add_message',
          'add_message',
          'aget_messages',
          'get_messages',
          'arun_thread',
          'run_thread',
          'arun_thread_stream',
          'run_thread_stream',
          'afile_retrieve',
          'file_retrieve',
          'afile_delete',
          'file_delete',
          'afile_list',
          'file_list',
          'acreate_file',
          'create_file',
          'afile_content',
          'file_content',
          'create_fine_tuning_job',
          'acreate_fine_tuning_job',
          'acancel_fine_tuning_job',
          'cancel_fine_tuning_job',
          'alist_fine_tuning_jobs',
          'list_fine_tuning_jobs',
          'aretrieve_fine_tuning_job',
          'retrieve_fine_tuning_job',
          'responses',
          'aresponses',
        ],
      },
      request_body: {
        type: 'object',
        title: 'Request Body',
        additionalProperties: true,
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['call_type', 'request_body'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.utils.transformRequest(body)));
};

export default { metadata, tool, handler };
