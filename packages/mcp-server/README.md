# Hanzo TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export HANZO_API_KEY = "My API Key"
npx -y hanzoai-mcp
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "hanzoai_api": {
      "command": "npx",
      "args": ["-y", "hanzoai-mcp"],
      "env": {
        "HANZO_API_KEY": "My API Key"
      }
    }
  }
}
```

## Filtering tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "hanzoai-mcp/server";

// import a specific tool
import getHomeClient from "hanzoai-mcp/tools/top-level/get-home-client";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [getHomeClient, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `$client`:

- `get_home_$client` (`read`): Home

### Resource `models`:

- `list_models` (`read`): Use `/model/info` - to get detailed model information, example - pricing, mode, etc.

This is just for compatibility with openai projects like aider.

### Resource `openai`:

- `create_openai` (`write`): Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.
- `retrieve_openai` (`read`): Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.
- `update_openai` (`write`): Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.
- `delete_openai` (`write`): Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.
- `patch_openai` (`write`): Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.

### Resource `openai.deployments`:

- `complete_openai_deployments` (`write`): Follows the exact same API spec as `OpenAI's Completions API https://platform.openai.com/docs/api-reference/completions`

```bash
curl -X POST http://localhost:4000/v1/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "Once upon a time",
    "max_tokens": 50,
    "temperature": 0.7
}'
```

- `embed_openai_deployments` (`write`): Follows the exact same API spec as `OpenAI's Embeddings API https://platform.openai.com/docs/api-reference/embeddings`

```bash
curl -X POST http://localhost:4000/v1/embeddings
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "text-embedding-ada-002",
    "input": "The quick brown fox jumps over the lazy dog"
}'
```

### Resource `openai.deployments.chat`:

- `complete_deployments_openai_chat` (`write`): Follows the exact same API spec as `OpenAI's Chat API https://platform.openai.com/docs/api-reference/chat`

```bash
curl -X POST http://localhost:4000/v1/chat/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
}'
```

### Resource `engines`:

- `complete_engines` (`write`): Follows the exact same API spec as `OpenAI's Completions API https://platform.openai.com/docs/api-reference/completions`

```bash
curl -X POST http://localhost:4000/v1/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "Once upon a time",
    "max_tokens": 50,
    "temperature": 0.7
}'
```

- `embed_engines` (`write`): Follows the exact same API spec as `OpenAI's Embeddings API https://platform.openai.com/docs/api-reference/embeddings`

```bash
curl -X POST http://localhost:4000/v1/embeddings
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "text-embedding-ada-002",
    "input": "The quick brown fox jumps over the lazy dog"
}'
```

### Resource `engines.chat`:

- `complete_engines_chat` (`write`): Follows the exact same API spec as `OpenAI's Chat API https://platform.openai.com/docs/api-reference/chat`

```bash
curl -X POST http://localhost:4000/v1/chat/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
}'
```

### Resource `chat.completions`:

- `create_chat_completions` (`write`): Follows the exact same API spec as `OpenAI's Chat API https://platform.openai.com/docs/api-reference/chat`

```bash
curl -X POST http://localhost:4000/v1/chat/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
}'
```

### Resource `completions`:

- `create_completions` (`write`): Follows the exact same API spec as `OpenAI's Completions API https://platform.openai.com/docs/api-reference/completions`

```bash
curl -X POST http://localhost:4000/v1/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "Once upon a time",
    "max_tokens": 50,
    "temperature": 0.7
}'
```

### Resource `embeddings`:

- `create_embeddings` (`write`): Follows the exact same API spec as `OpenAI's Embeddings API https://platform.openai.com/docs/api-reference/embeddings`

```bash
curl -X POST http://localhost:4000/v1/embeddings
-H "Content-Type: application/json"
-H "Authorization: Bearer sk-1234"
-d '{
    "model": "text-embedding-ada-002",
    "input": "The quick brown fox jumps over the lazy dog"
}'
```

### Resource `images.generations`:

- `create_images_generations` (`write`): Image Generation

### Resource `audio.speech`:

- `create_audio_speech` (`write`): Same params as:

https://platform.openai.com/docs/api-reference/audio/createSpeech

### Resource `audio.transcriptions`:

- `create_audio_transcriptions` (`write`): Same params as:

https://platform.openai.com/docs/api-reference/audio/createTranscription?lang=curl

### Resource `assistants`:

- `create_assistants` (`write`): Create assistant

API Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant

- `list_assistants` (`read`): Returns a list of assistants.

API Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants

- `delete_assistants` (`write`): Delete assistant

API Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant

### Resource `threads`:

- `create_threads` (`write`): Create a thread.

API Reference - https://platform.openai.com/docs/api-reference/threads/createThread

- `retrieve_threads` (`read`): Retrieves a thread.

API Reference - https://platform.openai.com/docs/api-reference/threads/getThread

### Resource `threads.messages`:

- `create_threads_messages` (`write`): Create a message.

API Reference - https://platform.openai.com/docs/api-reference/messages/createMessage

- `list_threads_messages` (`read`): Returns a list of messages for a given thread.

API Reference - https://platform.openai.com/docs/api-reference/messages/listMessages

### Resource `threads.runs`:

- `create_threads_runs` (`write`): Create a run.

API Reference: https://platform.openai.com/docs/api-reference/runs/createRun

### Resource `moderations`:

- `create_moderations` (`write`): The moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.

Quick Start

```
curl --location 'http://0.0.0.0:4000/moderations'     --header 'Content-Type: application/json'     --header 'Authorization: Bearer sk-1234'     --data '{"input": "Sample text goes here", "model": "text-moderation-stable"}'
```

### Resource `utils`:

- `get_supported_openai_params_utils` (`read`): Returns supported openai params for a given llm model name

e.g. `gpt-4` vs `gpt-3.5-turbo`

Example curl:

```
curl -X GET --location 'http://localhost:4000/utils/supported_openai_params?model=gpt-3.5-turbo-16k'         --header 'Authorization: Bearer sk-1234'
```

- `token_counter_utils` (`write`): Token Counter
- `transform_request_utils` (`write`): Transform Request

### Resource `model`:

- `create_model` (`write`): Allows adding new models to the model list in the config.yaml
- `delete_model` (`write`): Allows deleting models in the model list in the config.yaml

### Resource `model.info`:

- `list_model_info` (`read`): Provides more info about each model in /models, including config.yaml descriptions (except api key and api base)

Parameters:
llm_model_id: Optional[str] = None (this is the value of `x-llm-model-id` returned in response headers)

    - When llm_model_id is passed, it will return the info for that specific model
    - When llm_model_id is not passed, it will return the info for all models

Returns:
Returns a dictionary containing information about each model.

Example Response:

```json
{
  "data": [
    {
      "model_name": "fake-openai-endpoint",
      "llm_params": {
        "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",
        "model": "openai/fake"
      },
      "model_info": {
        "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",
        "db_model": false
      }
    }
  ]
}
```

### Resource `model.update`:

- `full_model_update` (`write`): Edit existing model params
- `partial_model_update` (`write`): PATCH Endpoint for partial model updates.

Only updates the fields specified in the request while preserving other existing values.
Follows proper PATCH semantics by only modifying provided fields.

Args:
model_id: The ID of the model to update
patch_data: The fields to update and their new values
user_api_key_dict: User authentication information

Returns:
Updated model information

Raises:
ProxyException: For various error conditions including authentication and database errors

