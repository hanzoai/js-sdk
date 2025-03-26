// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

// Instantiate client
const client = new Hanzo();

// Create server instance
const server = new Server(
  {
    name: 'hanzo_api',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

const tools: Tool[] = [];
const handlers: Record<string, Function> = {};

registerApiMethod({
  name: 'get_home_$client',
  description: 'Home',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.getHome();
  },
});

registerApiMethod({
  name: 'list_models',
  description:
    'Use `/model/info` - to get detailed model information, example - pricing, mode, etc.\n\nThis is just for compatibility with openai projects like aider.',
  inputSchema: {
    type: 'object',
    properties: {
      return_wildcard_routes: {
        type: 'boolean',
        title: 'Return Wildcard Routes',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.models.list(body);
  },
});

registerApiMethod({
  name: 'create_openai',
  description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.openai.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_openai',
  description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.openai.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_openai',
  description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.openai.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_openai',
  description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.openai.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_openai',
  description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.openai.patch(endpoint);
  },
});

registerApiMethod({
  name: 'complete_openai_deployments',
  description:
    'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { model } = args;
    return client.openai.deployments.complete(model);
  },
});

registerApiMethod({
  name: 'embed_openai_deployments',
  description:
    'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { model } = args;
    return client.openai.deployments.embed(model);
  },
});

registerApiMethod({
  name: 'complete_deployments_openai_chat',
  description:
    'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { model } = args;
    return client.openai.deployments.chat.complete(model);
  },
});

registerApiMethod({
  name: 'complete_engines',
  description:
    'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { model } = args;
    return client.engines.complete(model);
  },
});

registerApiMethod({
  name: 'embed_engines',
  description:
    'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { model } = args;
    return client.engines.embed(model);
  },
});

registerApiMethod({
  name: 'complete_engines_chat',
  description:
    'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { model } = args;
    return client.engines.chat.complete(model);
  },
});

registerApiMethod({
  name: 'create_chat_completions',
  description:
    'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.chat.completions.create(body);
  },
});

registerApiMethod({
  name: 'create_completions',
  description:
    'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.completions.create(body);
  },
});

registerApiMethod({
  name: 'create_embeddings',
  description:
    'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.embeddings.create(body);
  },
});

registerApiMethod({
  name: 'create_images_generations',
  description: 'Image Generation',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.images.generations.create();
  },
});

registerApiMethod({
  name: 'create_audio_speech',
  description: 'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createSpeech',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.audio.speech.create();
  },
});

registerApiMethod({
  name: 'create_audio_transcriptions',
  description:
    'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createTranscription?lang=curl',
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        title: 'File',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.audio.transcriptions.create(body);
  },
});

registerApiMethod({
  name: 'create_assistants',
  description:
    'Create assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.assistants.create();
  },
});

registerApiMethod({
  name: 'list_assistants',
  description:
    'Returns a list of assistants.\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.assistants.list();
  },
});

registerApiMethod({
  name: 'delete_assistants',
  description:
    'Delete assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
  inputSchema: {
    type: 'object',
    properties: {
      assistant_id: {
        type: 'string',
        title: 'Assistant Id',
      },
    },
  },
  handler: (args: any) => {
    const { assistant_id } = args;
    return client.assistants.delete(assistant_id);
  },
});

registerApiMethod({
  name: 'create_threads',
  description:
    'Create a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/createThread',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.threads.create();
  },
});

registerApiMethod({
  name: 'retrieve_threads',
  description:
    'Retrieves a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/getThread',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'string',
        title: 'Thread Id',
      },
    },
  },
  handler: (args: any) => {
    const { thread_id } = args;
    return client.threads.retrieve(thread_id);
  },
});

registerApiMethod({
  name: 'create_threads_messages',
  description:
    'Create a message.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/createMessage',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'string',
        title: 'Thread Id',
      },
    },
  },
  handler: (args: any) => {
    const { thread_id } = args;
    return client.threads.messages.create(thread_id);
  },
});

registerApiMethod({
  name: 'list_threads_messages',
  description:
    'Returns a list of messages for a given thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/listMessages',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'string',
        title: 'Thread Id',
      },
    },
  },
  handler: (args: any) => {
    const { thread_id } = args;
    return client.threads.messages.list(thread_id);
  },
});

registerApiMethod({
  name: 'create_threads_runs',
  description:
    'Create a run.\n\nAPI Reference: https://platform.openai.com/docs/api-reference/runs/createRun',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'string',
        title: 'Thread Id',
      },
    },
  },
  handler: (args: any) => {
    const { thread_id } = args;
    return client.threads.runs.create(thread_id);
  },
});

registerApiMethod({
  name: 'create_moderations',
  description:
    'The moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.\n\nQuick Start\n```\ncurl --location \'http://0.0.0.0:4000/moderations\'     --header \'Content-Type: application/json\'     --header \'Authorization: Bearer sk-1234\'     --data \'{"input": "Sample text goes here", "model": "text-moderation-stable"}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.moderations.create();
  },
});

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
  handler: (args: any) => {
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
  handler: (args: any) => {
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
  handler: (args: any) => {
    const { ...body } = args;
    return client.utils.transformRequest(body);
  },
});

registerApiMethod({
  name: 'create_model',
  description: 'Allows adding new models to the model list in the config.yaml',
  inputSchema: {
    type: 'object',
    properties: {
      llm_params: {
        type: 'object',
        title: 'LLM_Params',
        description: "LLM Params with 'model' requirement - used for completions",
        properties: {
          model: {
            type: 'string',
            title: 'Model',
          },
          api_base: {
            type: 'string',
            title: 'Api Base',
          },
          api_key: {
            type: 'string',
            title: 'Api Key',
          },
          api_version: {
            type: 'string',
            title: 'Api Version',
          },
          aws_access_key_id: {
            type: 'string',
            title: 'Aws Access Key Id',
          },
          aws_region_name: {
            type: 'string',
            title: 'Aws Region Name',
          },
          aws_secret_access_key: {
            type: 'string',
            title: 'Aws Secret Access Key',
          },
          budget_duration: {
            type: 'string',
            title: 'Budget Duration',
          },
          configurable_clientside_auth_params: {
            type: 'array',
            title: 'Configurable Clientside Auth Params',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'object',
                  title: 'ConfigurableClientsideParamsCustomAuth',
                  properties: {
                    api_base: {
                      type: 'string',
                      title: 'Api Base',
                    },
                  },
                  required: ['api_base'],
                },
              ],
            },
          },
          custom_llm_provider: {
            type: 'string',
            title: 'Custom Llm Provider',
          },
          input_cost_per_second: {
            type: 'number',
            title: 'Input Cost Per Second',
          },
          input_cost_per_token: {
            type: 'number',
            title: 'Input Cost Per Token',
          },
          llm_trace_id: {
            type: 'string',
            title: 'Llm Trace Id',
          },
          max_budget: {
            type: 'number',
            title: 'Max Budget',
          },
          max_file_size_mb: {
            type: 'number',
            title: 'Max File Size Mb',
          },
          max_retries: {
            type: 'integer',
            title: 'Max Retries',
          },
          merge_reasoning_content_in_choices: {
            type: 'boolean',
            title: 'Merge Reasoning Content In Choices',
          },
          model_info: {
            type: 'object',
            title: 'Model Info',
          },
          organization: {
            type: 'string',
            title: 'Organization',
          },
          output_cost_per_second: {
            type: 'number',
            title: 'Output Cost Per Second',
          },
          output_cost_per_token: {
            type: 'number',
            title: 'Output Cost Per Token',
          },
          region_name: {
            type: 'string',
            title: 'Region Name',
          },
          rpm: {
            type: 'integer',
            title: 'Rpm',
          },
          stream_timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Stream Timeout',
          },
          timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Timeout',
          },
          tpm: {
            type: 'integer',
            title: 'Tpm',
          },
          use_in_pass_through: {
            type: 'boolean',
            title: 'Use In Pass Through',
          },
          vertex_credentials: {
            anyOf: [
              {
                type: 'object',
              },
              {
                type: 'string',
              },
            ],
            title: 'Vertex Credentials',
          },
          vertex_location: {
            type: 'string',
            title: 'Vertex Location',
          },
          vertex_project: {
            type: 'string',
            title: 'Vertex Project',
          },
          watsonx_region_name: {
            type: 'string',
            title: 'Watsonx Region Name',
          },
        },
        required: ['model'],
      },
      model_info: {
        type: 'object',
        title: 'ModelInfo',
        properties: {
          id: {
            type: 'string',
            title: 'Id',
          },
          base_model: {
            type: 'string',
            title: 'Base Model',
          },
          created_at: {
            type: 'string',
            title: 'Created At',
            format: 'date-time',
          },
          created_by: {
            type: 'string',
            title: 'Created By',
          },
          db_model: {
            type: 'boolean',
            title: 'Db Model',
          },
          team_id: {
            type: 'string',
            title: 'Team Id',
          },
          team_public_model_name: {
            type: 'string',
            title: 'Team Public Model Name',
          },
          tier: {
            type: 'string',
            title: 'Tier',
            enum: ['free', 'paid'],
          },
          updated_at: {
            type: 'string',
            title: 'Updated At',
            format: 'date-time',
          },
          updated_by: {
            type: 'string',
            title: 'Updated By',
          },
        },
        required: ['id'],
      },
      model_name: {
        type: 'string',
        title: 'Model Name',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.model.create(body);
  },
});

registerApiMethod({
  name: 'delete_model',
  description: 'Allows deleting models in the model list in the config.yaml',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.model.delete(body);
  },
});

registerApiMethod({
  name: 'list_model_info',
  description:
    'Provides more info about each model in /models, including config.yaml descriptions (except api key and api base)\n\nParameters:\n    llm_model_id: Optional[str] = None (this is the value of `x-llm-model-id` returned in response headers)\n\n    - When llm_model_id is passed, it will return the info for that specific model\n    - When llm_model_id is not passed, it will return the info for all models\n\nReturns:\n    Returns a dictionary containing information about each model.\n\nExample Response:\n```json\n{\n    "data": [\n                {\n                    "model_name": "fake-openai-endpoint",\n                    "llm_params": {\n                        "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",\n                        "model": "openai/fake"\n                    },\n                    "model_info": {\n                        "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",\n                        "db_model": false\n                    }\n                }\n            ]\n}\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      llm_model_id: {
        type: 'string',
        title: 'Llm Model Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.model.info.list(body);
  },
});

