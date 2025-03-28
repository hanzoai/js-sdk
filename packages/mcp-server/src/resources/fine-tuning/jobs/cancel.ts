// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_jobs_fine_tuning_cancel',
  description:
    'Cancel a fine-tuning job.\n\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.',
  inputSchema: {
    type: 'object',
    properties: {
      fine_tuning_job_id: {
        type: 'string',
        title: 'Fine Tuning Job Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { fine_tuning_job_id } = args;
    return client.fineTuning.jobs.cancel.create(fine_tuning_job_id);
  },
});