### Resource `model_group`:

- `retrieve_info_model_group` (`read`): Get information about all the deployments on llm proxy, including config.yaml descriptions (except api key and api base)

* /model_group/info returns all model groups. End users of proxy should use /model_group/info since those models will be used for /chat/completions, /embeddings, etc.
* /model_group/info?model_group=rerank-english-v3.0 returns all model groups for a specific model group (`model_name` in config.yaml)

Example Request (All Models):

```shell
curl -X 'GET'     'http://localhost:4000/model_group/info'     -H 'accept: application/json'     -H 'x-api-key: sk-1234'
```

Example Request (Specific Model Group):

```shell
curl -X 'GET'     'http://localhost:4000/model_group/info?model_group=rerank-english-v3.0'     -H 'accept: application/json'     -H 'Authorization: Bearer sk-1234'
```

Example Request (Specific Wildcard Model Group): (e.g. `model_name: openai/*` on config.yaml)

```shell
curl -X 'GET'     'http://localhost:4000/model_group/info?model_group=openai/tts-1'
-H 'accept: application/json'     -H 'Authorization: Bearersk-1234'
```

Learn how to use and set wildcard models [here](https://docs.hanzo.ai/docs/wildcard_routing)

Example Response:

```json
{
  "data": [
    {
      "model_group": "rerank-english-v3.0",
      "providers": ["cohere"],
      "max_input_tokens": null,
      "max_output_tokens": null,
      "input_cost_per_token": 0.0,
      "output_cost_per_token": 0.0,
      "mode": null,
      "tpm": null,
      "rpm": null,
      "supports_parallel_function_calling": false,
      "supports_vision": false,
      "supports_function_calling": false,
      "supported_openai_params": [
        "stream",
        "temperature",
        "max_tokens",
        "logit_bias",
        "top_p",
        "frequency_penalty",
        "presence_penalty",
        "stop",
        "n",
        "extra_headers"
      ]
    },
    {
      "model_group": "gpt-3.5-turbo",
      "providers": ["openai"],
      "max_input_tokens": 16385.0,
      "max_output_tokens": 4096.0,
      "input_cost_per_token": 1.5e-6,
      "output_cost_per_token": 2e-6,
      "mode": "chat",
      "tpm": null,
      "rpm": null,
      "supports_parallel_function_calling": false,
      "supports_vision": false,
      "supports_function_calling": true,
      "supported_openai_params": [
        "frequency_penalty",
        "logit_bias",
        "logprobs",
        "top_logprobs",
        "max_tokens",
        "max_completion_tokens",
        "n",
        "presence_penalty",
        "seed",
        "stop",
        "stream",
        "stream_options",
        "temperature",
        "top_p",
        "tools",
        "tool_choice",
        "function_call",
        "functions",
        "max_retries",
        "extra_headers",
        "parallel_tool_calls",
        "response_format"
      ]
    },
    {
      "model_group": "llava-hf",
      "providers": ["openai"],
      "max_input_tokens": null,
      "max_output_tokens": null,
      "input_cost_per_token": 0.0,
      "output_cost_per_token": 0.0,
      "mode": null,
      "tpm": null,
      "rpm": null,
      "supports_parallel_function_calling": false,
      "supports_vision": true,
      "supports_function_calling": false,
      "supported_openai_params": [
        "frequency_penalty",
        "logit_bias",
        "logprobs",
        "top_logprobs",
        "max_tokens",
        "max_completion_tokens",
        "n",
        "presence_penalty",
        "seed",
        "stop",
        "stream",
        "stream_options",
        "temperature",
        "top_p",
        "tools",
        "tool_choice",
        "function_call",
        "functions",
        "max_retries",
        "extra_headers",
        "parallel_tool_calls",
        "response_format"
      ]
    }
  ]
}
```

### Resource `routes`:

- `list_routes` (`read`): Get a list of available routes in the FastAPI application.

### Resource `responses`:

- `create_responses` (`write`): Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses

```bash
curl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d '{
    "model": "gpt-4o",
    "input": "Tell me about AI"
}'
```

- `retrieve_responses` (`read`): Get a response by ID.

Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/get

```bash
curl -X GET http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"
```

- `delete_responses` (`write`): Delete a response by ID.

Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/delete

```bash
curl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"
```

### Resource `responses.input_items`:

- `list_responses_input_items` (`read`): Get input items for a response.

Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/input-items

```bash
curl -X GET http://localhost:4000/v1/responses/resp_abc123/input_items     -H "Authorization: Bearer sk-1234"
```

### Resource `batches`:

- `create_batches` (`write`): Create large batches of API requests for asynchronous processing.
  This is the equivalent of POST https://api.openai.com/v1/batch
  Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch

Example Curl

```
curl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d '{
        "input_file_id": "file-abc123",
        "endpoint": "/v1/chat/completions",
        "completion_window": "24h"
}'
```

- `retrieve_batches` (`read`): Retrieves a batch.
  This is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}
  Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve

Example Curl

```
curl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
```

- `list_batches` (`read`): Lists
  This is the equivalent of GET https://api.openai.com/v1/batches/
  Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list

Example Curl

```
curl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
```

- `cancel_with_provider_batches` (`write`): Cancel a batch.
  This is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel

Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel

Example Curl

```
curl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST

```

- `create_with_provider_batches` (`write`): Create large batches of API requests for asynchronous processing.
  This is the equivalent of POST https://api.openai.com/v1/batch
  Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch

Example Curl

```
curl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d '{
        "input_file_id": "file-abc123",
        "endpoint": "/v1/chat/completions",
        "completion_window": "24h"
}'
```

- `list_with_provider_batches` (`read`): Lists
  This is the equivalent of GET https://api.openai.com/v1/batches/
  Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list

Example Curl

```
curl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
```

- `retrieve_with_provider_batches` (`read`): Retrieves a batch.
  This is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}
  Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve

Example Curl

```
curl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json"
```

### Resource `batches.cancel`:

- `cancel_batches_cancel` (`write`): Cancel a batch.
  This is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel

Supports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel

Example Curl

```
curl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST

```

### Resource `rerank`:

- `create_rerank` (`write`): Rerank
- `create_v1_rerank` (`write`): Rerank
- `create_v2_rerank` (`write`): Rerank

### Resource `fine_tuning.jobs`:

- `create_fine_tuning_jobs` (`write`): Creates a fine-tuning job which begins the process of creating a new model from a given dataset.
  This is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs

Supports Identical Params as: https://platform.openai.com/docs/api-reference/fine-tuning/create

Example Curl:

```
curl http://localhost:4000/v1/fine_tuning/jobs       -H "Content-Type: application/json"       -H "Authorization: Bearer sk-1234"       -d '{
    "model": "gpt-3.5-turbo",
    "training_file": "file-abc123",
    "hyperparameters": {
      "n_epochs": 4
    }
  }'
```

- `retrieve_fine_tuning_jobs` (`read`): Retrieves a fine-tuning job.
  This is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}

Supported Query Params:

- `custom_llm_provider`: Name of the LLM provider
- `fine_tuning_job_id`: The ID of the fine-tuning job to retrieve.

* `list_fine_tuning_jobs` (`read`): Lists fine-tuning jobs for the organization.
  This is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs

Supported Query Params:

- `custom_llm_provider`: Name of the LLM provider
- `after`: Identifier for the last job from the previous pagination request.
- `limit`: Number of fine-tuning jobs to retrieve (default is 20).