registerApiMethod({
  name: 'full_model_update',
  description: 'Edit existing model params',
  inputSchema: {
    type: 'object',
    properties: {
      llm_params: {
        type: 'object',
        title: 'updateLLMParams',
        properties: {
          api_base: {
            type: 'string',
            title: 'Api Base',
          },
          api_key: {
            type: 'string',
            title: 'Api Key',
          },
          api_version: {
            type: 'string',
            title: 'Api Version',
          },
          aws_access_key_id: {
            type: 'string',
            title: 'Aws Access Key Id',
          },
          aws_region_name: {
            type: 'string',
            title: 'Aws Region Name',
          },
          aws_secret_access_key: {
            type: 'string',
            title: 'Aws Secret Access Key',
          },
          budget_duration: {
            type: 'string',
            title: 'Budget Duration',
          },
          configurable_clientside_auth_params: {
            type: 'array',
            title: 'Configurable Clientside Auth Params',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'object',
                  title: 'ConfigurableClientsideParamsCustomAuth',
                  properties: {
                    api_base: {
                      type: 'string',
                      title: 'Api Base',
                    },
                  },
                  required: ['api_base'],
                },
              ],
            },
          },
          custom_llm_provider: {
            type: 'string',
            title: 'Custom Llm Provider',
          },
          input_cost_per_second: {
            type: 'number',
            title: 'Input Cost Per Second',
          },
          input_cost_per_token: {
            type: 'number',
            title: 'Input Cost Per Token',
          },
          llm_trace_id: {
            type: 'string',
            title: 'Llm Trace Id',
          },
          max_budget: {
            type: 'number',
            title: 'Max Budget',
          },
          max_file_size_mb: {
            type: 'number',
            title: 'Max File Size Mb',
          },
          max_retries: {
            type: 'integer',
            title: 'Max Retries',
          },
          merge_reasoning_content_in_choices: {
            type: 'boolean',
            title: 'Merge Reasoning Content In Choices',
          },
          model: {
            type: 'string',
            title: 'Model',
          },
          model_info: {
            type: 'object',
            title: 'Model Info',
          },
          organization: {
            type: 'string',
            title: 'Organization',
          },
          output_cost_per_second: {
            type: 'number',
            title: 'Output Cost Per Second',
          },
          output_cost_per_token: {
            type: 'number',
            title: 'Output Cost Per Token',
          },
          region_name: {
            type: 'string',
            title: 'Region Name',
          },
          rpm: {
            type: 'integer',
            title: 'Rpm',
          },
          stream_timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Stream Timeout',
          },
          timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Timeout',
          },
          tpm: {
            type: 'integer',
            title: 'Tpm',
          },
          use_in_pass_through: {
            type: 'boolean',
            title: 'Use In Pass Through',
          },
          vertex_credentials: {
            anyOf: [
              {
                type: 'object',
              },
              {
                type: 'string',
              },
            ],
            title: 'Vertex Credentials',
          },
          vertex_location: {
            type: 'string',
            title: 'Vertex Location',
          },
          vertex_project: {
            type: 'string',
            title: 'Vertex Project',
          },
          watsonx_region_name: {
            type: 'string',
            title: 'Watsonx Region Name',
          },
        },
        required: [],
      },
      model_info: {
        type: 'object',
        title: 'ModelInfo',
        properties: {
          id: {
            type: 'string',
            title: 'Id',
          },
          base_model: {
            type: 'string',
            title: 'Base Model',
          },
          created_at: {
            type: 'string',
            title: 'Created At',
            format: 'date-time',
          },
          created_by: {
            type: 'string',
            title: 'Created By',
          },
          db_model: {
            type: 'boolean',
            title: 'Db Model',
          },
          team_id: {
            type: 'string',
            title: 'Team Id',
          },
          team_public_model_name: {
            type: 'string',
            title: 'Team Public Model Name',
          },
          tier: {
            type: 'string',
            title: 'Tier',
            enum: ['free', 'paid'],
          },
          updated_at: {
            type: 'string',
            title: 'Updated At',
            format: 'date-time',
          },
          updated_by: {
            type: 'string',
            title: 'Updated By',
          },
        },
        required: ['id'],
      },
      model_name: {
        type: 'string',
        title: 'Model Name',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.model.update.full(body);
  },
});

registerApiMethod({
  name: 'partial_model_update',
  description:
    'PATCH Endpoint for partial model updates.\n\nOnly updates the fields specified in the request while preserving other existing values.\nFollows proper PATCH semantics by only modifying provided fields.\n\nArgs:\n    model_id: The ID of the model to update\n    patch_data: The fields to update and their new values\n    user_api_key_dict: User authentication information\n\nReturns:\n    Updated model information\n\nRaises:\n    ProxyException: For various error conditions including authentication and database errors',
  inputSchema: {
    type: 'object',
    properties: {
      model_id: {
        type: 'string',
        title: 'Model Id',
      },
      llm_params: {
        type: 'object',
        title: 'updateLLMParams',
        properties: {
          api_base: {
            type: 'string',
            title: 'Api Base',
          },
          api_key: {
            type: 'string',
            title: 'Api Key',
          },
          api_version: {
            type: 'string',
            title: 'Api Version',
          },
          aws_access_key_id: {
            type: 'string',
            title: 'Aws Access Key Id',
          },
          aws_region_name: {
            type: 'string',
            title: 'Aws Region Name',
          },
          aws_secret_access_key: {
            type: 'string',
            title: 'Aws Secret Access Key',
          },
          budget_duration: {
            type: 'string',
            title: 'Budget Duration',
          },
          configurable_clientside_auth_params: {
            type: 'array',
            title: 'Configurable Clientside Auth Params',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'object',
                  title: 'ConfigurableClientsideParamsCustomAuth',
                  properties: {
                    api_base: {
                      type: 'string',
                      title: 'Api Base',
                    },
                  },
                  required: ['api_base'],
                },
              ],
            },
          },
          custom_llm_provider: {
            type: 'string',
            title: 'Custom Llm Provider',
          },
          input_cost_per_second: {
            type: 'number',
            title: 'Input Cost Per Second',
          },
          input_cost_per_token: {
            type: 'number',
            title: 'Input Cost Per Token',
          },
          llm_trace_id: {
            type: 'string',
            title: 'Llm Trace Id',
          },
          max_budget: {
            type: 'number',
            title: 'Max Budget',
          },
          max_file_size_mb: {
            type: 'number',
            title: 'Max File Size Mb',
          },
          max_retries: {
            type: 'integer',
            title: 'Max Retries',
          },
          merge_reasoning_content_in_choices: {
            type: 'boolean',
            title: 'Merge Reasoning Content In Choices',
          },
          model: {
            type: 'string',
            title: 'Model',
          },
          model_info: {
            type: 'object',
            title: 'Model Info',
          },
          organization: {
            type: 'string',
            title: 'Organization',
          },
          output_cost_per_second: {
            type: 'number',
            title: 'Output Cost Per Second',
          },
          output_cost_per_token: {
            type: 'number',
            title: 'Output Cost Per Token',
          },
          region_name: {
            type: 'string',
            title: 'Region Name',
          },
          rpm: {
            type: 'integer',
            title: 'Rpm',
          },
          stream_timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Stream Timeout',
          },
          timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Timeout',
          },
          tpm: {
            type: 'integer',
            title: 'Tpm',
          },
          use_in_pass_through: {
            type: 'boolean',
            title: 'Use In Pass Through',
          },
          vertex_credentials: {
            anyOf: [
              {
                type: 'object',
              },
              {
                type: 'string',
              },
            ],
            title: 'Vertex Credentials',
          },
          vertex_location: {
            type: 'string',
            title: 'Vertex Location',
          },
          vertex_project: {
            type: 'string',
            title: 'Vertex Project',
          },
          watsonx_region_name: {
            type: 'string',
            title: 'Watsonx Region Name',
          },
        },
        required: [],
      },
      model_info: {
        type: 'object',
        title: 'ModelInfo',
        properties: {
          id: {
            type: 'string',
            title: 'Id',
          },
          base_model: {
            type: 'string',
            title: 'Base Model',
          },
          created_at: {
            type: 'string',
            title: 'Created At',
            format: 'date-time',
          },
          created_by: {
            type: 'string',
            title: 'Created By',
          },
          db_model: {
            type: 'boolean',
            title: 'Db Model',
          },
          team_id: {
            type: 'string',
            title: 'Team Id',
          },
          team_public_model_name: {
            type: 'string',
            title: 'Team Public Model Name',
          },
          tier: {
            type: 'string',
            title: 'Tier',
            enum: ['free', 'paid'],
          },
          updated_at: {
            type: 'string',
            title: 'Updated At',
            format: 'date-time',
          },
          updated_by: {
            type: 'string',
            title: 'Updated By',
          },
        },
        required: ['id'],
      },
      model_name: {
        type: 'string',
        title: 'Model Name',
      },
    },
  },
  handler: (args: any) => {
    const { model_id, ...body } = args;
    return client.model.update.partial(model_id, body);
  },
});

registerApiMethod({
  name: 'retrieve_info_model_group',
  description:
    'Get information about all the deployments on llm proxy, including config.yaml descriptions (except api key and api base)\n\n- /model_group/info returns all model groups. End users of proxy should use /model_group/info since those models will be used for /chat/completions, /embeddings, etc.\n- /model_group/info?model_group=rerank-english-v3.0 returns all model groups for a specific model group (`model_name` in config.yaml)\n\n\n\nExample Request (All Models):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info\'     -H \'accept: application/json\'     -H \'x-api-key: sk-1234\'\n```\n\nExample Request (Specific Model Group):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=rerank-english-v3.0\'     -H \'accept: application/json\'     -H \'Authorization: Bearer sk-1234\'\n```\n\nExample Request (Specific Wildcard Model Group): (e.g. `model_name: openai/*` on config.yaml)\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=openai/tts-1\'\n-H \'accept: application/json\'     -H \'Authorization: Bearersk-1234\'\n```\n\nLearn how to use and set wildcard models [here](https://docs.llm.ai/docs/wildcard_routing)\n\nExample Response:\n```json\n    {\n        "data": [\n            {\n            "model_group": "rerank-english-v3.0",\n            "providers": [\n                "cohere"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "stream",\n                "temperature",\n                "max_tokens",\n                "logit_bias",\n                "top_p",\n                "frequency_penalty",\n                "presence_penalty",\n                "stop",\n                "n",\n                "extra_headers"\n            ]\n            },\n            {\n            "model_group": "gpt-3.5-turbo",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": 16385.0,\n            "max_output_tokens": 4096.0,\n            "input_cost_per_token": 1.5e-06,\n            "output_cost_per_token": 2e-06,\n            "mode": "chat",\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": true,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            },\n            {\n            "model_group": "llava-hf",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": true,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            }\n        ]\n        }\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model_group: {
        type: 'string',
        title: 'Model Group',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.modelGroup.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'list_routes',
  description: 'Get a list of available routes in the FastAPI application.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.routes.list();
  },
});

