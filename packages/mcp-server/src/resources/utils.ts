// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'get_supported_openai_params_utils',
  description:
    "Returns supported openai params for a given llm model name\n\ne.g. `gpt-4` vs `gpt-3.5-turbo`\n\nExample curl:\n```\ncurl -X GET --location 'http://localhost:4000/utils/supported_openai_params?model=gpt-3.5-turbo-16k'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.utils.getSupportedOpenAIParams(body);
  },
});

registerApiMethod({
  name: 'token_counter_utils',
  description: 'Token Counter',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
      messages: {
        type: 'array',
        title: 'Messages',
        items: {
          type: 'object',
        },
      },
      prompt: {
        type: 'string',
        title: 'Prompt',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.utils.tokenCounter(body);
  },
});

registerApiMethod({
  name: 'transform_request_utils',
  description: 'Transform Request',
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
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.utils.transformRequest(body);
  },
});