### Resource `fine_tuning.jobs.cancel`:

- `create_jobs_fine_tuning_cancel` (`write`): Cancel a fine-tuning job.

This is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel

Supported Query Params:

- `custom_llm_provider`: Name of the LLM provider
- `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.

### Resource `credentials`:

- `create_credentials` (`write`): [BETA] endpoint. This might change unexpectedly.
  Stores credential in DB.
  Reloads credentials in memory.
- `list_credentials` (`read`): [BETA] endpoint. This might change unexpectedly.
- `delete_credentials` (`write`): [BETA] endpoint. This might change unexpectedly.

### Resource `vertex_ai`:

- `create_vertex_ai` (`write`): Call LLM proxy via Vertex AI SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)

- `retrieve_vertex_ai` (`read`): Call LLM proxy via Vertex AI SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)

- `update_vertex_ai` (`write`): Call LLM proxy via Vertex AI SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)

- `delete_vertex_ai` (`write`): Call LLM proxy via Vertex AI SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)

- `patch_vertex_ai` (`write`): Call LLM proxy via Vertex AI SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)

### Resource `gemini`:

- `create_gemini` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)
- `retrieve_gemini` (`read`): [Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)
- `update_gemini` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)
- `delete_gemini` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)
- `patch_gemini` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)

### Resource `cohere`:

- `create_cohere` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/cohere)
- `retrieve_cohere` (`read`): [Docs](https://docs.hanzo.ai/docs/pass_through/cohere)
- `update_cohere` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/cohere)
- `delete_cohere` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/cohere)
- `modify_cohere` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/cohere)

### Resource `anthropic`:

- `create_anthropic` (`write`): [Docs](https://docs.hanzo.ai/docs/anthropic_completion)
- `retrieve_anthropic` (`read`): [Docs](https://docs.hanzo.ai/docs/anthropic_completion)
- `update_anthropic` (`write`): [Docs](https://docs.hanzo.ai/docs/anthropic_completion)
- `delete_anthropic` (`write`): [Docs](https://docs.hanzo.ai/docs/anthropic_completion)
- `modify_anthropic` (`write`): [Docs](https://docs.hanzo.ai/docs/anthropic_completion)

### Resource `bedrock`:

- `create_bedrock` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)
- `retrieve_bedrock` (`read`): [Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)
- `update_bedrock` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)
- `delete_bedrock` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)
- `patch_bedrock` (`write`): [Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)

### Resource `eu_assemblyai`:

- `create_eu_assemblyai` (`write`): Assemblyai Proxy Route
- `retrieve_eu_assemblyai` (`read`): Assemblyai Proxy Route
- `update_eu_assemblyai` (`write`): Assemblyai Proxy Route
- `delete_eu_assemblyai` (`write`): Assemblyai Proxy Route
- `patch_eu_assemblyai` (`write`): Assemblyai Proxy Route

### Resource `assemblyai`:

- `create_assemblyai` (`write`): Assemblyai Proxy Route
- `retrieve_assemblyai` (`read`): Assemblyai Proxy Route
- `update_assemblyai` (`write`): Assemblyai Proxy Route
- `delete_assemblyai` (`write`): Assemblyai Proxy Route
- `patch_assemblyai` (`write`): Assemblyai Proxy Route

### Resource `azure`:

- `create_azure` (`write`): Call any azure endpoint using the proxy.

Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`

- `update_azure` (`write`): Call any azure endpoint using the proxy.

Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`

- `delete_azure` (`write`): Call any azure endpoint using the proxy.

Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`

- `call_azure` (`read`): Call any azure endpoint using the proxy.

Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`

- `patch_azure` (`write`): Call any azure endpoint using the proxy.

Just use `{PROXY_BASE_URL}/azure/{endpoint:path}`

### Resource `langfuse`:

- `create_langfuse` (`write`): Call Langfuse via LLM proxy. Works with Langfuse SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)

- `retrieve_langfuse` (`read`): Call Langfuse via LLM proxy. Works with Langfuse SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)

- `update_langfuse` (`write`): Call Langfuse via LLM proxy. Works with Langfuse SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)

- `delete_langfuse` (`write`): Call Langfuse via LLM proxy. Works with Langfuse SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)

- `patch_langfuse` (`write`): Call Langfuse via LLM proxy. Works with Langfuse SDK.

[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)

### Resource `config.pass_through_endpoint`:

- `create_config_pass_through_endpoint` (`write`): Create new pass-through endpoint
- `update_config_pass_through_endpoint` (`write`): Update a pass-through endpoint
- `list_config_pass_through_endpoint` (`read`): GET configured pass through endpoint.

If no endpoint_id given, return all configured endpoints.

- `delete_config_pass_through_endpoint` (`write`): Delete a pass-through endpoint

Returns - the deleted endpoint

### Resource `test`:

- `ping_test` (`read`): [DEPRECATED] use `/health/liveliness` instead.

A test endpoint that pings the proxy server to check if it's healthy.

Parameters:
request (Request): The incoming request.

Returns:
dict: A dictionary containing the route of the request URL.

### Resource `health`:

- `check_all_health` (`read`): 🚨 USE `/health/liveliness` to health check the proxy 🚨

See more 👉 https://docs.hanzo.ai/docs/proxy/health

Check the health of all the endpoints in config.yaml

To run health checks in the background, add this to config.yaml:

```
general_settings:
    # ... other settings
    background_health_checks: True