registerApiMethod({
  name: 'create_responses',
  description:
    'Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses\n\n```bash\ncurl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d \'{\n    "model": "gpt-4o",\n    "input": "Tell me about AI"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.responses.create();
  },
});

registerApiMethod({
  name: 'retrieve_responses',
  description:
    'Get a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/get\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
      },
    },
  },
  handler: (args: any) => {
    const { response_id } = args;
    return client.responses.retrieve(response_id);
  },
});

registerApiMethod({
  name: 'delete_responses',
  description:
    'Delete a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/delete\n\n```bash\ncurl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
      },
    },
  },
  handler: (args: any) => {
    const { response_id } = args;
    return client.responses.delete(response_id);
  },
});

registerApiMethod({
  name: 'list_responses_input_items',
  description:
    'Get input items for a response.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/input-items\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123/input_items     -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
      },
    },
  },
  handler: (args: any) => {
    const { response_id } = args;
    return client.responses.inputItems.list(response_id);
  },
});

registerApiMethod({
  name: 'create_batches',
  description:
    'Create large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.batches.create(body);
  },
});

registerApiMethod({
  name: 'retrieve_batches',
  description:
    'Retrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      batch_id: {
        type: 'string',
        title: 'Batch ID to retrieve',
        description: 'The ID of the batch to retrieve',
      },
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
  handler: (args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.retrieve(batch_id, body);
  },
});

registerApiMethod({
  name: 'list_batches',
  description:
    'Lists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        title: 'After',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
      },
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.batches.list(body);
  },
});

registerApiMethod({
  name: 'cancel_with_provider_batches',
  description:
    'Cancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      batch_id: {
        type: 'string',
        title: 'Batch Id',
      },
    },
  },
  handler: (args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.cancelWithProvider(batch_id, body);
  },
});

registerApiMethod({
  name: 'create_with_provider_batches',
  description:
    'Create large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
  handler: (args: any) => {
    const { provider } = args;
    return client.batches.createWithProvider(provider);
  },
});

registerApiMethod({
  name: 'list_with_provider_batches',
  description:
    'Lists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      after: {
        type: 'string',
        title: 'After',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
      },
    },
  },
  handler: (args: any) => {
    const { provider, ...body } = args;
    return client.batches.listWithProvider(provider, body);
  },
});

registerApiMethod({
  name: 'retrieve_with_provider_batches',
  description:
    'Retrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      batch_id: {
        type: 'string',
        title: 'Batch ID to retrieve',
        description: 'The ID of the batch to retrieve',
      },
    },
  },
  handler: (args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.retrieveWithProvider(batch_id, body);
  },
});

registerApiMethod({
  name: 'cancel_batches_cancel',
  description:
    'Cancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      batch_id: {
        type: 'string',
        title: 'Batch Id',
      },
      provider: {
        type: 'string',
        title: 'Provider',
      },
    },
  },
  handler: (args: any) => {
    const { batch_id, ...body } = args;
    return client.batches.cancel.cancel(batch_id, body);
  },
});

registerApiMethod({
  name: 'create_rerank',
  description: 'Rerank',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
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
  handler: (args: any) => {
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
  handler: (args: any) => {
    const {} = args;
    return client.rerank.createV2();
  },
});

registerApiMethod({
  name: 'create_fine_tuning_jobs',
  description:
    'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/fine-tuning/create\n\nExample Curl:\n```\ncurl http://localhost:4000/v1/fine_tuning/jobs       -H "Content-Type: application/json"       -H "Authorization: Bearer sk-1234"       -d \'{\n    "model": "gpt-3.5-turbo",\n    "training_file": "file-abc123",\n    "hyperparameters": {\n      "n_epochs": 4\n    }\n  }\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
        enum: ['openai', 'azure', 'vertex_ai'],
      },
      model: {
        type: 'string',
        title: 'Model',
      },
      training_file: {
        type: 'string',
        title: 'Training File',
      },
      hyperparameters: {
        type: 'object',
        title: 'Hyperparameters',
        properties: {
          batch_size: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
            title: 'Batch Size',
          },
          learning_rate_multiplier: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'number',
              },
            ],
            title: 'Learning Rate Multiplier',
          },
          n_epochs: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
            title: 'N Epochs',
          },
        },
        required: [],
      },
      integrations: {
        type: 'array',
        title: 'Integrations',
        items: {
          type: 'string',
        },
      },
      seed: {
        type: 'integer',
        title: 'Seed',
      },
      suffix: {
        type: 'string',
        title: 'Suffix',
      },
      validation_file: {
        type: 'string',
        title: 'Validation File',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.fineTuning.jobs.create(body);
  },
});

registerApiMethod({
  name: 'retrieve_fine_tuning_jobs',
  description:
    'Retrieves a fine-tuning job.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to retrieve.',
  inputSchema: {
    type: 'object',
    properties: {
      fine_tuning_job_id: {
        type: 'string',
        title: 'Fine Tuning Job Id',
      },
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
        enum: ['openai', 'azure'],
      },
    },
  },
  handler: (args: any) => {
    const { fine_tuning_job_id, ...body } = args;
    return client.fineTuning.jobs.retrieve(fine_tuning_job_id, body);
  },
});

registerApiMethod({
  name: 'list_fine_tuning_jobs',
  description:
    'Lists fine-tuning jobs for the organization.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `after`: Identifier for the last job from the previous pagination request.\n- `limit`: Number of fine-tuning jobs to retrieve (default is 20).',
  inputSchema: {
    type: 'object',
    properties: {
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
        enum: ['openai', 'azure'],
      },
      after: {
        type: 'string',
        title: 'After',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.fineTuning.jobs.list(body);
  },
});

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
  handler: (args: any) => {
    const { fine_tuning_job_id } = args;
    return client.fineTuning.jobs.cancel.create(fine_tuning_job_id);
  },
});

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
  handler: (args: any) => {
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
  handler: (args: any) => {
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
  handler: (args: any) => {
    const { credential_name } = args;
    return client.credentials.delete(credential_name);
  },
});

registerApiMethod({
  name: 'create_vertex_ai',
  description: 'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.vertexAI.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_vertex_ai',
  description: 'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.vertexAI.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_vertex_ai',
  description: 'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.vertexAI.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_vertex_ai',
  description: 'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.vertexAI.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_vertex_ai',
  description: 'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/vertex_ai)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.vertexAI.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_gemini',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.gemini.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_gemini',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.gemini.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_gemini',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.gemini.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_gemini',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.gemini.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_gemini',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/google_ai_studio)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.gemini.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_cohere',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/cohere)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.cohere.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_cohere',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/cohere)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.cohere.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_cohere',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/cohere)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.cohere.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_cohere',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/cohere)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.cohere.delete(endpoint);
  },
});

registerApiMethod({
  name: 'modify_cohere',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/cohere)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.cohere.modify(endpoint);
  },
});

registerApiMethod({
  name: 'create_anthropic',
  description: '[Docs](https://docs.llm.ai/docs/anthropic_completion)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.anthropic.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_anthropic',
  description: '[Docs](https://docs.llm.ai/docs/anthropic_completion)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.anthropic.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_anthropic',
  description: '[Docs](https://docs.llm.ai/docs/anthropic_completion)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.anthropic.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_anthropic',
  description: '[Docs](https://docs.llm.ai/docs/anthropic_completion)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.anthropic.delete(endpoint);
  },
});

registerApiMethod({
  name: 'modify_anthropic',
  description: '[Docs](https://docs.llm.ai/docs/anthropic_completion)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.anthropic.modify(endpoint);
  },
});

registerApiMethod({
  name: 'create_bedrock',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/bedrock)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.bedrock.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_bedrock',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/bedrock)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.bedrock.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_bedrock',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/bedrock)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.bedrock.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_bedrock',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/bedrock)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.bedrock.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_bedrock',
  description: '[Docs](https://docs.llm.ai/docs/pass_through/bedrock)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.bedrock.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_eu_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.euAssemblyai.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_eu_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.euAssemblyai.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_eu_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.euAssemblyai.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_eu_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.euAssemblyai.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_eu_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.euAssemblyai.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.assemblyai.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.assemblyai.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.assemblyai.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.assemblyai.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.assemblyai.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.azure.create(endpoint);
  },
});

registerApiMethod({
  name: 'update_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.azure.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.azure.delete(endpoint);
  },
});

registerApiMethod({
  name: 'call_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.azure.call(endpoint);
  },
});

registerApiMethod({
  name: 'patch_azure',
  description:
    'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.azure.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/langfuse)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.langfuse.create(endpoint);
  },
});

registerApiMethod({
  name: 'retrieve_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/langfuse)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.langfuse.retrieve(endpoint);
  },
});

registerApiMethod({
  name: 'update_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/langfuse)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.langfuse.update(endpoint);
  },
});

registerApiMethod({
  name: 'delete_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/langfuse)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.langfuse.delete(endpoint);
  },
});

registerApiMethod({
  name: 'patch_langfuse',
  description:
    'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.llm.ai/docs/pass_through/langfuse)',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint } = args;
    return client.langfuse.patch(endpoint);
  },
});

registerApiMethod({
  name: 'create_config_pass_through_endpoint',
  description: 'Create new pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      headers: {
        type: 'object',
        title: 'Headers',
        description:
          'Key-value pairs of headers to be forwarded with the request. You can set any key value pair here and it will be forwarded to your target endpoint',
      },
      path: {
        type: 'string',
        title: 'Path',
        description: 'The route to be added to the LLM Proxy Server.',
      },
      target: {
        type: 'string',
        title: 'Target',
        description: 'The URL to which requests for this path should be forwarded.',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.config.passThroughEndpoint.create(body);
  },
});

