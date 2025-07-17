// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'fine_tuning.jobs.cancel',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel',
  operationId: 'cancel_fine_tuning_job_v1_fine_tuning_jobs__fine_tuning_job_id__cancel_post',
};

export const tool: Tool = {
  name: 'create_jobs_fine_tuning_cancel',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCancel a fine-tuning job.\n\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      fine_tuning_job_id: {
        type: 'string',
        title: 'Fine Tuning Job Id',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { fine_tuning_job_id, ...body } = args as any;
  return asTextContentResult((await client.fineTuning.jobs.cancel.create(fine_tuning_job_id)) as object);
};

export default { metadata, tool, handler };