```

else, the health checks will be run on models when /health is called.

- `check_liveliness_health` (`read`): Unprotected endpoint for checking if worker is alive
- `check_liveness_health` (`read`): Unprotected endpoint for checking if worker is alive
- `check_readiness_health` (`read`): Unprotected endpoint for checking if worker can receive requests
- `check_services_health` (`read`): Use this admin-only endpoint to check if the service is healthy.

Example:

```
curl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'
```

### Resource `active`:

- `list_callbacks_active` (`read`): Returns a list of llm level settings

This is useful for debugging and ensuring the proxy server is configured correctly.

Response schema:

```
{
    "alerting": _alerting,
    "llm.callbacks": llm_callbacks,
    "llm.input_callback": llm_input_callbacks,
    "llm.failure_callback": llm_failure_callbacks,
    "llm.success_callback": llm_success_callbacks,
    "llm._async_success_callback": llm_async_success_callbacks,
    "llm._async_failure_callback": llm_async_failure_callbacks,
    "llm._async_input_callback": llm_async_input_callbacks,
    "all_llm_callbacks": all_llm_callbacks,
    "num_callbacks": len(all_llm_callbacks),
    "num_alerting": _num_alerting,
    "llm.request_timeout": llm.request_timeout,
}
```

### Resource `settings`:

- `retrieve_settings` (`read`): Returns a list of llm level settings

This is useful for debugging and ensuring the proxy server is configured correctly.

Response schema:

```
{
    "alerting": _alerting,
    "llm.callbacks": llm_callbacks,
    "llm.input_callback": llm_input_callbacks,
    "llm.failure_callback": llm_failure_callbacks,
    "llm.success_callback": llm_success_callbacks,
    "llm._async_success_callback": llm_async_success_callbacks,
    "llm._async_failure_callback": llm_async_failure_callbacks,
    "llm._async_input_callback": llm_async_input_callbacks,
    "all_llm_callbacks": all_llm_callbacks,
    "num_callbacks": len(all_llm_callbacks),
    "num_alerting": _num_alerting,
    "llm.request_timeout": llm.request_timeout,
}
```

### Resource `key`:

- `update_key` (`write`): Update an existing API key's parameters.

Parameters:

- key: str - The key to update
- key_alias: Optional[str] - User-friendly key alias
- user_id: Optional[str] - User ID associated with key
- team_id: Optional[str] - Team ID associated with key
- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.
- models: Optional[list] - Model_name's a user is allowed to call
- tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)
- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)
- spend: Optional[float] - Amount spent by key
- max_budget: Optional[float] - Max budget for key
- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}
- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
- soft_budget: Optional[float] - [TODO] Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.
- max_parallel_requests: Optional[int] - Rate limit for parallel requests
- metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}
- tpm_limit: Optional[int] - Tokens per minute limit
- rpm_limit: Optional[int] - Requests per minute limit
- model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}
- model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}
- allowed_cache_controls: Optional[list] - List of allowed cache control values
- duration: Optional[str] - Key validity duration ("30d", "1h", etc.)
- permissions: Optional[dict] - Key-specific permissions
- send_invite_email: Optional[bool] - Send invite email to user_id
- guardrails: Optional[List[str]] - List of active guardrails for the key
- blocked: Optional[bool] - Whether the key is blocked
- aliases: Optional[dict] - Model aliases for the key - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)
- config: Optional[dict] - [DEPRECATED PARAM] Key-specific config.
- temp_budget_increase: Optional[float] - Temporary budget increase for the key (Enterprise only).
- temp_budget_expiry: Optional[str] - Expiry time for the temporary budget increase (Enterprise only).

Example:

```bash
curl --location 'http://0.0.0.0:4000/key/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
    "key": "sk-1234",
    "key_alias": "my-key",
    "user_id": "user-1234",
    "team_id": "team-1234",
    "max_budget": 100,
    "metadata": {"any_key": "any-val"},
}'
```

- `list_key` (`read`): List all keys for a given user / team / organization.

Returns:
{
"keys": List[str] or List[UserAPIKeyAuth],
"total_count": int,
"current_page": int,
"total_pages": int,
}

- `delete_key` (`write`): Delete a key from the key management system.

Parameters::

- keys (List[str]): A list of keys or hashed keys to delete. Example {"keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}
- key_aliases (List[str]): A list of key aliases to delete. Can be passed instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}

Returns:

- deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}

Example:

```bash
curl --location 'http://0.0.0.0:4000/key/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
    "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]
}'
```

Raises:
HTTPException: If an error occurs during key deletion.

- `block_key` (`write`): Block an Virtual key from making any requests.

Parameters:

- key: str - The key to block. Can be either the unhashed key (sk-...) or the hashed key value

Example:

```bash
curl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
    "key": "sk-Fn8Ej39NxjAXrvpUGKghGw"
}'
```

Note: This is an admin-only endpoint. Only proxy admins can block keys.

- `check_health_key` (`write`): Check the health of the key

Checks:

- If key based logging is configured correctly - sends a test log

Usage

Pass the key in the request header

```bash
curl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"
```

Response when logging callbacks are setup correctly:

```json
{
  "key": "healthy",
  "logging_callbacks": {
    "callbacks": ["gcs_bucket"],
    "status": "healthy",
    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to ['gcs_bucket']"
  }
}
```

Response when logging callbacks are not setup correctly:

```json
{
  "key": "unhealthy",
  "logging_callbacks": {
    "callbacks": ["gcs_bucket"],
    "status": "unhealthy",
    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."
  }
}
```

- `generate_key` (`write`): Generate an API key based on the provided data.

Docs: https://docs.hanzo.ai/docs/proxy/virtual_keys

Parameters:

- duration: Optional[str] - Specify the length of time the token is valid for. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").
- key_alias: Optional[str] - User defined key alias
- key: Optional[str] - User defined key value. If not set, a 16-digit unique sk-key is created for you.
- team_id: Optional[str] - The team id of the key
- user_id: Optional[str] - The user id of the key
- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.
- models: Optional[list] - Model_name's a user is allowed to call. (if empty, key is allowed to call all models)
- aliases: Optional[dict] - Any alias mappings, on top of anything in the config.yaml model list. - https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models
- config: Optional[dict] - any key-specific configs, overrides config in config.yaml
- spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by proxy whenever key is used. https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend
- send_invite_email: Optional[bool] - Whether to send an invite email to the user_id, with the generate key
- max_budget: Optional[float] - Specify max budget for a given key.
- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").
- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user's parallel requests > x.
- metadata: Optional[dict] - Metadata for key, store information for key. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }
- guardrails: Optional[List[str]] - List of active guardrails for the key
- permissions: Optional[dict] - key-specific permissions. Currently just used for turning off pii masking (if connected). Example - {"pii": false}
- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then no model specific budget.
- model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific rpm limit.
- model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific tpm limit.
- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request
- blocked: Optional[bool] - Whether the key is blocked.
- rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per minute)
- tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per minute)
- soft_budget: Optional[float] - Specify soft budget for a given key. Will trigger a slack alert when this soft budget is reached.
- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)

Examples:

1. Allow users to turn on/off pii masking

```bash
curl --location 'http://0.0.0.0:4000/key/generate'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{
        "permissions": {"allow_pii_controls": true}
}'
```

Returns:

- key: (str) The generated api key
- expires: (datetime) Datetime object for when key expires.
- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.

* `regenerate_by_key_key` (`write`): Regenerate an existing API key while optionally updating its parameters.

Parameters:

- key: str (path parameter) - The key to regenerate
- data: Optional[RegenerateKeyRequest] - Request body containing optional parameters to update
  - key_alias: Optional[str] - User-friendly key alias
  - user_id: Optional[str] - User ID associated with key
  - team_id: Optional[str] - Team ID associated with key
  - models: Optional[list] - Model_name's a user is allowed to call
  - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)
  - spend: Optional[float] - Amount spent by key
  - max_budget: Optional[float] - Max budget for key
  - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}
  - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
  - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.
  - max_parallel_requests: Optional[int] - Rate limit for parallel requests
  - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}
  - tpm_limit: Optional[int] - Tokens per minute limit
  - rpm_limit: Optional[int] - Requests per minute limit
  - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}
  - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}
  - allowed_cache_controls: Optional[list] - List of allowed cache control values
  - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)
  - permissions: Optional[dict] - Key-specific permissions
  - guardrails: Optional[List[str]] - List of active guardrails for the key
  - blocked: Optional[bool] - Whether the key is blocked

Returns:

- GenerateKeyResponse containing the new key and its updated parameters

Example:

```bash
curl --location --request POST 'http://localhost:4000/key/sk-1234/regenerate'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
    "max_budget": 100,
    "metadata": {"team": "core-infra"},
    "models": ["gpt-4", "gpt-3.5-turbo"]
}'
```

Note: This is an Enterprise feature. It requires a premium license to use.

- `retrieve_info_key` (`read`): Retrieve information about a key.
  Parameters:
  key: Optional[str] = Query parameter representing the key in the request
  user_api_key_dict: UserAPIKeyAuth = Dependency representing the user's API key
  Returns:
  Dict containing the key and its associated information

Example Curl:

```
curl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"
```

Example Curl - if no key is passed, it will use the Key Passed in Authorization Header

```
curl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"
```

- `unblock_key` (`write`): Unblock a Virtual key to allow it to make requests again.

Parameters:

- key: str - The key to unblock. Can be either the unhashed key (sk-...) or the hashed key value

Example:

```bash
curl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
    "key": "sk-Fn8Ej39NxjAXrvpUGKghGw"
}'
```

Note: This is an admin-only endpoint. Only proxy admins can unblock keys.

### Resource `user`:

- `create_user` (`write`): Use this to create a new INTERNAL user with a budget.
  Internal Users can access LLM Admin UI to make keys, request access to models.
  This creates a new user and generates a new api key for the new user. The new api key is returned.

Returns user id, budget + new key.

Parameters:

- user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.
- user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.
- teams: Optional[list] - specify a list of team id's a user belongs to.
- user_email: Optional[str] - Specify a user email.
- send_invite_email: Optional[bool] - Specify if an invite email should be sent.
- user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`
- max_budget: Optional[float] - Specify max budget for a given user.
- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").
- models: Optional[list] - Model_name's a user is allowed to call. (if empty, key is allowed to call all models). Set to ['no-default-models'] to block all model access. Restricting user to only team-based model access.
- tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)
- rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)
- auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response
- aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)
- config: Optional[dict] - [DEPRECATED PARAM] User-specific config.
- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request-
- blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.
- guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user
- permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.
- metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }
- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user's parallel requests > x.
- soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn't block requests.
- model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys)
- model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)
- model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)
- spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").
- team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None.
- duration: Optional[str] - Duration for the key auto-created on `/user/new`. Default is None.
- key_alias: Optional[str] - Alias for the key auto-created on `/user/new`. Default is None.