registerApiMethod({
  name: 'update_config_pass_through_endpoint',
  description: 'Update a pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
  handler: (args: any) => {
    const { endpoint_id } = args;
    return client.config.passThroughEndpoint.update(endpoint_id);
  },
});

registerApiMethod({
  name: 'list_config_pass_through_endpoint',
  description:
    'GET configured pass through endpoint.\n\nIf no endpoint_id given, return all configured endpoints.',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.config.passThroughEndpoint.list(body);
  },
});

registerApiMethod({
  name: 'delete_config_pass_through_endpoint',
  description: 'Delete a pass-through endpoint\n\nReturns - the deleted endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.config.passThroughEndpoint.delete(body);
  },
});

registerApiMethod({
  name: 'ping_test',
  description:
    "[DEPRECATED] use `/health/liveliness` instead.\n\nA test endpoint that pings the proxy server to check if it's healthy.\n\nParameters:\n    request (Request): The incoming request.\n\nReturns:\n    dict: A dictionary containing the route of the request URL.",
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.test.ping();
  },
});

registerApiMethod({
  name: 'check_all_health',
  description:
    '🚨 USE `/health/liveliness` to health check the proxy 🚨\n\nSee more 👉 https://docs.llm.ai/docs/proxy/health\n\n\nCheck the health of all the endpoints in config.yaml\n\nTo run health checks in the background, add this to config.yaml:\n```\ngeneral_settings:\n    # ... other settings\n    background_health_checks: True\n```\nelse, the health checks will be run on models when /health is called.',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
        description: 'Specify the model name (optional)',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.health.checkAll(body);
  },
});

registerApiMethod({
  name: 'check_liveliness_health',
  description: 'Unprotected endpoint for checking if worker is alive',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.health.checkLiveliness();
  },
});

registerApiMethod({
  name: 'check_liveness_health',
  description: 'Unprotected endpoint for checking if worker is alive',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.health.checkLiveness();
  },
});

registerApiMethod({
  name: 'check_readiness_health',
  description: 'Unprotected endpoint for checking if worker can receive requests',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.health.checkReadiness();
  },
});

registerApiMethod({
  name: 'check_services_health',
  description:
    "Use this admin-only endpoint to check if the service is healthy.\n\nExample:\n```\ncurl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      service: {
        anyOf: [
          {
            type: 'string',
            description: 'Specify the service being hit.',
            enum: [
              'slack_budget_alerts',
              'langfuse',
              'slack',
              'openmeter',
              'webhook',
              'email',
              'braintrust',
              'datadog',
            ],
          },
          {
            type: 'string',
          },
        ],
        title: 'Service',
        description: 'Specify the service being hit.',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.health.checkServices(body);
  },
});

registerApiMethod({
  name: 'list_callbacks_active',
  description:
    'Returns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.active.listCallbacks();
  },
});

registerApiMethod({
  name: 'retrieve_settings',
  description:
    'Returns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.settings.retrieve();
  },
});