Returns:

- key: (str) The generated api key for the user
- expires: (datetime) Datetime object for when key expires.
- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.
- max_budget: (float|None) Max budget for given user.

Usage Example

```shell
 curl -X POST "http://localhost:4000/user/new"      -H "Content-Type: application/json"      -H "Authorization: Bearer sk-1234"      -d '{
     "username": "new_user",
     "email": "new_user@example.com"
 }'
```

- `update_user` (`write`): Example curl

```
curl --location 'http://0.0.0.0:4000/user/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
    "user_id": "test-llm-user-4",
    "user_role": "proxy_admin_viewer"
}'
```

Parameters: - user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated. - user_email: Optional[str] - Specify a user email. - password: Optional[str] - Specify a user password. - user_alias: Optional[str] - A descriptive name for you to know who this user id refers to. - teams: Optional[list] - specify a list of team id's a user belongs to. - send_invite_email: Optional[bool] - Specify if an invite email should be sent. - user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20` - max_budget: Optional[float] - Specify max budget for a given user. - budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo"). - models: Optional[list] - Model_name's a user is allowed to call. (if empty, key is allowed to call all models) - tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute) - rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute) - auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response - aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases) - config: Optional[dict] - [DEPRECATED PARAM] User-specific config. - allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request- - blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked. - guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user - permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking. - metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" } - max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user's parallel requests > x. - soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn't block requests. - model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys) - model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys) - model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys) - spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo"). - team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. - duration: Optional[str] - [NOT IMPLEMENTED]. - key_alias: Optional[str] - [NOT IMPLEMENTED].

- `list_user` (`read`): Get a paginated list of users, optionally filtered by role.

Used by the UI to populate the user lists.

Parameters:
role: Optional[str]
Filter users by role. Can be one of: - proxy_admin - proxy_admin_viewer - internal_user - internal_user_viewer
user_ids: Optional[str]
Get list of users by user_ids. Comma separated list of user_ids.
page: int
The page number to return
page_size: int
The number of items per page

Currently - admin-only endpoint.

Example curl:

```
http://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17
```

- `delete_user` (`write`): delete user and associated user keys

```
curl --location 'http://0.0.0.0:4000/user/delete'
--header 'Authorization: Bearer sk-1234'
--header 'Content-Type: application/json'
--data-raw '{
    "user_ids": ["45e3e396-ee08-4a61-a88e-16b3ce7e0849"]
}'
```

Parameters:

- user_ids: List[str] - The list of user id's to be deleted.

* `retrieve_info_user` (`read`): [10/07/2024]
  Note: To get all users (+pagination), use `/user/list` endpoint.

Use this to get user information. (user row + all user key info)

Example request

```
curl -X GET 'http://localhost:4000/user/info?user_id=dev7%40hanzo.ai'     --header 'Authorization: Bearer sk-1234'
```

### Resource `team`:

- `create_team` (`write`): Allow users to create a new team. Apply user permissions to their team.

👉 [Detailed Doc on setting team budgets](https://docs.hanzo.ai/docs/proxy/team_budgets)

Parameters:

- team_alias: Optional[str] - User defined team alias
- team_id: Optional[str] - The team id of the user. If none passed, we'll generate it.
- members_with_roles: List[{"role": "admin" or "user", "user_id": "<user-id>"}] - A list of users and their roles in the team. Get user_id when making a new user via `/user/new`.
- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"extra_info": "some info"}
- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit
- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit
- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget
- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)
- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.
- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.
- members: Optional[List] - Control team members via `/team/member/add` and `/team/member/delete`.
- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.
- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)
  Returns:
- team_id: (str) Unique team id - used for tracking spend across multiple keys for same team id.

\_deprecated_params:

- admins: list - A list of user_id's for the admin role
- users: list - A list of user_id's for the user role

Example Request:

```
curl --location 'http://0.0.0.0:4000/team/new'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
  "team_alias": "my-new-team_2",
  "members_with_roles": [{"role": "admin", "user_id": "user-1234"},
    {"role": "user", "user_id": "user-2434"}]
}'

```

```
curl --location 'http://0.0.0.0:4000/team/new'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{
           "team_alias": "QA Prod Bot",
           "max_budget": 0.000000001,
           "budget_duration": "1d"
       }'
```

- `update_team` (`write`): Use `/team/member_add` AND `/team/member/delete` to add/remove new team members

You can now update team budget / rate limits via /team/update

Parameters:

- team_id: str - The team id of the user. Required param.
- team_alias: Optional[str] - User defined team alias
- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }
- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit
- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit
- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget
- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)
- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.
- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.
- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.
- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)
- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)
  Example - update team TPM Limit

```
curl --location 'http://0.0.0.0:4000/team/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",
    "tpm_limit": 100
}'
```

Example - Update Team `max_budget` budget

```
curl --location 'http://0.0.0.0:4000/team/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{
    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",
    "max_budget": 10
}'
```

- `list_team` (`read`): ```
  curl --location --request GET 'http://0.0.0.0:4000/team/list' --header 'Authorization: Bearer sk-1234'

```

Parameters:
- user_id: str - Optional. If passed will only return teams that the user_id is a member of.
- organization_id: str - Optional. If passed will only return teams that belong to the organization_id. Pass 'default_organization' to get all teams without organization_id.
* `delete_team` (`write`): delete team and associated team keys

Parameters:
- team_ids: List[str] - Required. List of team IDs to delete. Example: ["team-1234", "team-5678"]

```

curl --location 'http://0.0.0.0:4000/team/delete' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data-raw '{
"team_ids": ["8d916b1c-510d-4894-a334-1c16a93344f5"]
}'

```
* `add_member_team` (`write`): [BETA]

Add new members (either via user_email or user_id) to a team

If user doesn't exist, new user row will also be added to User Table

Only proxy_admin or admin of team, allowed to access this endpoint.
```

curl -X POST 'http://0.0.0.0:4000/team/member_add' -H 'Authorization: Bearer sk-1234' -H 'Content-Type: application/json' -d '{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "dev247652@hanzo.ai"}}'

```
* `block_team` (`write`): Blocks all calls from keys with this team id.

Parameters:
- team_id: str - Required. The unique identifier of the team to block.

Example:
```

curl --location 'http://0.0.0.0:4000/team/block' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"team_id": "team-1234"
}'

```

Returns:
- The updated team record with blocked=True
* `disable_logging_team` (`write`): Disable all logging callbacks for a team

Parameters:
- team_id (str, required): The unique identifier for the team

Example curl:
```

curl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging' -H 'Authorization: Bearer sk-1234'

```
* `list_available_team` (`read`): List Available Teams
* `remove_member_team` (`write`): [BETA]

delete members (either via user_email or user_id) from a team

If user doesn't exist, an exception will be raised
```

curl -X POST 'http://0.0.0.0:8000/team/member_delete'
-H 'Authorization: Bearer sk-1234'
-H 'Content-Type: application/json'
-d '{
"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",
"user_id": "dev247652@hanzo.ai"
}'

```
* `retrieve_info_team` (`read`): get info on team + related keys

Parameters:
- team_id: str - Required. The unique identifier of the team to get info on.

```

curl --location 'http://localhost:4000/team/info?team_id=your_team_id_here' --header 'Authorization: Bearer your_api_key_here'

```
* `unblock_team` (`write`): Blocks all calls from keys with this team id.

Parameters:
- team_id: str - Required. The unique identifier of the team to unblock.

Example:
```

curl --location 'http://0.0.0.0:4000/team/unblock' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"team_id": "team-1234"
}'

```
* `update_member_team` (`write`): [BETA]

Update team member budgets and team member role

### Resource `team.model`:
* `add_team_model` (`write`): Add models to a team's allowed model list. Only proxy admin or team admin can add models.

Parameters:
- team_id: str - Required. The team to add models to
- models: List[str] - Required. List of models to add to the team

Example Request:
```

curl --location 'http://0.0.0.0:4000/team/model/add' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"team_id": "team-1234",
"models": ["gpt-4", "claude-2"]
}'

```
* `remove_team_model` (`write`): Remove models from a team's allowed model list. Only proxy admin or team admin can remove models.

Parameters:
- team_id: str - Required. The team to remove models from
- models: List[str] - Required. List of models to remove from the team

Example Request:
```

curl --location 'http://0.0.0.0:4000/team/model/delete' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"team_id": "team-1234",
"models": ["gpt-4"]
}'

```

### Resource `team.callback`:
* `retrieve_team_callback` (`read`): Get the success/failure callbacks and variables for a team

Parameters:
- team_id (str, required): The unique identifier for the team

Example curl:
```

curl -X GET 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback' -H 'Authorization: Bearer sk-1234'

```

This will return the callback settings for the team with id dbe2f686-a686-4896-864a-4c3924458709

Returns {
        "status": "success",
        "data": {
            "team_id": team_id,
            "success_callbacks": team_callback_settings_obj.success_callback,
            "failure_callbacks": team_callback_settings_obj.failure_callback,
            "callback_vars": team_callback_settings_obj.callback_vars,
        },
    }
* `add_team_callback` (`write`): Add a success/failure callback to a team

Use this if if you want different teams to have different success/failure callbacks

Parameters:
- callback_name (Literal["langfuse", "langsmith", "gcs"], required): The name of the callback to add
- callback_type (Literal["success", "failure", "success_and_failure"], required): The type of callback to add. One of:
    - "success": Callback for successful LLM calls
    - "failure": Callback for failed LLM calls
    - "success_and_failure": Callback for both successful and failed LLM calls
- callback_vars (StandardCallbackDynamicParams, required): A dictionary of variables to pass to the callback
    - langfuse_public_key: The public key for the Langfuse callback
    - langfuse_secret_key: The secret key for the Langfuse callback
    - langfuse_secret: The secret for the Langfuse callback
    - langfuse_host: The host for the Langfuse callback
    - gcs_bucket_name: The name of the GCS bucket
    - gcs_path_service_account: The path to the GCS service account
    - langsmith_api_key: The API key for the Langsmith callback
    - langsmith_project: The project for the Langsmith callback
    - langsmith_base_url: The base URL for the Langsmith callback

Example curl:
```

curl -X POST 'http:/localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback' -H 'Content-Type: application/json' -H 'Authorization: Bearer sk-1234' -d '{
"callback_name": "langfuse",
"callback_type": "success",
"callback_vars": {"langfuse_public_key": "pk-lf-xxxx1", "langfuse_secret_key": "sk-xxxxx"}

}'

````

This means for the team where team_id = dbe2f686-a686-4896-864a-4c3924458709, all LLM calls will be logged to langfuse using the public key pk-lf-xxxx1 and the secret key sk-xxxxx

### Resource `organization`:
* `create_organization` (`write`): Allow orgs to own teams

Set org level budgets + model access.

Only admins can create orgs.

# Parameters

- organization_alias: *str* - The name of the organization.
- models: *List* - The models the organization has access to.
- budget_id: *Optional[str]* - The id for a budget (tpm/rpm/max budget) for the organization.
### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS ###
- max_budget: *Optional[float]* - Max budget for org
- tpm_limit: *Optional[int]* - Max tpm limit for org
- rpm_limit: *Optional[int]* - Max rpm limit for org
- max_parallel_requests: *Optional[int]* - [Not Implemented Yet] Max parallel requests for org
- soft_budget: *Optional[float]* - [Not Implemented Yet] Get a slack alert when this soft budget is reached. Don't block requests.
- model_max_budget: *Optional[dict]* - Max budget for a specific model
- budget_duration: *Optional[str]* - Frequency of reseting org budget
- metadata: *Optional[dict]* - Metadata for organization, store information for organization. Example metadata - {"extra_info": "some info"}
- blocked: *bool* - Flag indicating if the org is blocked or not - will stop all calls from keys with this org_id.
- tags: *Optional[List[str]]* - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).
- organization_id: *Optional[str]* - The organization id of the team. Default is None. Create via `/organization/new`.
- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)

Case 1: Create new org **without** a budget_id

```bash
curl --location 'http://0.0.0.0:4000/organization/new'
--header 'Authorization: Bearer sk-1234'
--header 'Content-Type: application/json'
--data '{
    "organization_alias": "my-secret-org",
    "models": ["model1", "model2"],
    "max_budget": 100
}'


````

Case 2: Create new org **with** a budget_id

```bash
curl --location 'http://0.0.0.0:4000/organization/new'
--header 'Authorization: Bearer sk-1234'
--header 'Content-Type: application/json'
--data '{
    "organization_alias": "my-secret-org",
    "models": ["model1", "model2"],
    "budget_id": "428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689"
}'
```

- `update_organization` (`write`): Update an organization
- `list_organization` (`read`): ```
  curl --location --request GET 'http://0.0.0.0:4000/organization/list' --header 'Authorization: Bearer sk-1234'

```
* `delete_organization` (`write`): Delete an organization

# Parameters:

- organization_ids: List[str] - The organization ids to delete.
* `add_member_organization` (`write`): [BETA]

Add new members (either via user_email or user_id) to an organization

If user doesn't exist, new user row will also be added to User Table

Only proxy_admin or org_admin of organization, allowed to access this endpoint.