registerApiMethod({
  name: 'update_key',
  description:
    'Update an existing API key\'s parameters.\n\nParameters:\n- key: str - The key to update\n- key_alias: Optional[str] - User-friendly key alias\n- user_id: Optional[str] - User ID associated with key\n- team_id: Optional[str] - Team ID associated with key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call\n- tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.llm.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n- spend: Optional[float] - Amount spent by key\n- max_budget: Optional[float] - Max budget for key\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- soft_budget: Optional[float] - [TODO] Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n- max_parallel_requests: Optional[int] - Rate limit for parallel requests\n- metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n- tpm_limit: Optional[int] - Tokens per minute limit\n- rpm_limit: Optional[int] - Requests per minute limit\n- model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n- model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n- allowed_cache_controls: Optional[list] - List of allowed cache control values\n- duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n- permissions: Optional[dict] - Key-specific permissions\n- send_invite_email: Optional[bool] - Send invite email to user_id\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- blocked: Optional[bool] - Whether the key is blocked\n- aliases: Optional[dict] - Model aliases for the key - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] Key-specific config.\n- temp_budget_increase: Optional[float] - Temporary budget increase for the key (Enterprise only).\n- temp_budget_expiry: Optional[str] - Expiry time for the temporary budget increase (Enterprise only).\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "key": "sk-1234",\n    "key_alias": "my-key",\n    "user_id": "user-1234",\n    "team_id": "team-1234",\n    "max_budget": 100,\n    "metadata": {"any_key": "any-val"},\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      aliases: {
        type: 'object',
        title: 'Aliases',
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      config: {
        type: 'object',
        title: 'Config',
      },
      duration: {
        type: 'string',
        title: 'Duration',
      },
      enforced_params: {
        type: 'array',
        title: 'Enforced Params',
        items: {
          type: 'string',
        },
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      temp_budget_expiry: {
        type: 'string',
        title: 'Temp Budget Expiry',
        format: 'date-time',
      },
      temp_budget_increase: {
        type: 'number',
        title: 'Temp Budget Increase',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.update(body);
  },
});

registerApiMethod({
  name: 'list_key',
  description:
    'List all keys for a given user / team / organization.\n\nReturns:\n    {\n        "keys": List[str] or List[UserAPIKeyAuth],\n        "total_count": int,\n        "current_page": int,\n        "total_pages": int,\n    }',
  inputSchema: {
    type: 'object',
    properties: {
      include_team_keys: {
        type: 'boolean',
        title: 'Include Team Keys',
        description: 'Include all keys for teams that user is an admin of.',
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
        description: 'Filter keys by key alias',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description: 'Filter keys by organization ID',
      },
      page: {
        type: 'integer',
        title: 'Page',
        description: 'Page number',
      },
      return_full_object: {
        type: 'boolean',
        title: 'Return Full Object',
        description: 'Return full key object',
      },
      size: {
        type: 'integer',
        title: 'Size',
        description: 'Page size',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: 'Filter keys by team ID',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'Filter keys by user ID',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.list(body);
  },
});

registerApiMethod({
  name: 'delete_key',
  description:
    'Delete a key from the key management system.\n\nParameters::\n- keys (List[str]): A list of keys or hashed keys to delete. Example {"keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n- key_aliases (List[str]): A list of key aliases to delete. Can be passed instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}\n\nReturns:\n- deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]\n}\'\n```\n\nRaises:\n    HTTPException: If an error occurs during key deletion.',
  inputSchema: {
    type: 'object',
    properties: {
      key_aliases: {
        type: 'array',
        title: 'Key Aliases',
        items: {
          type: 'string',
        },
      },
      keys: {
        type: 'array',
        title: 'Keys',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.delete(body);
  },
});

registerApiMethod({
  name: 'block_key',
  description:
    "Block an Virtual key from making any requests.\n\nParameters:\n- key: str - The key to block. Can be either the unhashed key (sk-...) or the hashed key value\n\n Example:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can block keys.",
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.block(body);
  },
});

registerApiMethod({
  name: 'check_health_key',
  description:
    'Check the health of the key\n\nChecks:\n- If key based logging is configured correctly - sends a test log\n\nUsage \n\nPass the key in the request header\n\n```bash\ncurl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"\n```\n\nResponse when logging callbacks are setup correctly:\n\n```json\n{\n  "key": "healthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "healthy",\n    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to [\'gcs_bucket\']"\n  }\n}\n```\n\n\nResponse when logging callbacks are not setup correctly:\n```json\n{\n  "key": "unhealthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "unhealthy",\n    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."\n  }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.key.checkHealth();
  },
});

registerApiMethod({
  name: 'generate_key',
  description:
    'Generate an API key based on the provided data.\n\nDocs: https://docs.llm.ai/docs/proxy/virtual_keys\n\nParameters:\n- duration: Optional[str] - Specify the length of time the token is valid for. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- key_alias: Optional[str] - User defined key alias\n- key: Optional[str] - User defined key value. If not set, a 16-digit unique sk-key is created for you.\n- team_id: Optional[str] - The team id of the key\n- user_id: Optional[str] - The user id of the key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n- aliases: Optional[dict] - Any alias mappings, on top of anything in the config.yaml model list. - https://docs.llm.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models\n- config: Optional[dict] - any key-specific configs, overrides config in config.yaml\n- spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by proxy whenever key is used. https://docs.llm.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend\n- send_invite_email: Optional[bool] - Whether to send an invite email to the user_id, with the generate key\n- max_budget: Optional[float] - Specify max budget for a given key.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- metadata: Optional[dict] - Metadata for key, store information for key. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- permissions: Optional[dict] - key-specific permissions. Currently just used for turning off pii masking (if connected). Example - {"pii": false}\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then no model specific budget.\n- model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific rpm limit.\n- model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific tpm limit.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.llm.ai/docs/proxy/caching#turn-on--off-caching-per-request\n- blocked: Optional[bool] - Whether the key is blocked.\n- rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per minute)\n- tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per minute)\n- soft_budget: Optional[float] - Specify soft budget for a given key. Will trigger a slack alert when this soft budget is reached.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.llm.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n\nExamples:\n\n1. Allow users to turn on/off pii masking\n\n```bash\ncurl --location \'http://0.0.0.0:4000/key/generate\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "permissions": {"allow_pii_controls": true}\n}\'\n```\n\nReturns:\n- key: (str) The generated api key\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.',
  inputSchema: {
    type: 'object',
    properties: {
      aliases: {
        type: 'object',
        title: 'Aliases',
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      config: {
        type: 'object',
        title: 'Config',
      },
      duration: {
        type: 'string',
        title: 'Duration',
      },
      enforced_params: {
        type: 'array',
        title: 'Enforced Params',
        items: {
          type: 'string',
        },
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      key: {
        type: 'string',
        title: 'Key',
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      send_invite_email: {
        type: 'boolean',
        title: 'Send Invite Email',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.generate(body);
  },
});

registerApiMethod({
  name: 'regenerate_by_key_key',
  description:
    'Regenerate an existing API key while optionally updating its parameters.\n\nParameters:\n- key: str (path parameter) - The key to regenerate\n- data: Optional[RegenerateKeyRequest] - Request body containing optional parameters to update\n    - key_alias: Optional[str] - User-friendly key alias\n    - user_id: Optional[str] - User ID associated with key\n    - team_id: Optional[str] - Team ID associated with key\n    - models: Optional[list] - Model_name\'s a user is allowed to call\n    - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n    - spend: Optional[float] - Amount spent by key\n    - max_budget: Optional[float] - Max budget for key\n    - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n    - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n    - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n    - max_parallel_requests: Optional[int] - Rate limit for parallel requests\n    - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n    - tpm_limit: Optional[int] - Tokens per minute limit\n    - rpm_limit: Optional[int] - Requests per minute limit\n    - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n    - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values\n    - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n    - permissions: Optional[dict] - Key-specific permissions\n    - guardrails: Optional[List[str]] - List of active guardrails for the key\n    - blocked: Optional[bool] - Whether the key is blocked\n\n\nReturns:\n- GenerateKeyResponse containing the new key and its updated parameters\n\nExample:\n```bash\ncurl --location --request POST \'http://localhost:4000/key/sk-1234/regenerate\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "max_budget": 100,\n    "metadata": {"team": "core-infra"},\n    "models": ["gpt-4", "gpt-3.5-turbo"]\n}\'\n```\n\nNote: This is an Enterprise feature. It requires a premium license to use.',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      aliases: {
        type: 'object',
        title: 'Aliases',
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      config: {
        type: 'object',
        title: 'Config',
      },
      duration: {
        type: 'string',
        title: 'Duration',
      },
      enforced_params: {
        type: 'array',
        title: 'Enforced Params',
        items: {
          type: 'string',
        },
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      new_master_key: {
        type: 'string',
        title: 'New Master Key',
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      send_invite_email: {
        type: 'boolean',
        title: 'Send Invite Email',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { key, ...body } = args;
    return client.key.regenerateByKey(key, body);
  },
});

registerApiMethod({
  name: 'retrieve_info_key',
  description:
    'Retrieve information about a key.\nParameters:\n    key: Optional[str] = Query parameter representing the key in the request\n    user_api_key_dict: UserAPIKeyAuth = Dependency representing the user\'s API key\nReturns:\n    Dict containing the key and its associated information\n\nExample Curl:\n```\ncurl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"\n```\n\nExample Curl - if no key is passed, it will use the Key Passed in Authorization Header\n```\ncurl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
        description: 'Key in the request parameters',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'unblock_key',
  description:
    "Unblock a Virtual key to allow it to make requests again.\n\nParameters:\n- key: str - The key to unblock. Can be either the unhashed key (sk-...) or the hashed key value\n\nExample:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can unblock keys.",
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.key.unblock(body);
  },
});

registerApiMethod({
  name: 'create_user',
  description:
    'Use this to create a new INTERNAL user with a budget.\nInternal Users can access LLM Admin UI to make keys, request access to models.\nThis creates a new user and generates a new api key for the new user. The new api key is returned.\n\nReturns user id, budget + new key.\n\nParameters:\n- user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n- user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n- teams: Optional[list] - specify a list of team id\'s a user belongs to.\n- user_email: Optional[str] - Specify a user email.\n- send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n- user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n- max_budget: Optional[float] - Specify max budget for a given user.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models). Set to [\'no-default-models\'] to block all model access. Restricting user to only team-based model access.\n- tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n- rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n- auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n- aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.llm.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n- blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n- guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n- permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n- metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n- model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n- model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n- duration: Optional[str] - Duration for the key auto-created on `/user/new`. Default is None.\n- key_alias: Optional[str] - Alias for the key auto-created on `/user/new`. Default is None.\n\nReturns:\n- key: (str) The generated api key for the user\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.\n- max_budget: (float|None) Max budget for given user.\n\nUsage Example \n\n```shell\n curl -X POST "http://localhost:4000/user/new"      -H "Content-Type: application/json"      -H "Authorization: Bearer sk-1234"      -d \'{\n     "username": "new_user",\n     "email": "new_user@example.com"\n }\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      aliases: {
        type: 'object',
        title: 'Aliases',
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
        },
      },
      auto_create_key: {
        type: 'boolean',
        title: 'Auto Create Key',
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      config: {
        type: 'object',
        title: 'Config',
      },
      duration: {
        type: 'string',
        title: 'Duration',
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      send_invite_email: {
        type: 'boolean',
        title: 'Send Invite Email',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      teams: {
        type: 'array',
        title: 'Teams',
        items: {
          type: 'object',
        },
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_alias: {
        type: 'string',
        title: 'User Alias',
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      user_role: {
        type: 'string',
        title: 'User Role',
        enum: ['proxy_admin', 'proxy_admin_viewer', 'internal_user', 'internal_user_viewer'],
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.user.create(body);
  },
});

registerApiMethod({
  name: 'update_user',
  description:
    'Example curl \n\n```\ncurl --location \'http://0.0.0.0:4000/user/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "user_role": "proxy_admin_viewer"\n}\'\n```\n\nParameters:\n    - user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n    - user_email: Optional[str] - Specify a user email.\n    - password: Optional[str] - Specify a user password.\n    - user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n    - teams: Optional[list] - specify a list of team id\'s a user belongs to.\n    - send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n    - user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n    - max_budget: Optional[float] - Specify max budget for a given user.\n    - budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n    - models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n    - tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n    - rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n    - auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n    - aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n    - config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.llm.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n    - blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n    - guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n    - permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n    - metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n    - max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n    - soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n    - model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n    - model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n    - model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.llm.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n    - spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n    - team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n    - duration: Optional[str] - [NOT IMPLEMENTED].\n    - key_alias: Optional[str] - [NOT IMPLEMENTED].',
  inputSchema: {
    type: 'object',
    properties: {
      aliases: {
        type: 'object',
        title: 'Aliases',
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      config: {
        type: 'object',
        title: 'Config',
      },
      duration: {
        type: 'string',
        title: 'Duration',
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      password: {
        type: 'string',
        title: 'Password',
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      user_role: {
        type: 'string',
        title: 'User Role',
        enum: ['proxy_admin', 'proxy_admin_viewer', 'internal_user', 'internal_user_viewer'],
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.user.update(body);
  },
});

registerApiMethod({
  name: 'list_user',
  description:
    'Get a paginated list of users, optionally filtered by role.\n\nUsed by the UI to populate the user lists.\n\nParameters:\n    role: Optional[str]\n        Filter users by role. Can be one of:\n        - proxy_admin\n        - proxy_admin_viewer\n        - internal_user\n        - internal_user_viewer\n    user_ids: Optional[str]\n        Get list of users by user_ids. Comma separated list of user_ids.\n    page: int\n        The page number to return\n    page_size: int\n        The number of items per page\n\nCurrently - admin-only endpoint.\n\nExample curl:\n```\nhttp://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17\n```',
  inputSchema: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        title: 'Page',
        description: 'Page number',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
        description: 'Number of items per page',
      },
      role: {
        type: 'string',
        title: 'Role',
        description: 'Filter users by role',
      },
      user_ids: {
        type: 'string',
        title: 'User Ids',
        description: 'Get list of users by user_ids',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.user.list(body);
  },
});

registerApiMethod({
  name: 'delete_user',
  description:
    "delete user and associated user keys\n\n```\ncurl --location 'http://0.0.0.0:4000/user/delete' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data-raw '{\n    \"user_ids\": [\"45e3e396-ee08-4a61-a88e-16b3ce7e0849\"]\n}'\n```\n\nParameters:\n- user_ids: List[str] - The list of user id's to be deleted.",
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.user.delete(body);
  },
});

registerApiMethod({
  name: 'retrieve_info_user',
  description:
    "[10/07/2024]\nNote: To get all users (+pagination), use `/user/list` endpoint.\n\n\nUse this to get user information. (user row + all user key info)\n\nExample request\n```\ncurl -X GET 'http://localhost:4000/user/info?user_id=dev7%40hanzo.ai'     --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'User ID in the request parameters',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.user.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'create_team',
  description:
    'Allow users to create a new team. Apply user permissions to their team.\n\n👉 [Detailed Doc on setting team budgets](https://docs.llm.ai/docs/proxy/team_budgets)\n\n\nParameters:\n- team_alias: Optional[str] - User defined team alias\n- team_id: Optional[str] - The team id of the user. If none passed, we\'ll generate it.\n- members_with_roles: List[{"role": "admin" or "user", "user_id": "<user-id>"}] - A list of users and their roles in the team. Get user_id when making a new user via `/user/new`.\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"extra_info": "some info"}\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.llm.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- members: Optional[List] - Control team members via `/team/member/add` and `/team/member/delete`. \n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.llm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.llm.ai/docs/proxy/guardrails)\nReturns:\n- team_id: (str) Unique team id - used for tracking spend across multiple keys for same team id.\n\n_deprecated_params:\n- admins: list - A list of user_id\'s for the admin role\n- users: list - A list of user_id\'s for the user role\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n  "team_alias": "my-new-team_2",\n  "members_with_roles": [{"role": "admin", "user_id": "user-1234"},\n    {"role": "user", "user_id": "user-2434"}]\n}\'\n\n```\n\n ```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n            "team_alias": "QA Prod Bot", \n            "max_budget": 0.000000001, \n            "budget_duration": "1d"\n        }\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      admins: {
        type: 'array',
        title: 'Admins',
        items: {
          type: 'object',
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      members: {
        type: 'array',
        title: 'Members',
        items: {
          type: 'object',
        },
      },
      members_with_roles: {
        type: 'array',
        title: 'Members With Roles',
        items: {
          type: 'object',
          title: 'Member',
          properties: {
            role: {
              type: 'string',
              title: 'Role',
              enum: ['admin', 'user'],
            },
            user_email: {
              type: 'string',
              title: 'User Email',
            },
            user_id: {
              type: 'string',
              title: 'User Id',
            },
          },
          required: ['role'],
        },
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_aliases: {
        type: 'object',
        title: 'Model Aliases',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'object',
        },
      },
      team_alias: {
        type: 'string',
        title: 'Team Alias',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.create(body);
  },
});

registerApiMethod({
  name: 'update_team',
  description:
    'Use `/team/member_add` AND `/team/member/delete` to add/remove new team members  \n\nYou can now update team budget / rate limits via /team/update\n\nParameters:\n- team_id: str - The team id of the user. Required param.\n- team_alias: Optional[str] - User defined team alias\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.llm.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.llm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.llm.ai/docs/proxy/guardrails)\nExample - update team TPM Limit\n\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "tpm_limit": 100\n}\'\n```\n\nExample - Update Team `max_budget` budget\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "max_budget": 10\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_aliases: {
        type: 'object',
        title: 'Model Aliases',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'object',
        },
      },
      team_alias: {
        type: 'string',
        title: 'Team Alias',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.update(body);
  },
});

registerApiMethod({
  name: 'list_team',
  description:
    "```\ncurl --location --request GET 'http://0.0.0.0:4000/team/list'         --header 'Authorization: Bearer sk-1234'\n```\n\nParameters:\n- user_id: str - Optional. If passed will only return teams that the user_id is a member of.\n- organization_id: str - Optional. If passed will only return teams that belong to the organization_id. Pass 'default_organization' to get all teams without organization_id.",
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: "Only return teams which this 'user_id' belongs to",
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.list(body);
  },
});

registerApiMethod({
  name: 'delete_team',
  description:
    'delete team and associated team keys\n\nParameters:\n- team_ids: List[str] - Required. List of team IDs to delete. Example: ["team-1234", "team-5678"]\n\n```\ncurl --location \'http://0.0.0.0:4000/team/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_ids": ["8d916b1c-510d-4894-a334-1c16a93344f5"]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      team_ids: {
        type: 'array',
        title: 'Team Ids',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.delete(body);
  },
});

registerApiMethod({
  name: 'add_member_team',
  description:
    '[BETA]\n\nAdd new members (either via user_email or user_id) to a team\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or admin of team, allowed to access this endpoint.\n```\n\ncurl -X POST \'http://0.0.0.0:4000/team/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "dev247652@hanzo.ai"}}\'\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
              type: 'object',
              title: 'Member',
              properties: {
                role: {
                  type: 'string',
                  title: 'Role',
                  enum: ['admin', 'user'],
                },
                user_email: {
                  type: 'string',
                  title: 'User Email',
                },
                user_id: {
                  type: 'string',
                  title: 'User Id',
                },
              },
              required: ['role'],
            },
          },
          {
            type: 'object',
            title: 'Member',
            properties: {
              role: {
                type: 'string',
                title: 'Role',
                enum: ['admin', 'user'],
              },
              user_email: {
                type: 'string',
                title: 'User Email',
              },
              user_id: {
                type: 'string',
                title: 'User Id',
              },
            },
            required: ['role'],
          },
        ],
        title: 'Member',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.addMember(body);
  },
});

registerApiMethod({
  name: 'block_team',
  description:
    "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to block.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```\n\nReturns:\n- The updated team record with blocked=True",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.block(body);
  },
});

registerApiMethod({
  name: 'disable_logging_team',
  description:
    "Disable all logging callbacks for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging'         -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { team_id } = args;
    return client.team.disableLogging(team_id);
  },
});

registerApiMethod({
  name: 'list_available_team',
  description: 'List Available Teams',
  inputSchema: {
    type: 'object',
    properties: {
      response_model: {
        type: 'object',
        title: 'Response Model',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.listAvailable(body);
  },
});

registerApiMethod({
  name: 'remove_member_team',
  description:
    "[BETA]\n\ndelete members (either via user_email or user_id) from a team\n\nIf user doesn't exist, an exception will be raised\n```\ncurl -X POST 'http://0.0.0.0:8000/team/member_delete' \n-H 'Authorization: Bearer sk-1234' \n-H 'Content-Type: application/json' \n-d '{\n    \"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"user_id\": \"dev247652@hanzo.ai\"\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.removeMember(body);
  },
});

registerApiMethod({
  name: 'retrieve_info_team',
  description:
    "get info on team + related keys\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to get info on.\n\n```\ncurl --location 'http://localhost:4000/team/info?team_id=your_team_id_here'     --header 'Authorization: Bearer your_api_key_here'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: 'Team ID in the request parameters',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'unblock_team',
  description:
    "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to unblock.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.unblock(body);
  },
});

registerApiMethod({
  name: 'update_member_team',
  description: '[BETA]\n\nUpdate team member budgets and team member role',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
      role: {
        type: 'string',
        title: 'Role',
        enum: ['admin', 'user'],
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.updateMember(body);
  },
});

registerApiMethod({
  name: 'add_team_model',
  description:
    'Add models to a team\'s allowed model list. Only proxy admin or team admin can add models.\n\nParameters:\n- team_id: str - Required. The team to add models to\n- models: List[str] - Required. List of models to add to the team\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/model/add\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "team_id": "team-1234",\n    "models": ["gpt-4", "claude-2"]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.model.add(body);
  },
});

registerApiMethod({
  name: 'remove_team_model',
  description:
    "Remove models from a team's allowed model list. Only proxy admin or team admin can remove models.\n\nParameters:\n- team_id: str - Required. The team to remove models from\n- models: List[str] - Required. List of models to remove from the team\n\nExample Request:\n```\ncurl --location 'http://0.0.0.0:4000/team/model/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\",\n    \"models\": [\"gpt-4\"]\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.team.model.remove(body);
  },
});

registerApiMethod({
  name: 'retrieve_team_callback',
  description:
    'Get the success/failure callbacks and variables for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X GET \'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Authorization: Bearer sk-1234\'\n```\n\nThis will return the callback settings for the team with id dbe2f686-a686-4896-864a-4c3924458709\n\nReturns {\n        "status": "success",\n        "data": {\n            "team_id": team_id,\n            "success_callbacks": team_callback_settings_obj.success_callback,\n            "failure_callbacks": team_callback_settings_obj.failure_callback,\n            "callback_vars": team_callback_settings_obj.callback_vars,\n        },\n    }',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (args: any) => {
    const { team_id } = args;
    return client.team.callback.retrieve(team_id);
  },
});

registerApiMethod({
  name: 'add_team_callback',
  description:
    'Add a success/failure callback to a team\n\nUse this if if you want different teams to have different success/failure callbacks\n\nParameters:\n- callback_name (Literal["langfuse", "langsmith", "gcs"], required): The name of the callback to add\n- callback_type (Literal["success", "failure", "success_and_failure"], required): The type of callback to add. One of:\n    - "success": Callback for successful LLM calls\n    - "failure": Callback for failed LLM calls\n    - "success_and_failure": Callback for both successful and failed LLM calls\n- callback_vars (StandardCallbackDynamicParams, required): A dictionary of variables to pass to the callback\n    - langfuse_public_key: The public key for the Langfuse callback\n    - langfuse_secret_key: The secret key for the Langfuse callback\n    - langfuse_secret: The secret for the Langfuse callback\n    - langfuse_host: The host for the Langfuse callback\n    - gcs_bucket_name: The name of the GCS bucket\n    - gcs_path_service_account: The path to the GCS service account\n    - langsmith_api_key: The API key for the Langsmith callback\n    - langsmith_project: The project for the Langsmith callback\n    - langsmith_base_url: The base URL for the Langsmith callback\n\nExample curl:\n```\ncurl -X POST \'http:/localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Content-Type: application/json\'         -H \'Authorization: Bearer sk-1234\'         -d \'{\n    "callback_name": "langfuse",\n    "callback_type": "success",\n    "callback_vars": {"langfuse_public_key": "pk-lf-xxxx1", "langfuse_secret_key": "sk-xxxxx"}\n    \n}\'\n```\n\nThis means for the team where team_id = dbe2f686-a686-4896-864a-4c3924458709, all LLM calls will be logged to langfuse using the public key pk-lf-xxxx1 and the secret key sk-xxxxx',
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      callback_name: {
        type: 'string',
        title: 'Callback Name',
      },
      callback_vars: {
        type: 'object',
        title: 'Callback Vars',
      },
      callback_type: {
        type: 'string',
        title: 'Callback Type',
        enum: ['success', 'failure', 'success_and_failure'],
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (args: any) => {
    const { team_id, ...body } = args;
    return client.team.callback.add(team_id, body);
  },
});

registerApiMethod({
  name: 'create_organization',
  description:
    'Allow orgs to own teams\n\nSet org level budgets + model access.\n\nOnly admins can create orgs.\n\n# Parameters\n\n- organization_alias: *str* - The name of the organization.\n- models: *List* - The models the organization has access to.\n- budget_id: *Optional[str]* - The id for a budget (tpm/rpm/max budget) for the organization.\n### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS ###\n- max_budget: *Optional[float]* - Max budget for org\n- tpm_limit: *Optional[int]* - Max tpm limit for org\n- rpm_limit: *Optional[int]* - Max rpm limit for org\n- max_parallel_requests: *Optional[int]* - [Not Implemented Yet] Max parallel requests for org\n- soft_budget: *Optional[float]* - [Not Implemented Yet] Get a slack alert when this soft budget is reached. Don\'t block requests.\n- model_max_budget: *Optional[dict]* - Max budget for a specific model\n- budget_duration: *Optional[str]* - Frequency of reseting org budget\n- metadata: *Optional[dict]* - Metadata for organization, store information for organization. Example metadata - {"extra_info": "some info"}\n- blocked: *bool* - Flag indicating if the org is blocked or not - will stop all calls from keys with this org_id.\n- tags: *Optional[List[str]]* - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: *Optional[str]* - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.llm.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n\nCase 1: Create new org **without** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "max_budget": 100\n}\'\n\n\n```\n\nCase 2: Create new org **with** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "budget_id": "428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      organization_alias: {
        type: 'string',
        title: 'Organization Alias',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.create(body);
  },
});

registerApiMethod({
  name: 'update_organization',
  description: 'Update an organization',
  inputSchema: {
    type: 'object',
    properties: {
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'string',
        },
      },
      organization_alias: {
        type: 'string',
        title: 'Organization Alias',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      updated_by: {
        type: 'string',
        title: 'Updated By',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.update(body);
  },
});

registerApiMethod({
  name: 'list_organization',
  description:
    "```\ncurl --location --request GET 'http://0.0.0.0:4000/organization/list'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.organization.list();
  },
});

registerApiMethod({
  name: 'delete_organization',
  description:
    'Delete an organization\n\n# Parameters:\n\n- organization_ids: List[str] - The organization ids to delete.',
  inputSchema: {
    type: 'object',
    properties: {
      organization_ids: {
        type: 'array',
        title: 'Organization Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.delete(body);
  },
});

registerApiMethod({
  name: 'add_member_organization',
  description:
    '[BETA]\n\nAdd new members (either via user_email or user_id) to an organization\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or org_admin of organization, allowed to access this endpoint.\n\n# Parameters:\n\n- organization_id: str (required)\n- member: Union[List[Member], Member] (required)\n    - role: Literal[LLMUserRoles] (required)\n    - user_id: Optional[str]\n    - user_email: Optional[str]\n\nNote: Either user_id or user_email must be provided for each member.\n\nExample:\n```\ncurl -X POST \'http://0.0.0.0:4000/organization/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{\n    "organization_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",\n    "member": {\n        "role": "internal_user",\n        "user_id": "dev247652@hanzo.ai"\n    },\n    "max_budget_in_organization": 100.0\n}\'\n```\n\nThe following is executed in this function:\n\n1. Check if organization exists\n2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable\n3. Add Internal User to the `LLM_OrganizationMembership` table',
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
              type: 'object',
              title: 'OrgMember',
              properties: {
                role: {
                  type: 'string',
                  title: 'Role',
                  enum: ['org_admin', 'internal_user', 'internal_user_viewer'],
                },
                user_email: {
                  type: 'string',
                  title: 'User Email',
                },
                user_id: {
                  type: 'string',
                  title: 'User Id',
                },
              },
              required: ['role'],
            },
          },
          {
            type: 'object',
            title: 'OrgMember',
            properties: {
              role: {
                type: 'string',
                title: 'Role',
                enum: ['org_admin', 'internal_user', 'internal_user_viewer'],
              },
              user_email: {
                type: 'string',
                title: 'User Email',
              },
              user_id: {
                type: 'string',
                title: 'User Id',
              },
            },
            required: ['role'],
          },
        ],
        title: 'Member',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      max_budget_in_organization: {
        type: 'number',
        title: 'Max Budget In Organization',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.addMember(body);
  },
});

registerApiMethod({
  name: 'delete_member_organization',
  description: 'Delete a member from an organization',
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.deleteMember(body);
  },
});

registerApiMethod({
  name: 'update_member_organization',
  description: "Update a member's role in an organization",
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      max_budget_in_organization: {
        type: 'number',
        title: 'Max Budget In Organization',
      },
      role: {
        type: 'string',
        title: 'LLMUserRoles',
        description:
          'Admin Roles:\nPROXY_ADMIN: admin over the platform\nPROXY_ADMIN_VIEW_ONLY: can login, view all own keys, view all spend\nORG_ADMIN: admin over a specific organization, can create teams, users only within their organization\n\nInternal User Roles:\nINTERNAL_USER: can login, view/create/delete their own keys, view their spend\nINTERNAL_USER_VIEW_ONLY: can login, view their own keys, view their own spend\n\n\nTeam Roles:\nTEAM: used for JWT auth\n\n\nCustomer Roles:\nCUSTOMER: External users -> these are customers',
        enum: [
          'proxy_admin',
          'proxy_admin_viewer',
          'org_admin',
          'internal_user',
          'internal_user_viewer',
          'team',
          'customer',
        ],
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.updateMember(body);
  },
});

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
  handler: (args: any) => {
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
  handler: (args: any) => {
    const { ...body } = args;
    return client.organization.info.deprecated(body);
  },
});

registerApiMethod({
  name: 'create_customer',
  description:
    'Allow creating a new Customer \n\n\nParameters:\n- user_id: str - The unique identifier for the user.\n- alias: Optional[str] - A human-friendly alias for the user.\n- blocked: bool - Flag to allow or disallow requests for this end-user. Default is False.\n- max_budget: Optional[float] - The maximum budget allocated to the user. Either \'max_budget\' or \'budget_id\' should be provided, not both.\n- budget_id: Optional[str] - The identifier for an existing budget allocated to the user. Either \'max_budget\' or \'budget_id\' should be provided, not both.\n- allowed_model_region: Optional[Union[Literal["eu"], Literal["us"]]] - Require all user requests to use models in this specific region.\n- default_model: Optional[str] - If no equivalent model in the allowed region, default all requests to this model.\n- metadata: Optional[dict] = Metadata for customer, store information for customer. Example metadata = {"data_training_opt_out": True}\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- tpm_limit: Optional[int] - [Not Implemented Yet] Specify tpm limit for a given customer (Tokens per minute)\n- rpm_limit: Optional[int] - [Not Implemented Yet] Specify rpm limit for a given customer (Requests per minute)\n- model_max_budget: Optional[dict] - [Not Implemented Yet] Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d"}}\n- max_parallel_requests: Optional[int] - [Not Implemented Yet] Specify max parallel requests for a given customer.\n- soft_budget: Optional[float] - [Not Implemented Yet] Get alerts when customer crosses given budget, doesn\'t block requests.\n\n\n- Allow specifying allowed regions \n- Allow specifying default model\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/new\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "user_id" : "z-jaff-3",\n        "allowed_region": "eu",\n        "budget_id": "free_tier",\n        "default_model": "azure/gpt-3.5-turbo-eu" <- all calls from this user, use this model? \n    }\'\n\n    # return end-user object\n```\n\nNOTE: This used to be called `/end_user/new`, we will still be maintaining compatibility for /end_user/XXX for these endpoints',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      alias: {
        type: 'string',
        title: 'Alias',
      },
      allowed_model_region: {
        type: 'string',
        title: 'Allowed Model Region',
        enum: ['eu', 'us'],
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      default_model: {
        type: 'string',
        title: 'Default Model',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
        description: 'Requests will fail if this budget (in USD) is exceeded.',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
        description: 'Max concurrent requests allowed for this budget id.',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
        description:
          "Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})",
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
        description: 'Max requests per minute, allowed for this budget id.',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
        description: 'Requests will NOT fail if this is exceeded. Will fire alerting though.',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
        description: 'Max tokens per minute, allowed for this budget id.',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.customer.create(body);
  },
});

registerApiMethod({
  name: 'update_customer',
  description:
    'Example curl \n\nParameters:\n- user_id: str\n- alias: Optional[str] = None  # human-friendly alias\n- blocked: bool = False  # allow/disallow requests for this end-user\n- max_budget: Optional[float] = None\n- budget_id: Optional[str] = None  # give either a budget_id or max_budget\n- allowed_model_region: Optional[AllowedModelRegion] = (\n    None  # require all user requests to use models in this specific region\n)\n- default_model: Optional[str] = (\n    None  # if no equivalent model in allowed region - default all requests to this model\n)\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "budget_id": "paid_tier"\n}\'\n\nSee below for all params \n```',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      alias: {
        type: 'string',
        title: 'Alias',
      },
      allowed_model_region: {
        type: 'string',
        title: 'Allowed Model Region',
        enum: ['eu', 'us'],
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      default_model: {
        type: 'string',
        title: 'Default Model',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.customer.update(body);
  },
});

registerApiMethod({
  name: 'list_customer',
  description:
    "[Admin-only] List all available customers\n\nExample curl:\n```\ncurl --location --request GET 'http://0.0.0.0:4000/customer/list'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.customer.list();
  },
});

registerApiMethod({
  name: 'delete_customer',
  description:
    "Delete multiple end-users.\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to delete\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/delete'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{\n        \"user_ids\" :[\"z-jaff-5\"]\n}'\n\nSee below for all params \n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.customer.delete(body);
  },
});

registerApiMethod({
  name: 'block_customer',
  description:
    '[BETA] Reject calls with this end-user id\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to block\n\n    (any /chat/completion call with this user={end-user-id} param, will be rejected.)\n\n    ```\n    curl -X POST "http://0.0.0.0:8000/user/block"\n    -H "Authorization: Bearer sk-1234"\n    -d \'{\n    "user_ids": [<user_id>, ...]\n    }\'\n    ```',
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.customer.block(body);
  },
});

registerApiMethod({
  name: 'retrieve_info_customer',
  description:
    "Get information about an end-user. An `end_user` is a customer (external user) of the proxy.\n\nParameters:\n- end_user_id (str, required): The unique identifier for the end-user\n\nExample curl:\n```\ncurl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      end_user_id: {
        type: 'string',
        title: 'End User Id',
        description: 'End User ID in the request parameters',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.customer.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'unblock_customer',
  description:
    '[BETA] Unblock calls with this user id\n\nExample\n```\ncurl -X POST "http://0.0.0.0:8000/user/unblock"\n-H "Authorization: Bearer sk-1234"\n-d \'{\n"user_ids": [<user_id>, ...]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.customer.unblock(body);
  },
});