# Parameters:

- organization_id: str (required)
- member: Union[List[Member], Member] (required)
    - role: Literal[LLMUserRoles] (required)
    - user_id: Optional[str]
    - user_email: Optional[str]

Note: Either user_id or user_email must be provided for each member.

Example:
```

curl -X POST 'http://0.0.0.0:4000/organization/member_add' -H 'Authorization: Bearer sk-1234' -H 'Content-Type: application/json' -d '{
"organization_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",
"member": {
"role": "internal_user",
"user_id": "dev247652@hanzo.ai"
},
"max_budget_in_organization": 100.0
}'

```

The following is executed in this function:

1. Check if organization exists
2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable
3. Add Internal User to the `LLM_OrganizationMembership` table
* `delete_member_organization` (`write`): Delete a member from an organization
* `update_member_organization` (`write`): Update a member's role in an organization

### Resource `organization.info`:
* `retrieve_organization_info` (`read`): Get the org specific information
* `deprecated_organization_info` (`write`): DEPRECATED: Use GET /organization/info instead

### Resource `customer`:
* `create_customer` (`write`): Allow creating a new Customer


Parameters:
- user_id: str - The unique identifier for the user.
- alias: Optional[str] - A human-friendly alias for the user.
- blocked: bool - Flag to allow or disallow requests for this end-user. Default is False.
- max_budget: Optional[float] - The maximum budget allocated to the user. Either 'max_budget' or 'budget_id' should be provided, not both.
- budget_id: Optional[str] - The identifier for an existing budget allocated to the user. Either 'max_budget' or 'budget_id' should be provided, not both.
- allowed_model_region: Optional[Union[Literal["eu"], Literal["us"]]] - Require all user requests to use models in this specific region.
- default_model: Optional[str] - If no equivalent model in the allowed region, default all requests to this model.
- metadata: Optional[dict] = Metadata for customer, store information for customer. Example metadata = {"data_training_opt_out": True}
- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").
- tpm_limit: Optional[int] - [Not Implemented Yet] Specify tpm limit for a given customer (Tokens per minute)
- rpm_limit: Optional[int] - [Not Implemented Yet] Specify rpm limit for a given customer (Requests per minute)
- model_max_budget: Optional[dict] - [Not Implemented Yet] Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d"}}
- max_parallel_requests: Optional[int] - [Not Implemented Yet] Specify max parallel requests for a given customer.
- soft_budget: Optional[float] - [Not Implemented Yet] Get alerts when customer crosses given budget, doesn't block requests.


- Allow specifying allowed regions
- Allow specifying default model

Example curl:
```

curl --location 'http://0.0.0.0:4000/customer/new' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"user_id" : "z-jaff-3",
"allowed_region": "eu",
"budget_id": "free_tier",
"default_model": "azure/gpt-3.5-turbo-eu" <- all calls from this user, use this model?
}'

    # return end-user object

```

NOTE: This used to be called `/end_user/new`, we will still be maintaining compatibility for /end_user/XXX for these endpoints
* `update_customer` (`write`): Example curl

Parameters:
- user_id: str
- alias: Optional[str] = None  # human-friendly alias
- blocked: bool = False  # allow/disallow requests for this end-user
- max_budget: Optional[float] = None
- budget_id: Optional[str] = None  # give either a budget_id or max_budget
- allowed_model_region: Optional[AllowedModelRegion] = (
    None  # require all user requests to use models in this specific region
)
- default_model: Optional[str] = (
    None  # if no equivalent model in allowed region - default all requests to this model
)

Example curl:
```

curl --location 'http://0.0.0.0:4000/customer/update' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"user_id": "test-llm-user-4",
"budget_id": "paid_tier"
}'

See below for all params

```
* `list_customer` (`read`): [Admin-only] List all available customers

Example curl:
```

curl --location --request GET 'http://0.0.0.0:4000/customer/list' --header 'Authorization: Bearer sk-1234'

```
* `delete_customer` (`write`): Delete multiple end-users.

Parameters:
- user_ids (List[str], required): The unique `user_id`s for the users to delete

Example curl:
```

curl --location 'http://0.0.0.0:4000/customer/delete' --header 'Authorization: Bearer sk-1234' --header 'Content-Type: application/json' --data '{
"user_ids" :["z-jaff-5"]
}'

See below for all params

````
* `block_customer` (`write`): [BETA] Reject calls with this end-user id

Parameters:
- user_ids (List[str], required): The unique `user_id`s for the users to block

    (any /chat/completion call with this user={end-user-id} param, will be rejected.)

    ```
    curl -X POST "http://0.0.0.0:8000/user/block"
    -H "Authorization: Bearer sk-1234"
    -d '{
    "user_ids": [<user_id>, ...]
    }'
    ```
* `retrieve_info_customer` (`read`): Get information about an end-user. An `end_user` is a customer (external user) of the proxy.

Parameters:
- end_user_id (str, required): The unique identifier for the end-user

Example curl:
````

curl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4' -H 'Authorization: Bearer sk-1234'

```
* `unblock_customer` (`write`): [BETA] Unblock calls with this user id

Example
```

curl -X POST "http://0.0.0.0:8000/user/unblock"
-H "Authorization: Bearer sk-1234"
-d '{
"user_ids": [<user_id>, ...]
}'

```

### Resource `spend`:
* `calculate_spend_spend` (`write`): Accepts all the params of completion_cost.

Calculate spend **before** making call:

Note: If you see a spend of $0.0 you need to set custom_pricing for your model: https://docs.hanzo.ai/docs/proxy/custom_pricing

```

curl --location 'http://localhost:4000/spend/calculate'
--header 'Authorization: Bearer sk-1234'
--header 'Content-Type: application/json'
--data '{
"model": "anthropic.claude-v2",
"messages": [{"role": "user", "content": "Hey, how'''s it going?"}]
}'

```

Calculate spend **after** making call:

```

curl --location 'http://localhost:4000/spend/calculate'
--header 'Authorization: Bearer sk-1234'
--header 'Content-Type: application/json'
--data '{
"completion_response": {
"id": "chatcmpl-123",
"object": "chat.completion",
"created": 1677652288,
"model": "gpt-3.5-turbo-0125",
"system_fingerprint": "fp_44709d6fcb",
"choices": [{
"index": 0,
"message": {
"role": "assistant",
"content": "Hello there, how may I assist you today?"
},
"logprobs": null,
"finish_reason": "stop"
}]
"usage": {
"prompt_tokens": 9,
"completion_tokens": 12,
"total_tokens": 21
}
}
}'

```
* `list_logs_spend` (`read`): View all spend logs, if request_id is provided, only logs for that request_id will be returned

Example Request for all logs
```

curl -X GET "http://0.0.0.0:8000/spend/logs" -H "Authorization: Bearer sk-1234"

```

Example Request for specific request_id
```

curl -X GET "http://0.0.0.0:8000/spend/logs?request_id=chatcmpl-6dcb2540-d3d7-4e49-bb27-291f863f112e" -H "Authorization: Bearer sk-1234"

```

Example Request for specific api_key
```

curl -X GET "http://0.0.0.0:8000/spend/logs?api_key=sk-Fn8Ej39NkBQmUagFEoUWPQ" -H "Authorization: Bearer sk-1234"

```

Example Request for specific user_id
```

curl -X GET "http://0.0.0.0:8000/spend/logs?user_id=z@hanzo.ai" -H "Authorization: Bearer sk-1234"

```
* `list_tags_spend` (`read`): LLM Enterprise - View Spend Per Request Tag