registerApiMethod({
  name: 'calculate_spend_spend',
  description:
    'Accepts all the params of completion_cost.\n\nCalculate spend **before** making call:\n\nNote: If you see a spend of $0.0 you need to set custom_pricing for your model: https://docs.llm.ai/docs/proxy/custom_pricing\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "model": "anthropic.claude-v2",\n    "messages": [{"role": "user", "content": "Hey, how\'\'\'s it going?"}]\n}\'\n```\n\nCalculate spend **after** making call:\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "completion_response": {\n        "id": "chatcmpl-123",\n        "object": "chat.completion",\n        "created": 1677652288,\n        "model": "gpt-3.5-turbo-0125",\n        "system_fingerprint": "fp_44709d6fcb",\n        "choices": [{\n            "index": 0,\n            "message": {\n                "role": "assistant",\n                "content": "Hello there, how may I assist you today?"\n            },\n            "logprobs": null,\n            "finish_reason": "stop"\n        }]\n        "usage": {\n            "prompt_tokens": 9,\n            "completion_tokens": 12,\n            "total_tokens": 21\n        }\n    }\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      completion_response: {
        type: 'object',
        title: 'Completion Response',
      },
      messages: {
        type: 'array',
        title: 'Messages',
        items: {
          type: 'object',
        },
      },
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.spend.calculateSpend(body);
  },
});