Example Request:
```

curl -X GET "http://0.0.0.0:8000/spend/tags" -H "Authorization: Bearer sk-1234"

```

Spend with Start Date and End Date
```

curl -X GET "http://0.0.0.0:8000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"

```

### Resource `global.spend`:
* `list_tags_global_spend` (`read`): LLM Enterprise - View Spend Per Request Tag. Used by LLM UI

Example Request:
```

curl -X GET "http://0.0.0.0:4000/spend/tags" -H "Authorization: Bearer sk-1234"

```

Spend with Start Date and End Date
```

curl -X GET "http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"

````
* `reset_global_spend` (`write`): ADMIN ONLY / MASTER KEY Only Endpoint

Globally reset spend for All API Keys and Teams, maintain LLM_SpendLogs

1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there
2. LLM_VerificationTokens spend will be set = 0
3. LLM_TeamTable spend will be set = 0
* `retrieve_report_global_spend` (`read`): Get Daily Spend per Team, based on specific startTime and endTime. Per team, view usage by each key, model
[
    {
        "group-by-day": "2024-05-10",
        "teams": [
            {
                "team_name": "team-1"
                "spend": 10,
                "keys": [
                    "key": "1213",
                    "usage": {
                        "model-1": {
                                "cost": 12.50,
                                "input_tokens": 1000,
                                "output_tokens": 5000,
                                "requests": 100
                            },
                            "audio-modelname1": {
                            "cost": 25.50,
                            "seconds": 25,
                            "requests": 50
                    },
                    }
                }
        ]
    ]
}

### Resource `provider`:
* `list_budgets_provider` (`read`): Provider Budget Routing - Get Budget, Spend Details https://docs.hanzo.ai/docs/proxy/provider_budget_routing

Use this endpoint to check current budget, spend and budget reset time for a provider

Example Request

```bash
curl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"
````

Example Response

```json
{
  "providers": {
    "openai": {
      "budget_limit": 1e-12,
      "time_period": "1d",
      "spend": 0.0,
      "budget_reset_at": null
    },
    "azure": {
      "budget_limit": 100.0,
      "time_period": "1d",
      "spend": 0.0,
      "budget_reset_at": null
    },
    "anthropic": {
      "budget_limit": 100.0,
      "time_period": "10d",
      "spend": 0.0,
      "budget_reset_at": null
    },
    "vertex_ai": {
      "budget_limit": 100.0,
      "time_period": "12d",
      "spend": 0.0,
      "budget_reset_at": null
    }
  }
}
```

### Resource `cache`:

- `delete_cache` (`write`): Endpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers

Parameters:

- **keys**: _Optional[List[str]]_ - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}

```shell
curl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d '{"keys": ["key1", "key2"]}'
```

- `flush_all_cache` (`write`): A function to flush all items from the cache. (All items will be deleted from the cache with this)
  Raises HTTPException if the cache is not initialized or if the cache type does not support flushing.
  Returns a dictionary with the status of the operation.

Usage:

```
curl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"
```

- `ping_cache` (`read`): Endpoint for checking if cache can be pinged

### Resource `cache.redis`:

- `retrieve_info_cache_redis` (`read`): Endpoint for getting /redis/info

### Resource `guardrails`:

- `list_guardrails` (`read`): List the guardrails that are available on the proxy server

👉 [Guardrail docs](https://docs.hanzo.ai/docs/proxy/guardrails/quick_start)

Example Request:

```bash
curl -X GET "http://localhost:4000/guardrails/list" -H "Authorization: Bearer <your_api_key>"
```

Example Response:

```json
{
  "guardrails": [
    {
      "guardrail_name": "bedrock-pre-guard",
      "guardrail_info": {
        "params": [
          {
            "name": "toxicity_score",
            "type": "float",
            "description": "Score between 0-1 indicating content toxicity level"
          },
          {
            "name": "pii_detection",
            "type": "boolean"
          }
        ]
      }
    }
  ]
}
```

### Resource `add`:

- `add_allowed_ip_add` (`write`): Add Allowed Ip

### Resource `delete`:

- `create_allowed_ip_delete` (`write`): Delete Allowed Ip

### Resource `files`:

- `create_files` (`write`): Upload a file that can be used across - Assistants API, Batch API
  This is the equivalent of POST https://api.openai.com/v1/files

Supports Identical Params as: https://platform.openai.com/docs/api-reference/files/create

Example Curl

```
curl http://localhost:4000/v1/files         -H "Authorization: Bearer sk-1234"         -F purpose="batch"         -F file="@mydata.jsonl"

```

- `retrieve_files` (`read`): Returns information about a specific file. that can be used across - Assistants API, Batch API
  This is the equivalent of GET https://api.openai.com/v1/files/{file_id}

Supports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve

Example Curl

```
curl http://localhost:4000/v1/files/file-abc123         -H "Authorization: Bearer sk-1234"

```

- `list_files` (`read`): Returns information about a specific file. that can be used across - Assistants API, Batch API
  This is the equivalent of GET https://api.openai.com/v1/files/

Supports Identical Params as: https://platform.openai.com/docs/api-reference/files/list

Example Curl

```
curl http://localhost:4000/v1/files        -H "Authorization: Bearer sk-1234"

```

- `delete_files` (`write`): Deletes a specified file. that can be used across - Assistants API, Batch API
  This is the equivalent of DELETE https://api.openai.com/v1/files/{file_id}

Supports Identical Params as: https://platform.openai.com/docs/api-reference/files/delete

Example Curl

```
curl http://localhost:4000/v1/files/file-abc123     -X DELETE     -H "Authorization: Bearer $OPENAI_API_KEY"

```

### Resource `files.content`:

- `retrieve_files_content` (`read`): Returns information about a specific file. that can be used across - Assistants API, Batch API
  This is the equivalent of GET https://api.openai.com/v1/files/{file_id}/content

Supports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve-contents

Example Curl

```
curl http://localhost:4000/v1/files/file-abc123/content         -H "Authorization: Bearer sk-1234"

```

### Resource `budget`:

- `create_budget` (`write`): Create a new budget object. Can apply this to teams, orgs, end-users, keys.

Parameters:

- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.
- max_budget: Optional[float] - The max budget for the budget.
- soft_budget: Optional[float] - The soft budget for the budget.
- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.
- tpm_limit: Optional[int] - The tokens per minute limit for the budget.
- rpm_limit: Optional[int] - The requests per minute limit for the budget.
- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}

* `update_budget` (`write`): Update an existing budget object.

Parameters:

- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)
- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.
- max_budget: Optional[float] - The max budget for the budget.
- soft_budget: Optional[float] - The soft budget for the budget.
- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.
- tpm_limit: Optional[int] - The tokens per minute limit for the budget.
- rpm_limit: Optional[int] - The requests per minute limit for the budget.
- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}

* `list_budget` (`read`): List all the created budgets in proxy db. Used on Admin UI.
* `delete_budget` (`write`): Delete budget

Parameters:

- id: str - The budget id to delete

* `info_budget` (`write`): Get the budget id specific information

Parameters:

- budgets: List[str] - The list of budget ids to get information for

* `settings_budget` (`read`): Get list of configurable params + current value for a budget item + description of each field

Used on Admin UI.

Query Parameters:

- budget_id: str - The budget id to get information for