registerApiMethod({
  name: 'list_logs_spend',
  description:
    'View all spend logs, if request_id is provided, only logs for that request_id will be returned\n\nExample Request for all logs\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific request_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?request_id=chatcmpl-6dcb2540-d3d7-4e49-bb27-291f863f112e" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific api_key\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?api_key=sk-Fn8Ej39NkBQmUagFEoUWPQ" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific user_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?user_id=z@hanzo.ai" -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        title: 'Api Key',
        description: 'Get spend logs based on api key',
      },
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view key spend',
      },
      request_id: {
        type: 'string',
        title: 'Request Id',
        description:
          'request_id to get spend logs for specific request_id. If none passed then pass spend logs for all requests',
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing key spend',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'Get spend logs based on user_id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.spend.listLogs(body);
  },
});

registerApiMethod({
  name: 'list_tags_spend',
  description:
    'LLM Enterprise - View Spend Per Request Tag\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view key spend',
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing key spend',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.spend.listTags(body);
  },
});

registerApiMethod({
  name: 'list_tags_global_spend',
  description:
    'LLM Enterprise - View Spend Per Request Tag. Used by LLM UI\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view key spend',
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing key spend',
      },
      tags: {
        type: 'string',
        title: 'Tags',
        description: 'comman separated tags to filter on',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.global.spend.listTags(body);
  },
});

registerApiMethod({
  name: 'reset_global_spend',
  description:
    'ADMIN ONLY / MASTER KEY Only Endpoint\n\nGlobally reset spend for All API Keys and Teams, maintain LLM_SpendLogs\n\n1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there\n2. LLM_VerificationTokens spend will be set = 0\n3. LLM_TeamTable spend will be set = 0',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.global.spend.reset();
  },
});

registerApiMethod({
  name: 'retrieve_report_global_spend',
  description:
    'Get Daily Spend per Team, based on specific startTime and endTime. Per team, view usage by each key, model\n[\n    {\n        "group-by-day": "2024-05-10",\n        "teams": [\n            {\n                "team_name": "team-1"\n                "spend": 10,\n                "keys": [\n                    "key": "1213",\n                    "usage": {\n                        "model-1": {\n                                "cost": 12.50,\n                                "input_tokens": 1000,\n                                "output_tokens": 5000,\n                                "requests": 100\n                            },\n                            "audio-modelname1": {\n                            "cost": 25.50,\n                            "seconds": 25,\n                            "requests": 50\n                    },\n                    }\n                }\n        ]\n    ]\n}',
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        title: 'Api Key',
        description: "View spend for a specific api_key. Example api_key='sk-1234",
      },
      customer_id: {
        type: 'string',
        title: 'Customer Id',
        description:
          "View spend for a specific customer_id. Example customer_id='1234. Can be used in conjunction with team_id as well.",
      },
      end_date: {
        type: 'string',
        title: 'End Date',
        description: 'Time till which to view spend',
      },
      group_by: {
        type: 'string',
        title: 'Group By',
        description: 'Group spend by internal team or customer or api_key',
        enum: ['team', 'customer', 'api_key'],
      },
      internal_user_id: {
        type: 'string',
        title: 'Internal User Id',
        description: "View spend for a specific internal_user_id. Example internal_user_id='1234",
      },
      start_date: {
        type: 'string',
        title: 'Start Date',
        description: 'Time from which to start viewing spend',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: "View spend for a specific team_id. Example team_id='1234",
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.global.spend.retrieveReport(body);
  },
});

registerApiMethod({
  name: 'list_budgets_provider',
  description:
    'Provider Budget Routing - Get Budget, Spend Details https://docs.llm.ai/docs/proxy/provider_budget_routing\n\nUse this endpoint to check current budget, spend and budget reset time for a provider\n\nExample Request\n\n```bash\ncurl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"\n```\n\nExample Response\n\n```json\n{\n    "providers": {\n        "openai": {\n            "budget_limit": 1e-12,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "azure": {\n            "budget_limit": 100.0,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "anthropic": {\n            "budget_limit": 100.0,\n            "time_period": "10d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "vertex_ai": {\n            "budget_limit": 100.0,\n            "time_period": "12d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        }\n    }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.provider.listBudgets();
  },
});

registerApiMethod({
  name: 'delete_cache',
  description:
    'Endpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers\n\nParameters:\n- **keys**: *Optional[List[str]]* - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}\n\n```shell\ncurl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d \'{"keys": ["key1", "key2"]}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.cache.delete();
  },
});

registerApiMethod({
  name: 'flush_all_cache',
  description:
    'A function to flush all items from the cache. (All items will be deleted from the cache with this)\nRaises HTTPException if the cache is not initialized or if the cache type does not support flushing.\nReturns a dictionary with the status of the operation.\n\nUsage:\n```\ncurl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.cache.flushAll();
  },
});

registerApiMethod({
  name: 'ping_cache',
  description: 'Endpoint for checking if cache can be pinged',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.cache.ping();
  },
});

registerApiMethod({
  name: 'retrieve_info_cache_redis',
  description: 'Endpoint for getting /redis/info',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.cache.redis.retrieveInfo();
  },
});

registerApiMethod({
  name: 'list_guardrails',
  description:
    'List the guardrails that are available on the proxy server\n\n👉 [Guardrail docs](https://docs.llm.ai/docs/proxy/guardrails/quick_start)\n\nExample Request:\n```bash\ncurl -X GET "http://localhost:4000/guardrails/list" -H "Authorization: Bearer <your_api_key>"\n```\n\nExample Response:\n```json\n{\n    "guardrails": [\n        {\n        "guardrail_name": "bedrock-pre-guard",\n        "guardrail_info": {\n            "params": [\n            {\n                "name": "toxicity_score",\n                "type": "float",\n                "description": "Score between 0-1 indicating content toxicity level"\n            },\n            {\n                "name": "pii_detection",\n                "type": "boolean"\n            }\n            ]\n        }\n        }\n    ]\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.guardrails.list();
  },
});

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
  handler: (args: any) => {
    const { ...body } = args;
    return client.add.addAllowedIP(body);
  },
});

registerApiMethod({
  name: 'create_allowed_ip_delete',
  description: 'Delete Allowed Ip',
  inputSchema: {
    type: 'object',
    properties: {
      ip: {
        type: 'string',
        title: 'Ip',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.delete.createAllowedIP(body);
  },
});

registerApiMethod({
  name: 'create_files',
  description:
    'Upload a file that can be used across - Assistants API, Batch API \nThis is the equivalent of POST https://api.openai.com/v1/files\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/create\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files         -H "Authorization: Bearer sk-1234"         -F purpose="batch"         -F file="@mydata.jsonl"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file: {
        type: 'string',
        title: 'File',
      },
      purpose: {
        type: 'string',
        title: 'Purpose',
      },
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
      },
    },
  },
  handler: (args: any) => {
    const { provider, ...body } = args;
    return client.files.create(provider, body);
  },
});

registerApiMethod({
  name: 'retrieve_files',
  description:
    'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123         -H "Authorization: Bearer sk-1234"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file_id: {
        type: 'string',
        title: 'File Id',
      },
    },
  },
  handler: (args: any) => {
    const { file_id, ...body } = args;
    return client.files.retrieve(file_id, body);
  },
});

registerApiMethod({
  name: 'list_files',
  description:
    'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files        -H "Authorization: Bearer sk-1234"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      purpose: {
        type: 'string',
        title: 'Purpose',
      },
    },
  },
  handler: (args: any) => {
    const { provider, ...body } = args;
    return client.files.list(provider, body);
  },
});

registerApiMethod({
  name: 'delete_files',
  description:
    'Deletes a specified file. that can be used across - Assistants API, Batch API \nThis is the equivalent of DELETE https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/delete\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123     -X DELETE     -H "Authorization: Bearer $OPENAI_API_KEY"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file_id: {
        type: 'string',
        title: 'File Id',
      },
    },
  },
  handler: (args: any) => {
    const { file_id, ...body } = args;
    return client.files.delete(file_id, body);
  },
});

registerApiMethod({
  name: 'retrieve_files_content',
  description:
    'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}/content\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve-contents\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123/content         -H "Authorization: Bearer sk-1234"\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        title: 'Provider',
      },
      file_id: {
        type: 'string',
        title: 'File Id',
      },
    },
  },
  handler: (args: any) => {
    const { file_id, ...body } = args;
    return client.files.content.retrieve(file_id, body);
  },
});

registerApiMethod({
  name: 'create_budget',
  description:
    'Create a new budget object. Can apply this to teams, orgs, end-users, keys.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}',
  inputSchema: {
    type: 'object',
    properties: {
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
        description: 'The unique budget id.',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
        description: 'Requests will fail if this budget (in USD) is exceeded.',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
        description: 'Max concurrent requests allowed for this budget id.',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
        description:
          "Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})",
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
        description: 'Max requests per minute, allowed for this budget id.',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
        description: 'Requests will NOT fail if this is exceeded. Will fire alerting though.',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
        description: 'Max tokens per minute, allowed for this budget id.',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.budget.create(body);
  },
});

registerApiMethod({
  name: 'update_budget',
  description:
    'Update an existing budget object.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}',
  inputSchema: {
    type: 'object',
    properties: {
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
        description: 'The unique budget id.',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
        description: 'Requests will fail if this budget (in USD) is exceeded.',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
        description: 'Max concurrent requests allowed for this budget id.',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
        description:
          "Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})",
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
        description: 'Max requests per minute, allowed for this budget id.',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
        description: 'Requests will NOT fail if this is exceeded. Will fire alerting though.',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
        description: 'Max tokens per minute, allowed for this budget id.',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.budget.update(body);
  },
});

registerApiMethod({
  name: 'list_budget',
  description: 'List all the created budgets in proxy db. Used on Admin UI.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (args: any) => {
    const {} = args;
    return client.budget.list();
  },
});

registerApiMethod({
  name: 'delete_budget',
  description: 'Delete budget\n\nParameters:\n- id: str - The budget id to delete',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.budget.delete(body);
  },
});

registerApiMethod({
  name: 'info_budget',
  description:
    'Get the budget id specific information\n\nParameters:\n- budgets: List[str] - The list of budget ids to get information for',
  inputSchema: {
    type: 'object',
    properties: {
      budgets: {
        type: 'array',
        title: 'Budgets',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.budget.info(body);
  },
});

registerApiMethod({
  name: 'settings_budget',
  description:
    'Get list of configurable params + current value for a budget item + description of each field\n\nUsed on Admin UI.\n\nQuery Parameters:\n- budget_id: str - The budget id to get information for',
  inputSchema: {
    type: 'object',
    properties: {
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
    },
  },
  handler: (args: any) => {
    const { ...body } = args;
    return client.budget.settings(body);
  },
});

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

  const result = await handler(args);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
});

function registerApiMethod({
  name,
  description,
  inputSchema,
  handler,
}: {
  name: string;
  description: string;
  inputSchema: Tool['inputSchema'];
  handler: Function;
}) {
  tools.push({ name, description, inputSchema });
  handlers[name] = handler;
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

console.error('running main');
main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
