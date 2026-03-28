// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'get_home',
    endpoint: '/',
    httpMethod: 'get',
    summary: 'Home',
    description: 'Home',
    stainlessPath: '(resource) $client > (method) get_home',
    qualified: 'client.getHome',
    response: 'object',
    markdown:
      "## get_home\n\n`client.getHome(): object`\n\n**get** `/`\n\nHome\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.getHome();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/models',
    httpMethod: 'get',
    summary: 'Model List',
    description:
      'Use `/model/info` - to get detailed model information, example - pricing, mode, etc.\n\nThis is just for compatibility with openai projects like aider.',
    stainlessPath: '(resource) models > (method) list',
    qualified: 'client.models.list',
    params: ['return_wildcard_routes?: boolean;', 'team_id?: string;'],
    response: 'object',
    markdown:
      "## list\n\n`client.models.list(return_wildcard_routes?: boolean, team_id?: string): object`\n\n**get** `/v1/models`\n\nUse `/model/info` - to get detailed model information, example - pricing, mode, etc.\n\nThis is just for compatibility with openai projects like aider.\n\n### Parameters\n\n- `return_wildcard_routes?: boolean`\n\n- `team_id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst models = await client.models.list();\n\nconsole.log(models);\n```",
  },
  {
    name: 'create',
    endpoint: '/openai/{endpoint}',
    httpMethod: 'post',
    summary: 'Openai Proxy Route',
    description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
    stainlessPath: '(resource) openai > (method) create',
    qualified: 'client.openai.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.openai.create(endpoint: string): object`\n\n**post** `/openai/{endpoint}`\n\nSimple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst openai = await client.openai.create('endpoint');\n\nconsole.log(openai);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/openai/{endpoint}',
    httpMethod: 'get',
    summary: 'Openai Proxy Route',
    description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
    stainlessPath: '(resource) openai > (method) retrieve',
    qualified: 'client.openai.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.openai.retrieve(endpoint: string): object`\n\n**get** `/openai/{endpoint}`\n\nSimple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst openai = await client.openai.retrieve('endpoint');\n\nconsole.log(openai);\n```",
  },
  {
    name: 'update',
    endpoint: '/openai/{endpoint}',
    httpMethod: 'put',
    summary: 'Openai Proxy Route',
    description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
    stainlessPath: '(resource) openai > (method) update',
    qualified: 'client.openai.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.openai.update(endpoint: string): object`\n\n**put** `/openai/{endpoint}`\n\nSimple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst openai = await client.openai.update('endpoint');\n\nconsole.log(openai);\n```",
  },
  {
    name: 'delete',
    endpoint: '/openai/{endpoint}',
    httpMethod: 'delete',
    summary: 'Openai Proxy Route',
    description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
    stainlessPath: '(resource) openai > (method) delete',
    qualified: 'client.openai.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.openai.delete(endpoint: string): object`\n\n**delete** `/openai/{endpoint}`\n\nSimple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst openai = await client.openai.delete('endpoint');\n\nconsole.log(openai);\n```",
  },
  {
    name: 'patch',
    endpoint: '/openai/{endpoint}',
    httpMethod: 'patch',
    summary: 'Openai Proxy Route',
    description: 'Simple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.',
    stainlessPath: '(resource) openai > (method) patch',
    qualified: 'client.openai.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.openai.patch(endpoint: string): object`\n\n**patch** `/openai/{endpoint}`\n\nSimple pass-through for OpenAI. Use this if you want to directly send a request to OpenAI.\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.openai.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'complete',
    endpoint: '/openai/deployments/{model}/completions',
    httpMethod: 'post',
    summary: 'Completion',
    description:
      'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
    stainlessPath: '(resource) openai.deployments > (method) complete',
    qualified: 'client.openai.deployments.complete',
    params: ['model: string;'],
    response: 'object',
    markdown:
      '## complete\n\n`client.openai.deployments.complete(model: string): object`\n\n**post** `/openai/deployments/{model}/completions`\n\nFollows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.openai.deployments.complete(\'model\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'embed',
    endpoint: '/openai/deployments/{model}/embeddings',
    httpMethod: 'post',
    summary: 'Embeddings',
    description:
      'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
    stainlessPath: '(resource) openai.deployments > (method) embed',
    qualified: 'client.openai.deployments.embed',
    params: ['model: string;'],
    response: 'object',
    markdown:
      '## embed\n\n`client.openai.deployments.embed(model: string): object`\n\n**post** `/openai/deployments/{model}/embeddings`\n\nFollows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.openai.deployments.embed(\'model\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'complete',
    endpoint: '/openai/deployments/{model}/chat/completions',
    httpMethod: 'post',
    summary: 'Chat Completion',
    description:
      'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
    stainlessPath: '(resource) openai.deployments.chat > (method) complete',
    qualified: 'client.openai.deployments.chat.complete',
    params: ['model: string;'],
    response: 'object',
    markdown:
      '## complete\n\n`client.openai.deployments.chat.complete(model: string): object`\n\n**post** `/openai/deployments/{model}/chat/completions`\n\nFollows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.openai.deployments.chat.complete(\'model\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'complete',
    endpoint: '/engines/{model}/completions',
    httpMethod: 'post',
    summary: 'Completion',
    description:
      'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
    stainlessPath: '(resource) engines > (method) complete',
    qualified: 'client.engines.complete',
    params: ['model: string;'],
    response: 'object',
    markdown:
      '## complete\n\n`client.engines.complete(model: string): object`\n\n**post** `/engines/{model}/completions`\n\nFollows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.engines.complete(\'model\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'embed',
    endpoint: '/engines/{model}/embeddings',
    httpMethod: 'post',
    summary: 'Embeddings',
    description:
      'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
    stainlessPath: '(resource) engines > (method) embed',
    qualified: 'client.engines.embed',
    params: ['model: string;'],
    response: 'object',
    markdown:
      '## embed\n\n`client.engines.embed(model: string): object`\n\n**post** `/engines/{model}/embeddings`\n\nFollows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.engines.embed(\'model\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'complete',
    endpoint: '/engines/{model}/chat/completions',
    httpMethod: 'post',
    summary: 'Chat Completion',
    description:
      'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
    stainlessPath: '(resource) engines.chat > (method) complete',
    qualified: 'client.engines.chat.complete',
    params: ['model: string;'],
    response: 'object',
    markdown:
      '## complete\n\n`client.engines.chat.complete(model: string): object`\n\n**post** `/engines/{model}/chat/completions`\n\nFollows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.engines.chat.complete(\'model\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'create',
    endpoint: '/v1/chat/completions',
    httpMethod: 'post',
    summary: 'Chat Completion',
    description:
      'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
    stainlessPath: '(resource) chat.completions > (method) create',
    qualified: 'client.chat.completions.create',
    params: ['model?: string;'],
    response: 'object',
    markdown:
      '## create\n\n`client.chat.completions.create(model?: string): object`\n\n**post** `/v1/chat/completions`\n\nFollows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```\n\n### Parameters\n\n- `model?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst completion = await client.chat.completions.create();\n\nconsole.log(completion);\n```',
  },
  {
    name: 'create',
    endpoint: '/completions',
    httpMethod: 'post',
    summary: 'Completion',
    description:
      'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
    stainlessPath: '(resource) completions > (method) create',
    qualified: 'client.completions.create',
    params: ['model?: string;'],
    response: 'object',
    markdown:
      '## create\n\n`client.completions.create(model?: string): object`\n\n**post** `/completions`\n\nFollows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```\n\n### Parameters\n\n- `model?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst completion = await client.completions.create();\n\nconsole.log(completion);\n```',
  },
  {
    name: 'create',
    endpoint: '/embeddings',
    httpMethod: 'post',
    summary: 'Embeddings',
    description:
      'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
    stainlessPath: '(resource) embeddings > (method) create',
    qualified: 'client.embeddings.create',
    params: ['model?: string;'],
    response: 'object',
    markdown:
      '## create\n\n`client.embeddings.create(model?: string): object`\n\n**post** `/embeddings`\n\nFollows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```\n\n### Parameters\n\n- `model?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst embedding = await client.embeddings.create();\n\nconsole.log(embedding);\n```',
  },
  {
    name: 'create',
    endpoint: '/v1/images/generations',
    httpMethod: 'post',
    summary: 'Image Generation',
    description: 'Image Generation',
    stainlessPath: '(resource) images.generations > (method) create',
    qualified: 'client.images.generations.create',
    response: 'object',
    markdown:
      "## create\n\n`client.images.generations.create(): object`\n\n**post** `/v1/images/generations`\n\nImage Generation\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst generation = await client.images.generations.create();\n\nconsole.log(generation);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/audio/speech',
    httpMethod: 'post',
    summary: 'Audio Speech',
    description: 'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createSpeech',
    stainlessPath: '(resource) audio.speech > (method) create',
    qualified: 'client.audio.speech.create',
    response: 'object',
    markdown:
      "## create\n\n`client.audio.speech.create(): object`\n\n**post** `/v1/audio/speech`\n\nSame params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createSpeech\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst speech = await client.audio.speech.create();\n\nconsole.log(speech);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/audio/transcriptions',
    httpMethod: 'post',
    summary: 'Audio Transcriptions',
    description:
      'Same params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createTranscription?lang=curl',
    stainlessPath: '(resource) audio.transcriptions > (method) create',
    qualified: 'client.audio.transcriptions.create',
    params: ['file: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.audio.transcriptions.create(file: string): object`\n\n**post** `/v1/audio/transcriptions`\n\nSame params as:\n\nhttps://platform.openai.com/docs/api-reference/audio/createTranscription?lang=curl\n\n### Parameters\n\n- `file: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst transcription = await client.audio.transcriptions.create({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(transcription);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/assistants',
    httpMethod: 'post',
    summary: 'Create Assistant',
    description:
      'Create assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
    stainlessPath: '(resource) assistants > (method) create',
    qualified: 'client.assistants.create',
    response: 'object',
    markdown:
      "## create\n\n`client.assistants.create(): object`\n\n**post** `/v1/assistants`\n\nCreate assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assistant = await client.assistants.create();\n\nconsole.log(assistant);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/assistants',
    httpMethod: 'get',
    summary: 'Get Assistants',
    description:
      'Returns a list of assistants.\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants',
    stainlessPath: '(resource) assistants > (method) list',
    qualified: 'client.assistants.list',
    response: 'object',
    markdown:
      "## list\n\n`client.assistants.list(): object`\n\n**get** `/v1/assistants`\n\nReturns a list of assistants.\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assistants = await client.assistants.list();\n\nconsole.log(assistants);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/assistants/{assistant_id}',
    httpMethod: 'delete',
    summary: 'Delete Assistant',
    description:
      'Delete assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
    stainlessPath: '(resource) assistants > (method) delete',
    qualified: 'client.assistants.delete',
    params: ['assistant_id: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.assistants.delete(assistant_id: string): object`\n\n**delete** `/v1/assistants/{assistant_id}`\n\nDelete assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant\n\n### Parameters\n\n- `assistant_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assistant = await client.assistants.delete('assistant_id');\n\nconsole.log(assistant);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/threads',
    httpMethod: 'post',
    summary: 'Create Threads',
    description:
      'Create a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/createThread',
    stainlessPath: '(resource) threads > (method) create',
    qualified: 'client.threads.create',
    response: 'object',
    markdown:
      "## create\n\n`client.threads.create(): object`\n\n**post** `/v1/threads`\n\nCreate a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/createThread\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst thread = await client.threads.create();\n\nconsole.log(thread);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/threads/{thread_id}',
    httpMethod: 'get',
    summary: 'Get Thread',
    description:
      'Retrieves a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/getThread',
    stainlessPath: '(resource) threads > (method) retrieve',
    qualified: 'client.threads.retrieve',
    params: ['thread_id: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.threads.retrieve(thread_id: string): object`\n\n**get** `/v1/threads/{thread_id}`\n\nRetrieves a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/getThread\n\n### Parameters\n\n- `thread_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst thread = await client.threads.retrieve('thread_id');\n\nconsole.log(thread);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/threads/{thread_id}/messages',
    httpMethod: 'post',
    summary: 'Add Messages',
    description:
      'Create a message.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/createMessage',
    stainlessPath: '(resource) threads.messages > (method) create',
    qualified: 'client.threads.messages.create',
    params: ['thread_id: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.threads.messages.create(thread_id: string): object`\n\n**post** `/v1/threads/{thread_id}/messages`\n\nCreate a message.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/createMessage\n\n### Parameters\n\n- `thread_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst message = await client.threads.messages.create('thread_id');\n\nconsole.log(message);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/threads/{thread_id}/messages',
    httpMethod: 'get',
    summary: 'Get Messages',
    description:
      'Returns a list of messages for a given thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/listMessages',
    stainlessPath: '(resource) threads.messages > (method) list',
    qualified: 'client.threads.messages.list',
    params: ['thread_id: string;'],
    response: 'object',
    markdown:
      "## list\n\n`client.threads.messages.list(thread_id: string): object`\n\n**get** `/v1/threads/{thread_id}/messages`\n\nReturns a list of messages for a given thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/listMessages\n\n### Parameters\n\n- `thread_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst messages = await client.threads.messages.list('thread_id');\n\nconsole.log(messages);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/threads/{thread_id}/runs',
    httpMethod: 'post',
    summary: 'Run Thread',
    description:
      'Create a run.\n\nAPI Reference: https://platform.openai.com/docs/api-reference/runs/createRun',
    stainlessPath: '(resource) threads.runs > (method) create',
    qualified: 'client.threads.runs.create',
    params: ['thread_id: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.threads.runs.create(thread_id: string): object`\n\n**post** `/v1/threads/{thread_id}/runs`\n\nCreate a run.\n\nAPI Reference: https://platform.openai.com/docs/api-reference/runs/createRun\n\n### Parameters\n\n- `thread_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst run = await client.threads.runs.create('thread_id');\n\nconsole.log(run);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/moderations',
    httpMethod: 'post',
    summary: 'Moderations',
    description:
      'The moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.\n\nQuick Start\n```\ncurl --location \'http://0.0.0.0:4000/moderations\'     --header \'Content-Type: application/json\'     --header \'Authorization: Bearer sk-1234\'     --data \'{"input": "Sample text goes here", "model": "text-moderation-stable"}\'\n```',
    stainlessPath: '(resource) moderations > (method) create',
    qualified: 'client.moderations.create',
    response: 'object',
    markdown:
      "## create\n\n`client.moderations.create(): object`\n\n**post** `/v1/moderations`\n\nThe moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.\n\nQuick Start\n```\ncurl --location 'http://0.0.0.0:4000/moderations'     --header 'Content-Type: application/json'     --header 'Authorization: Bearer sk-1234'     --data '{\"input\": \"Sample text goes here\", \"model\": \"text-moderation-stable\"}'\n```\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst moderation = await client.moderations.create();\n\nconsole.log(moderation);\n```",
  },
  {
    name: 'get_supported_openai_params',
    endpoint: '/utils/supported_openai_params',
    httpMethod: 'get',
    summary: 'Supported Openai Params',
    description:
      "Returns supported openai params for a given llm model name\n\ne.g. `gpt-4` vs `gpt-3.5-turbo`\n\nExample curl:\n```\ncurl -X GET --location 'http://localhost:4000/utils/supported_openai_params?model=gpt-3.5-turbo-16k'         --header 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) utils > (method) get_supported_openai_params',
    qualified: 'client.utils.getSupportedOpenAIParams',
    params: ['model: string;'],
    response: 'object',
    markdown:
      "## get_supported_openai_params\n\n`client.utils.getSupportedOpenAIParams(model: string): object`\n\n**get** `/utils/supported_openai_params`\n\nReturns supported openai params for a given llm model name\n\ne.g. `gpt-4` vs `gpt-3.5-turbo`\n\nExample curl:\n```\ncurl -X GET --location 'http://localhost:4000/utils/supported_openai_params?model=gpt-3.5-turbo-16k'         --header 'Authorization: Bearer sk-1234'\n```\n\n### Parameters\n\n- `model: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.utils.getSupportedOpenAIParams({ model: 'model' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'token_counter',
    endpoint: '/utils/token_counter',
    httpMethod: 'post',
    summary: 'Token Counter',
    description: 'Token Counter',
    stainlessPath: '(resource) utils > (method) token_counter',
    qualified: 'client.utils.tokenCounter',
    params: ['model: string;', 'messages?: object[];', 'prompt?: string;'],
    response: '{ model_used: string; request_model: string; tokenizer_type: string; total_tokens: number; }',
    markdown:
      "## token_counter\n\n`client.utils.tokenCounter(model: string, messages?: object[], prompt?: string): { model_used: string; request_model: string; tokenizer_type: string; total_tokens: number; }`\n\n**post** `/utils/token_counter`\n\nToken Counter\n\n### Parameters\n\n- `model: string`\n\n- `messages?: object[]`\n\n- `prompt?: string`\n\n### Returns\n\n- `{ model_used: string; request_model: string; tokenizer_type: string; total_tokens: number; }`\n\n  - `model_used: string`\n  - `request_model: string`\n  - `tokenizer_type: string`\n  - `total_tokens: number`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.utils.tokenCounter({ model: 'model' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'transform_request',
    endpoint: '/utils/transform_request',
    httpMethod: 'post',
    summary: 'Transform Request',
    description: 'Transform Request',
    stainlessPath: '(resource) utils > (method) transform_request',
    qualified: 'client.utils.transformRequest',
    params: ['call_type: string;', 'request_body: object;'],
    response:
      '{ error?: string; raw_request_api_base?: string; raw_request_body?: object; raw_request_headers?: object; }',
    markdown:
      "## transform_request\n\n`client.utils.transformRequest(call_type: string, request_body: object): { error?: string; raw_request_api_base?: string; raw_request_body?: object; raw_request_headers?: object; }`\n\n**post** `/utils/transform_request`\n\nTransform Request\n\n### Parameters\n\n- `call_type: string`\n\n- `request_body: object`\n\n### Returns\n\n- `{ error?: string; raw_request_api_base?: string; raw_request_body?: object; raw_request_headers?: object; }`\n\n  - `error?: string`\n  - `raw_request_api_base?: string`\n  - `raw_request_body?: object`\n  - `raw_request_headers?: object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.utils.transformRequest({\n  call_type: 'embedding',\n  request_body: {},\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/model/new',
    httpMethod: 'post',
    summary: 'Add New Model',
    description: 'Allows adding new models to the model list in the config.yaml',
    stainlessPath: '(resource) model > (method) create',
    qualified: 'client.model.create',
    params: [
      'llm_params: { model: string; api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | { api_base: string; }[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; };',
      "model_info: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; };",
      'model_name: string;',
    ],
    response: 'object',
    markdown:
      "## create\n\n`client.model.create(llm_params: { model: string; api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | object[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; }, model_info: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; }, model_name: string): object`\n\n**post** `/model/new`\n\nAllows adding new models to the model list in the config.yaml\n\n### Parameters\n\n- `llm_params: { model: string; api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | { api_base: string; }[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; }`\n  LLM Params with 'model' requirement - used for completions\n  - `model: string`\n  - `api_base?: string`\n  - `api_key?: string`\n  - `api_version?: string`\n  - `aws_access_key_id?: string`\n  - `aws_region_name?: string`\n  - `aws_secret_access_key?: string`\n  - `budget_duration?: string`\n  - `configurable_clientside_auth_params?: string | { api_base: string; }[]`\n  - `custom_llm_provider?: string`\n  - `input_cost_per_second?: number`\n  - `input_cost_per_token?: number`\n  - `llm_trace_id?: string`\n  - `max_budget?: number`\n  - `max_file_size_mb?: number`\n  - `max_retries?: number`\n  - `merge_reasoning_content_in_choices?: boolean`\n  - `model_info?: object`\n  - `organization?: string`\n  - `output_cost_per_second?: number`\n  - `output_cost_per_token?: number`\n  - `region_name?: string`\n  - `rpm?: number`\n  - `stream_timeout?: number | string`\n  - `timeout?: number | string`\n  - `tpm?: number`\n  - `use_in_pass_through?: boolean`\n  - `vertex_credentials?: object | string`\n  - `vertex_location?: string`\n  - `vertex_project?: string`\n  - `watsonx_region_name?: string`\n\n- `model_info: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; }`\n  - `id: string`\n  - `base_model?: string`\n  - `created_at?: string`\n  - `created_by?: string`\n  - `db_model?: boolean`\n  - `team_id?: string`\n  - `team_public_model_name?: string`\n  - `tier?: 'free' | 'paid'`\n  - `updated_at?: string`\n  - `updated_by?: string`\n\n- `model_name: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst model = await client.model.create({\n  llm_params: { model: 'model' },\n  model_info: { id: 'id' },\n  model_name: 'model_name',\n});\n\nconsole.log(model);\n```",
  },
  {
    name: 'delete',
    endpoint: '/model/delete',
    httpMethod: 'post',
    summary: 'Delete Model',
    description: 'Allows deleting models in the model list in the config.yaml',
    stainlessPath: '(resource) model > (method) delete',
    qualified: 'client.model.delete',
    params: ['id: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.model.delete(id: string): object`\n\n**post** `/model/delete`\n\nAllows deleting models in the model list in the config.yaml\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst model = await client.model.delete({ id: 'id' });\n\nconsole.log(model);\n```",
  },
  {
    name: 'list',
    endpoint: '/model/info',
    httpMethod: 'get',
    summary: 'Model Info V1',
    description:
      'Provides more info about each model in /models, including config.yaml descriptions (except api key and api base)\n\nParameters:\n    llm_model_id: Optional[str] = None (this is the value of `x-llm-model-id` returned in response headers)\n\n    - When llm_model_id is passed, it will return the info for that specific model\n    - When llm_model_id is not passed, it will return the info for all models\n\nReturns:\n    Returns a dictionary containing information about each model.\n\nExample Response:\n```json\n{\n    "data": [\n                {\n                    "model_name": "fake-openai-endpoint",\n                    "llm_params": {\n                        "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",\n                        "model": "openai/fake"\n                    },\n                    "model_info": {\n                        "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",\n                        "db_model": false\n                    }\n                }\n            ]\n}\n\n```',
    stainlessPath: '(resource) model.info > (method) list',
    qualified: 'client.model.info.list',
    params: ['llm_model_id?: string;'],
    response: 'object',
    markdown:
      '## list\n\n`client.model.info.list(llm_model_id?: string): object`\n\n**get** `/model/info`\n\nProvides more info about each model in /models, including config.yaml descriptions (except api key and api base)\n\nParameters:\n    llm_model_id: Optional[str] = None (this is the value of `x-llm-model-id` returned in response headers)\n\n    - When llm_model_id is passed, it will return the info for that specific model\n    - When llm_model_id is not passed, it will return the info for all models\n\nReturns:\n    Returns a dictionary containing information about each model.\n\nExample Response:\n```json\n{\n    "data": [\n                {\n                    "model_name": "fake-openai-endpoint",\n                    "llm_params": {\n                        "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",\n                        "model": "openai/fake"\n                    },\n                    "model_info": {\n                        "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",\n                        "db_model": false\n                    }\n                }\n            ]\n}\n\n```\n\n### Parameters\n\n- `llm_model_id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst infos = await client.model.info.list();\n\nconsole.log(infos);\n```',
  },
  {
    name: 'full',
    endpoint: '/model/update',
    httpMethod: 'post',
    summary: 'Update Model',
    description: 'Edit existing model params',
    stainlessPath: '(resource) model.update > (method) full',
    qualified: 'client.model.update.full',
    params: [
      'llm_params?: { api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | { api_base: string; }[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model?: string; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; };',
      "model_info?: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; };",
      'model_name?: string;',
    ],
    response: 'object',
    markdown:
      "## full\n\n`client.model.update.full(llm_params?: { api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | object[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model?: string; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; }, model_info?: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; }, model_name?: string): object`\n\n**post** `/model/update`\n\nEdit existing model params\n\n### Parameters\n\n- `llm_params?: { api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | { api_base: string; }[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model?: string; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; }`\n  - `api_base?: string`\n  - `api_key?: string`\n  - `api_version?: string`\n  - `aws_access_key_id?: string`\n  - `aws_region_name?: string`\n  - `aws_secret_access_key?: string`\n  - `budget_duration?: string`\n  - `configurable_clientside_auth_params?: string | { api_base: string; }[]`\n  - `custom_llm_provider?: string`\n  - `input_cost_per_second?: number`\n  - `input_cost_per_token?: number`\n  - `llm_trace_id?: string`\n  - `max_budget?: number`\n  - `max_file_size_mb?: number`\n  - `max_retries?: number`\n  - `merge_reasoning_content_in_choices?: boolean`\n  - `model?: string`\n  - `model_info?: object`\n  - `organization?: string`\n  - `output_cost_per_second?: number`\n  - `output_cost_per_token?: number`\n  - `region_name?: string`\n  - `rpm?: number`\n  - `stream_timeout?: number | string`\n  - `timeout?: number | string`\n  - `tpm?: number`\n  - `use_in_pass_through?: boolean`\n  - `vertex_credentials?: object | string`\n  - `vertex_location?: string`\n  - `vertex_project?: string`\n  - `watsonx_region_name?: string`\n\n- `model_info?: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; }`\n  - `id: string`\n  - `base_model?: string`\n  - `created_at?: string`\n  - `created_by?: string`\n  - `db_model?: boolean`\n  - `team_id?: string`\n  - `team_public_model_name?: string`\n  - `tier?: 'free' | 'paid'`\n  - `updated_at?: string`\n  - `updated_by?: string`\n\n- `model_name?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.model.update.full();\n\nconsole.log(response);\n```",
  },
  {
    name: 'partial',
    endpoint: '/model/{model_id}/update',
    httpMethod: 'patch',
    summary: 'Patch Model',
    description:
      'PATCH Endpoint for partial model updates.\n\nOnly updates the fields specified in the request while preserving other existing values.\nFollows proper PATCH semantics by only modifying provided fields.\n\nArgs:\n    model_id: The ID of the model to update\n    patch_data: The fields to update and their new values\n    user_api_key_dict: User authentication information\n\nReturns:\n    Updated model information\n\nRaises:\n    ProxyException: For various error conditions including authentication and database errors',
    stainlessPath: '(resource) model.update > (method) partial',
    qualified: 'client.model.update.partial',
    params: [
      'model_id: string;',
      'llm_params?: { api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | { api_base: string; }[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model?: string; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; };',
      "model_info?: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; };",
      'model_name?: string;',
    ],
    response: 'object',
    markdown:
      "## partial\n\n`client.model.update.partial(model_id: string, llm_params?: { api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | object[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model?: string; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; }, model_info?: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; }, model_name?: string): object`\n\n**patch** `/model/{model_id}/update`\n\nPATCH Endpoint for partial model updates.\n\nOnly updates the fields specified in the request while preserving other existing values.\nFollows proper PATCH semantics by only modifying provided fields.\n\nArgs:\n    model_id: The ID of the model to update\n    patch_data: The fields to update and their new values\n    user_api_key_dict: User authentication information\n\nReturns:\n    Updated model information\n\nRaises:\n    ProxyException: For various error conditions including authentication and database errors\n\n### Parameters\n\n- `model_id: string`\n\n- `llm_params?: { api_base?: string; api_key?: string; api_version?: string; aws_access_key_id?: string; aws_region_name?: string; aws_secret_access_key?: string; budget_duration?: string; configurable_clientside_auth_params?: string | { api_base: string; }[]; custom_llm_provider?: string; input_cost_per_second?: number; input_cost_per_token?: number; llm_trace_id?: string; max_budget?: number; max_file_size_mb?: number; max_retries?: number; merge_reasoning_content_in_choices?: boolean; model?: string; model_info?: object; organization?: string; output_cost_per_second?: number; output_cost_per_token?: number; region_name?: string; rpm?: number; stream_timeout?: number | string; timeout?: number | string; tpm?: number; use_in_pass_through?: boolean; vertex_credentials?: object | string; vertex_location?: string; vertex_project?: string; watsonx_region_name?: string; }`\n  - `api_base?: string`\n  - `api_key?: string`\n  - `api_version?: string`\n  - `aws_access_key_id?: string`\n  - `aws_region_name?: string`\n  - `aws_secret_access_key?: string`\n  - `budget_duration?: string`\n  - `configurable_clientside_auth_params?: string | { api_base: string; }[]`\n  - `custom_llm_provider?: string`\n  - `input_cost_per_second?: number`\n  - `input_cost_per_token?: number`\n  - `llm_trace_id?: string`\n  - `max_budget?: number`\n  - `max_file_size_mb?: number`\n  - `max_retries?: number`\n  - `merge_reasoning_content_in_choices?: boolean`\n  - `model?: string`\n  - `model_info?: object`\n  - `organization?: string`\n  - `output_cost_per_second?: number`\n  - `output_cost_per_token?: number`\n  - `region_name?: string`\n  - `rpm?: number`\n  - `stream_timeout?: number | string`\n  - `timeout?: number | string`\n  - `tpm?: number`\n  - `use_in_pass_through?: boolean`\n  - `vertex_credentials?: object | string`\n  - `vertex_location?: string`\n  - `vertex_project?: string`\n  - `watsonx_region_name?: string`\n\n- `model_info?: { id: string; base_model?: string; created_at?: string; created_by?: string; db_model?: boolean; team_id?: string; team_public_model_name?: string; tier?: 'free' | 'paid'; updated_at?: string; updated_by?: string; }`\n  - `id: string`\n  - `base_model?: string`\n  - `created_at?: string`\n  - `created_by?: string`\n  - `db_model?: boolean`\n  - `team_id?: string`\n  - `team_public_model_name?: string`\n  - `tier?: 'free' | 'paid'`\n  - `updated_at?: string`\n  - `updated_by?: string`\n\n- `model_name?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.model.update.partial('model_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_info',
    endpoint: '/model_group/info',
    httpMethod: 'get',
    summary: 'Model Group Info',
    description:
      'Get information about all the deployments on llm proxy, including config.yaml descriptions (except api key and api base)\n\n- /model_group/info returns all model groups. End users of proxy should use /model_group/info since those models will be used for /chat/completions, /embeddings, etc.\n- /model_group/info?model_group=rerank-english-v3.0 returns all model groups for a specific model group (`model_name` in config.yaml)\n\n\n\nExample Request (All Models):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info\'     -H \'accept: application/json\'     -H \'x-api-key: sk-1234\'\n```\n\nExample Request (Specific Model Group):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=rerank-english-v3.0\'     -H \'accept: application/json\'     -H \'Authorization: Bearer sk-1234\'\n```\n\nExample Request (Specific Wildcard Model Group): (e.g. `model_name: openai/*` on config.yaml)\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=openai/tts-1\'\n-H \'accept: application/json\'     -H \'Authorization: Bearersk-1234\'\n```\n\nLearn how to use and set wildcard models [here](https://docs.hanzo.ai/docs/wildcard_routing)\n\nExample Response:\n```json\n    {\n        "data": [\n            {\n            "model_group": "rerank-english-v3.0",\n            "providers": [\n                "cohere"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "stream",\n                "temperature",\n                "max_tokens",\n                "logit_bias",\n                "top_p",\n                "frequency_penalty",\n                "presence_penalty",\n                "stop",\n                "n",\n                "extra_headers"\n            ]\n            },\n            {\n            "model_group": "gpt-3.5-turbo",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": 16385.0,\n            "max_output_tokens": 4096.0,\n            "input_cost_per_token": 1.5e-06,\n            "output_cost_per_token": 2e-06,\n            "mode": "chat",\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": true,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            },\n            {\n            "model_group": "llava-hf",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": true,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            }\n        ]\n        }\n```',
    stainlessPath: '(resource) model_group > (method) retrieve_info',
    qualified: 'client.modelGroup.retrieveInfo',
    params: ['model_group?: string;'],
    response: 'object',
    markdown:
      '## retrieve_info\n\n`client.modelGroup.retrieveInfo(model_group?: string): object`\n\n**get** `/model_group/info`\n\nGet information about all the deployments on llm proxy, including config.yaml descriptions (except api key and api base)\n\n- /model_group/info returns all model groups. End users of proxy should use /model_group/info since those models will be used for /chat/completions, /embeddings, etc.\n- /model_group/info?model_group=rerank-english-v3.0 returns all model groups for a specific model group (`model_name` in config.yaml)\n\n\n\nExample Request (All Models):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info\'     -H \'accept: application/json\'     -H \'x-api-key: sk-1234\'\n```\n\nExample Request (Specific Model Group):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=rerank-english-v3.0\'     -H \'accept: application/json\'     -H \'Authorization: Bearer sk-1234\'\n```\n\nExample Request (Specific Wildcard Model Group): (e.g. `model_name: openai/*` on config.yaml)\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=openai/tts-1\'\n-H \'accept: application/json\'     -H \'Authorization: Bearersk-1234\'\n```\n\nLearn how to use and set wildcard models [here](https://docs.hanzo.ai/docs/wildcard_routing)\n\nExample Response:\n```json\n    {\n        "data": [\n            {\n            "model_group": "rerank-english-v3.0",\n            "providers": [\n                "cohere"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "stream",\n                "temperature",\n                "max_tokens",\n                "logit_bias",\n                "top_p",\n                "frequency_penalty",\n                "presence_penalty",\n                "stop",\n                "n",\n                "extra_headers"\n            ]\n            },\n            {\n            "model_group": "gpt-3.5-turbo",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": 16385.0,\n            "max_output_tokens": 4096.0,\n            "input_cost_per_token": 1.5e-06,\n            "output_cost_per_token": 2e-06,\n            "mode": "chat",\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": true,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            },\n            {\n            "model_group": "llava-hf",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": true,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            }\n        ]\n        }\n```\n\n### Parameters\n\n- `model_group?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.modelGroup.retrieveInfo();\n\nconsole.log(response);\n```',
  },
  {
    name: 'list',
    endpoint: '/routes',
    httpMethod: 'get',
    summary: 'Get Routes',
    description: 'Get a list of available routes in the FastAPI application.',
    stainlessPath: '(resource) routes > (method) list',
    qualified: 'client.routes.list',
    response: 'object',
    markdown:
      "## list\n\n`client.routes.list(): object`\n\n**get** `/routes`\n\nGet a list of available routes in the FastAPI application.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst routes = await client.routes.list();\n\nconsole.log(routes);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/responses',
    httpMethod: 'post',
    summary: 'Responses Api',
    description:
      'Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses\n\n```bash\ncurl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d \'{\n    "model": "gpt-4o",\n    "input": "Tell me about AI"\n}\'\n```',
    stainlessPath: '(resource) responses > (method) create',
    qualified: 'client.responses.create',
    response: 'object',
    markdown:
      '## create\n\n`client.responses.create(): object`\n\n**post** `/v1/responses`\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses\n\n```bash\ncurl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d \'{\n    "model": "gpt-4o",\n    "input": "Tell me about AI"\n}\'\n```\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.responses.create();\n\nconsole.log(response);\n```',
  },
  {
    name: 'retrieve',
    endpoint: '/v1/responses/{response_id}',
    httpMethod: 'get',
    summary: 'Get Response',
    description:
      'Get a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/get\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) responses > (method) retrieve',
    qualified: 'client.responses.retrieve',
    params: ['response_id: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.responses.retrieve(response_id: string): object`\n\n**get** `/v1/responses/{response_id}`\n\nGet a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/get\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123     -H \"Authorization: Bearer sk-1234\"\n```\n\n### Parameters\n\n- `response_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.responses.retrieve('response_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/responses/{response_id}',
    httpMethod: 'delete',
    summary: 'Delete Response',
    description:
      'Delete a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/delete\n\n```bash\ncurl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) responses > (method) delete',
    qualified: 'client.responses.delete',
    params: ['response_id: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.responses.delete(response_id: string): object`\n\n**delete** `/v1/responses/{response_id}`\n\nDelete a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/delete\n\n```bash\ncurl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H \"Authorization: Bearer sk-1234\"\n```\n\n### Parameters\n\n- `response_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.responses.delete('response_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/responses/{response_id}/input_items',
    httpMethod: 'get',
    summary: 'Get Response Input Items',
    description:
      'Get input items for a response.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/input-items\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123/input_items     -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) responses.input_items > (method) list',
    qualified: 'client.responses.inputItems.list',
    params: ['response_id: string;'],
    response: 'object',
    markdown:
      "## list\n\n`client.responses.inputItems.list(response_id: string): object`\n\n**get** `/v1/responses/{response_id}/input_items`\n\nGet input items for a response.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/input-items\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123/input_items     -H \"Authorization: Bearer sk-1234\"\n```\n\n### Parameters\n\n- `response_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst inputItems = await client.responses.inputItems.list('response_id');\n\nconsole.log(inputItems);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/batches',
    httpMethod: 'post',
    summary: 'Create Batch',
    description:
      'Create large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```',
    stainlessPath: '(resource) batches > (method) create',
    qualified: 'client.batches.create',
    params: ['provider?: string;'],
    response: 'object',
    markdown:
      '## create\n\n`client.batches.create(provider?: string): object`\n\n**post** `/v1/batches`\n\nCreate large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```\n\n### Parameters\n\n- `provider?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst batch = await client.batches.create();\n\nconsole.log(batch);\n```',
  },
  {
    name: 'retrieve',
    endpoint: '/v1/batches/{batch_id}',
    httpMethod: 'get',
    summary: 'Retrieve Batch',
    description:
      'Retrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
    stainlessPath: '(resource) batches > (method) retrieve',
    qualified: 'client.batches.retrieve',
    params: ['batch_id: string;', 'provider?: string;'],
    response: 'object',
    markdown:
      '## retrieve\n\n`client.batches.retrieve(batch_id: string, provider?: string): object`\n\n**get** `/v1/batches/{batch_id}`\n\nRetrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```\n\n### Parameters\n\n- `batch_id: string`\n  The ID of the batch to retrieve\n\n- `provider?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst batch = await client.batches.retrieve(\'batch_id\');\n\nconsole.log(batch);\n```',
  },
  {
    name: 'list',
    endpoint: '/v1/batches',
    httpMethod: 'get',
    summary: 'List Batches',
    description:
      'Lists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
    stainlessPath: '(resource) batches > (method) list',
    qualified: 'client.batches.list',
    params: ['after?: string;', 'limit?: number;', 'provider?: string;'],
    response: 'object',
    markdown:
      '## list\n\n`client.batches.list(after?: string, limit?: number, provider?: string): object`\n\n**get** `/v1/batches`\n\nLists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```\n\n### Parameters\n\n- `after?: string`\n\n- `limit?: number`\n\n- `provider?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst batches = await client.batches.list();\n\nconsole.log(batches);\n```',
  },
  {
    name: 'cancel_with_provider',
    endpoint: '/{provider}/v1/batches/{batch_id}/cancel',
    httpMethod: 'post',
    summary: 'Cancel Batch',
    description:
      'Cancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```',
    stainlessPath: '(resource) batches > (method) cancel_with_provider',
    qualified: 'client.batches.cancelWithProvider',
    params: ['provider: string;', 'batch_id: string;'],
    response: 'object',
    markdown:
      "## cancel_with_provider\n\n`client.batches.cancelWithProvider(provider: string, batch_id: string): object`\n\n**post** `/{provider}/v1/batches/{batch_id}/cancel`\n\nCancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H \"Authorization: Bearer sk-1234\"         -H \"Content-Type: application/json\"         -X POST\n\n```\n\n### Parameters\n\n- `provider: string`\n\n- `batch_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.batches.cancelWithProvider('batch_id', { provider: 'provider' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create_with_provider',
    endpoint: '/{provider}/v1/batches',
    httpMethod: 'post',
    summary: 'Create Batch',
    description:
      'Create large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```',
    stainlessPath: '(resource) batches > (method) create_with_provider',
    qualified: 'client.batches.createWithProvider',
    params: ['provider: string;'],
    response: 'object',
    markdown:
      '## create_with_provider\n\n`client.batches.createWithProvider(provider: string): object`\n\n**post** `/{provider}/v1/batches`\n\nCreate large batches of API requests for asynchronous processing.\nThis is the equivalent of POST https://api.openai.com/v1/batch\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -d \'{\n        "input_file_id": "file-abc123",\n        "endpoint": "/v1/chat/completions",\n        "completion_window": "24h"\n}\'\n```\n\n### Parameters\n\n- `provider: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.batches.createWithProvider(\'provider\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'list_with_provider',
    endpoint: '/{provider}/v1/batches',
    httpMethod: 'get',
    summary: 'List Batches',
    description:
      'Lists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
    stainlessPath: '(resource) batches > (method) list_with_provider',
    qualified: 'client.batches.listWithProvider',
    params: ['provider: string;', 'after?: string;', 'limit?: number;'],
    response: 'object',
    markdown:
      '## list_with_provider\n\n`client.batches.listWithProvider(provider: string, after?: string, limit?: number): object`\n\n**get** `/{provider}/v1/batches`\n\nLists \nThis is the equivalent of GET https://api.openai.com/v1/batches/\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches?limit=2     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```\n\n### Parameters\n\n- `provider: string`\n\n- `after?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.batches.listWithProvider(\'provider\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'retrieve_with_provider',
    endpoint: '/{provider}/v1/batches/{batch_id}',
    httpMethod: 'get',
    summary: 'Retrieve Batch',
    description:
      'Retrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H "Authorization: Bearer sk-1234"     -H "Content-Type: application/json" \n```',
    stainlessPath: '(resource) batches > (method) retrieve_with_provider',
    qualified: 'client.batches.retrieveWithProvider',
    params: ['provider: string;', 'batch_id: string;'],
    response: 'object',
    markdown:
      "## retrieve_with_provider\n\n`client.batches.retrieveWithProvider(provider: string, batch_id: string): object`\n\n**get** `/{provider}/v1/batches/{batch_id}`\n\nRetrieves a batch.\nThis is the equivalent of GET https://api.openai.com/v1/batches/{batch_id}\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123     -H \"Authorization: Bearer sk-1234\"     -H \"Content-Type: application/json\" \n```\n\n### Parameters\n\n- `provider: string`\n\n- `batch_id: string`\n  The ID of the batch to retrieve\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.batches.retrieveWithProvider('batch_id', { provider: 'provider' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'cancel',
    endpoint: '/batches/{batch_id}/cancel',
    httpMethod: 'post',
    summary: 'Cancel Batch',
    description:
      'Cancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```',
    stainlessPath: '(resource) batches.cancel > (method) cancel',
    qualified: 'client.batches.cancel.cancel',
    params: ['batch_id: string;', 'provider?: string;'],
    response: 'object',
    markdown:
      '## cancel\n\n`client.batches.cancel.cancel(batch_id: string, provider?: string): object`\n\n**post** `/batches/{batch_id}/cancel`\n\nCancel a batch.\nThis is the equivalent of POST https://api.openai.com/v1/batches/{batch_id}/cancel\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/batch/cancel\n\nExample Curl\n```\ncurl http://localhost:4000/v1/batches/batch_abc123/cancel         -H "Authorization: Bearer sk-1234"         -H "Content-Type: application/json"         -X POST\n\n```\n\n### Parameters\n\n- `batch_id: string`\n\n- `provider?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.batches.cancel.cancel(\'batch_id\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'create',
    endpoint: '/rerank',
    httpMethod: 'post',
    summary: 'Rerank',
    description: 'Rerank',
    stainlessPath: '(resource) rerank > (method) create',
    qualified: 'client.rerank.create',
    response: 'object',
    markdown:
      "## create\n\n`client.rerank.create(): object`\n\n**post** `/rerank`\n\nRerank\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst rerank = await client.rerank.create();\n\nconsole.log(rerank);\n```",
  },
  {
    name: 'create_v1',
    endpoint: '/v1/rerank',
    httpMethod: 'post',
    summary: 'Rerank',
    description: 'Rerank',
    stainlessPath: '(resource) rerank > (method) create_v1',
    qualified: 'client.rerank.createV1',
    response: 'object',
    markdown:
      "## create_v1\n\n`client.rerank.createV1(): object`\n\n**post** `/v1/rerank`\n\nRerank\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.rerank.createV1();\n\nconsole.log(response);\n```",
  },
  {
    name: 'create_v2',
    endpoint: '/v2/rerank',
    httpMethod: 'post',
    summary: 'Rerank',
    description: 'Rerank',
    stainlessPath: '(resource) rerank > (method) create_v2',
    qualified: 'client.rerank.createV2',
    response: 'object',
    markdown:
      "## create_v2\n\n`client.rerank.createV2(): object`\n\n**post** `/v2/rerank`\n\nRerank\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.rerank.createV2();\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/fine_tuning/jobs',
    httpMethod: 'post',
    summary: '✨ (Enterprise) Create Fine-Tuning Job',
    description:
      'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/fine-tuning/create\n\nExample Curl:\n```\ncurl http://localhost:4000/v1/fine_tuning/jobs       -H "Content-Type: application/json"       -H "Authorization: Bearer sk-1234"       -d \'{\n    "model": "gpt-3.5-turbo",\n    "training_file": "file-abc123",\n    "hyperparameters": {\n      "n_epochs": 4\n    }\n  }\'\n```',
    stainlessPath: '(resource) fine_tuning.jobs > (method) create',
    qualified: 'client.fineTuning.jobs.create',
    params: [
      "custom_llm_provider: 'openai' | 'azure' | 'vertex_ai';",
      'model: string;',
      'training_file: string;',
      'hyperparameters?: { batch_size?: string | number; learning_rate_multiplier?: string | number; n_epochs?: string | number; };',
      'integrations?: string[];',
      'seed?: number;',
      'suffix?: string;',
      'validation_file?: string;',
    ],
    response: 'object',
    markdown:
      "## create\n\n`client.fineTuning.jobs.create(custom_llm_provider: 'openai' | 'azure' | 'vertex_ai', model: string, training_file: string, hyperparameters?: { batch_size?: string | number; learning_rate_multiplier?: string | number; n_epochs?: string | number; }, integrations?: string[], seed?: number, suffix?: string, validation_file?: string): object`\n\n**post** `/v1/fine_tuning/jobs`\n\nCreates a fine-tuning job which begins the process of creating a new model from a given dataset.\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/fine-tuning/create\n\nExample Curl:\n```\ncurl http://localhost:4000/v1/fine_tuning/jobs       -H \"Content-Type: application/json\"       -H \"Authorization: Bearer sk-1234\"       -d '{\n    \"model\": \"gpt-3.5-turbo\",\n    \"training_file\": \"file-abc123\",\n    \"hyperparameters\": {\n      \"n_epochs\": 4\n    }\n  }'\n```\n\n### Parameters\n\n- `custom_llm_provider: 'openai' | 'azure' | 'vertex_ai'`\n\n- `model: string`\n\n- `training_file: string`\n\n- `hyperparameters?: { batch_size?: string | number; learning_rate_multiplier?: string | number; n_epochs?: string | number; }`\n  - `batch_size?: string | number`\n  - `learning_rate_multiplier?: string | number`\n  - `n_epochs?: string | number`\n\n- `integrations?: string[]`\n\n- `seed?: number`\n\n- `suffix?: string`\n\n- `validation_file?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst job = await client.fineTuning.jobs.create({\n  custom_llm_provider: 'openai',\n  model: 'model',\n  training_file: 'training_file',\n});\n\nconsole.log(job);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/fine_tuning/jobs/{fine_tuning_job_id}',
    httpMethod: 'get',
    summary: '✨ (Enterprise) Retrieve Fine-Tuning Job',
    description:
      'Retrieves a fine-tuning job.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to retrieve.',
    stainlessPath: '(resource) fine_tuning.jobs > (method) retrieve',
    qualified: 'client.fineTuning.jobs.retrieve',
    params: ['fine_tuning_job_id: string;', "custom_llm_provider: 'openai' | 'azure';"],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.fineTuning.jobs.retrieve(fine_tuning_job_id: string, custom_llm_provider: 'openai' | 'azure'): object`\n\n**get** `/v1/fine_tuning/jobs/{fine_tuning_job_id}`\n\nRetrieves a fine-tuning job.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to retrieve.\n\n### Parameters\n\n- `fine_tuning_job_id: string`\n\n- `custom_llm_provider: 'openai' | 'azure'`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst job = await client.fineTuning.jobs.retrieve('fine_tuning_job_id', { custom_llm_provider: 'openai' });\n\nconsole.log(job);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/fine_tuning/jobs',
    httpMethod: 'get',
    summary: '✨ (Enterprise) List Fine-Tuning Jobs',
    description:
      'Lists fine-tuning jobs for the organization.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `after`: Identifier for the last job from the previous pagination request.\n- `limit`: Number of fine-tuning jobs to retrieve (default is 20).',
    stainlessPath: '(resource) fine_tuning.jobs > (method) list',
    qualified: 'client.fineTuning.jobs.list',
    params: ["custom_llm_provider: 'openai' | 'azure';", 'after?: string;', 'limit?: number;'],
    response: 'object',
    markdown:
      "## list\n\n`client.fineTuning.jobs.list(custom_llm_provider: 'openai' | 'azure', after?: string, limit?: number): object`\n\n**get** `/v1/fine_tuning/jobs`\n\nLists fine-tuning jobs for the organization.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `after`: Identifier for the last job from the previous pagination request.\n- `limit`: Number of fine-tuning jobs to retrieve (default is 20).\n\n### Parameters\n\n- `custom_llm_provider: 'openai' | 'azure'`\n\n- `after?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst jobs = await client.fineTuning.jobs.list({ custom_llm_provider: 'openai' });\n\nconsole.log(jobs);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel',
    httpMethod: 'post',
    summary: '✨ (Enterprise) Cancel Fine-Tuning Jobs',
    description:
      'Cancel a fine-tuning job.\n\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.',
    stainlessPath: '(resource) fine_tuning.jobs.cancel > (method) create',
    qualified: 'client.fineTuning.jobs.cancel.create',
    params: ['fine_tuning_job_id: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.fineTuning.jobs.cancel.create(fine_tuning_job_id: string): object`\n\n**post** `/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel`\n\nCancel a fine-tuning job.\n\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.\n\n### Parameters\n\n- `fine_tuning_job_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst cancel = await client.fineTuning.jobs.cancel.create('fine_tuning_job_id');\n\nconsole.log(cancel);\n```",
  },
  {
    name: 'create',
    endpoint: '/credentials',
    httpMethod: 'post',
    summary: 'Create Credential',
    description:
      '[BETA] endpoint. This might change unexpectedly.\nStores credential in DB.\nReloads credentials in memory.',
    stainlessPath: '(resource) credentials > (method) create',
    qualified: 'client.credentials.create',
    params: [
      'credential_info: object;',
      'credential_name: string;',
      'credential_values?: object;',
      'model_id?: string;',
    ],
    response: 'object',
    markdown:
      "## create\n\n`client.credentials.create(credential_info: object, credential_name: string, credential_values?: object, model_id?: string): object`\n\n**post** `/credentials`\n\n[BETA] endpoint. This might change unexpectedly.\nStores credential in DB.\nReloads credentials in memory.\n\n### Parameters\n\n- `credential_info: object`\n\n- `credential_name: string`\n\n- `credential_values?: object`\n\n- `model_id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst credential = await client.credentials.create({\n  credential_info: {},\n  credential_name: 'credential_name',\n});\n\nconsole.log(credential);\n```",
  },
  {
    name: 'list',
    endpoint: '/credentials',
    httpMethod: 'get',
    summary: 'Get Credentials',
    description: '[BETA] endpoint. This might change unexpectedly.',
    stainlessPath: '(resource) credentials > (method) list',
    qualified: 'client.credentials.list',
    response: 'object',
    markdown:
      "## list\n\n`client.credentials.list(): object`\n\n**get** `/credentials`\n\n[BETA] endpoint. This might change unexpectedly.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst credentials = await client.credentials.list();\n\nconsole.log(credentials);\n```",
  },
  {
    name: 'delete',
    endpoint: '/credentials/{credential_name}',
    httpMethod: 'delete',
    summary: 'Delete Credential',
    description: '[BETA] endpoint. This might change unexpectedly.',
    stainlessPath: '(resource) credentials > (method) delete',
    qualified: 'client.credentials.delete',
    params: ['credential_name: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.credentials.delete(credential_name: string): object`\n\n**delete** `/credentials/{credential_name}`\n\n[BETA] endpoint. This might change unexpectedly.\n\n### Parameters\n\n- `credential_name: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst credential = await client.credentials.delete('credential_name');\n\nconsole.log(credential);\n```",
  },
  {
    name: 'create',
    endpoint: '/vertex_ai/{endpoint}',
    httpMethod: 'post',
    summary: 'Vertex Proxy Route',
    description:
      'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
    stainlessPath: '(resource) vertex_ai > (method) create',
    qualified: 'client.vertexAI.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.vertexAI.create(endpoint: string): object`\n\n**post** `/vertex_ai/{endpoint}`\n\nCall LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst vertexAI = await client.vertexAI.create('endpoint');\n\nconsole.log(vertexAI);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/vertex_ai/{endpoint}',
    httpMethod: 'get',
    summary: 'Vertex Proxy Route',
    description:
      'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
    stainlessPath: '(resource) vertex_ai > (method) retrieve',
    qualified: 'client.vertexAI.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.vertexAI.retrieve(endpoint: string): object`\n\n**get** `/vertex_ai/{endpoint}`\n\nCall LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst vertexAI = await client.vertexAI.retrieve('endpoint');\n\nconsole.log(vertexAI);\n```",
  },
  {
    name: 'update',
    endpoint: '/vertex_ai/{endpoint}',
    httpMethod: 'put',
    summary: 'Vertex Proxy Route',
    description:
      'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
    stainlessPath: '(resource) vertex_ai > (method) update',
    qualified: 'client.vertexAI.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.vertexAI.update(endpoint: string): object`\n\n**put** `/vertex_ai/{endpoint}`\n\nCall LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst vertexAI = await client.vertexAI.update('endpoint');\n\nconsole.log(vertexAI);\n```",
  },
  {
    name: 'delete',
    endpoint: '/vertex_ai/{endpoint}',
    httpMethod: 'delete',
    summary: 'Vertex Proxy Route',
    description:
      'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
    stainlessPath: '(resource) vertex_ai > (method) delete',
    qualified: 'client.vertexAI.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.vertexAI.delete(endpoint: string): object`\n\n**delete** `/vertex_ai/{endpoint}`\n\nCall LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst vertexAI = await client.vertexAI.delete('endpoint');\n\nconsole.log(vertexAI);\n```",
  },
  {
    name: 'patch',
    endpoint: '/vertex_ai/{endpoint}',
    httpMethod: 'patch',
    summary: 'Vertex Proxy Route',
    description:
      'Call LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)',
    stainlessPath: '(resource) vertex_ai > (method) patch',
    qualified: 'client.vertexAI.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.vertexAI.patch(endpoint: string): object`\n\n**patch** `/vertex_ai/{endpoint}`\n\nCall LLM proxy via Vertex AI SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/vertex_ai)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.vertexAI.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/gemini/{endpoint}',
    httpMethod: 'post',
    summary: 'Gemini Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
    stainlessPath: '(resource) gemini > (method) create',
    qualified: 'client.gemini.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.gemini.create(endpoint: string): object`\n\n**post** `/gemini/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst gemini = await client.gemini.create('endpoint');\n\nconsole.log(gemini);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/gemini/{endpoint}',
    httpMethod: 'get',
    summary: 'Gemini Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
    stainlessPath: '(resource) gemini > (method) retrieve',
    qualified: 'client.gemini.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.gemini.retrieve(endpoint: string): object`\n\n**get** `/gemini/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst gemini = await client.gemini.retrieve('endpoint');\n\nconsole.log(gemini);\n```",
  },
  {
    name: 'update',
    endpoint: '/gemini/{endpoint}',
    httpMethod: 'put',
    summary: 'Gemini Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
    stainlessPath: '(resource) gemini > (method) update',
    qualified: 'client.gemini.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.gemini.update(endpoint: string): object`\n\n**put** `/gemini/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst gemini = await client.gemini.update('endpoint');\n\nconsole.log(gemini);\n```",
  },
  {
    name: 'delete',
    endpoint: '/gemini/{endpoint}',
    httpMethod: 'delete',
    summary: 'Gemini Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
    stainlessPath: '(resource) gemini > (method) delete',
    qualified: 'client.gemini.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.gemini.delete(endpoint: string): object`\n\n**delete** `/gemini/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst gemini = await client.gemini.delete('endpoint');\n\nconsole.log(gemini);\n```",
  },
  {
    name: 'patch',
    endpoint: '/gemini/{endpoint}',
    httpMethod: 'patch',
    summary: 'Gemini Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)',
    stainlessPath: '(resource) gemini > (method) patch',
    qualified: 'client.gemini.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.gemini.patch(endpoint: string): object`\n\n**patch** `/gemini/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/google_ai_studio)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.gemini.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/cohere/{endpoint}',
    httpMethod: 'post',
    summary: 'Cohere Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
    stainlessPath: '(resource) cohere > (method) create',
    qualified: 'client.cohere.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.cohere.create(endpoint: string): object`\n\n**post** `/cohere/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst cohere = await client.cohere.create('endpoint');\n\nconsole.log(cohere);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/cohere/{endpoint}',
    httpMethod: 'get',
    summary: 'Cohere Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
    stainlessPath: '(resource) cohere > (method) retrieve',
    qualified: 'client.cohere.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.cohere.retrieve(endpoint: string): object`\n\n**get** `/cohere/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst cohere = await client.cohere.retrieve('endpoint');\n\nconsole.log(cohere);\n```",
  },
  {
    name: 'update',
    endpoint: '/cohere/{endpoint}',
    httpMethod: 'put',
    summary: 'Cohere Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
    stainlessPath: '(resource) cohere > (method) update',
    qualified: 'client.cohere.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.cohere.update(endpoint: string): object`\n\n**put** `/cohere/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst cohere = await client.cohere.update('endpoint');\n\nconsole.log(cohere);\n```",
  },
  {
    name: 'delete',
    endpoint: '/cohere/{endpoint}',
    httpMethod: 'delete',
    summary: 'Cohere Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
    stainlessPath: '(resource) cohere > (method) delete',
    qualified: 'client.cohere.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.cohere.delete(endpoint: string): object`\n\n**delete** `/cohere/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst cohere = await client.cohere.delete('endpoint');\n\nconsole.log(cohere);\n```",
  },
  {
    name: 'modify',
    endpoint: '/cohere/{endpoint}',
    httpMethod: 'patch',
    summary: 'Cohere Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)',
    stainlessPath: '(resource) cohere > (method) modify',
    qualified: 'client.cohere.modify',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## modify\n\n`client.cohere.modify(endpoint: string): object`\n\n**patch** `/cohere/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/cohere)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.cohere.modify('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/anthropic/{endpoint}',
    httpMethod: 'post',
    summary: 'Anthropic Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
    stainlessPath: '(resource) anthropic > (method) create',
    qualified: 'client.anthropic.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.anthropic.create(endpoint: string): object`\n\n**post** `/anthropic/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/anthropic_completion)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst anthropic = await client.anthropic.create('endpoint');\n\nconsole.log(anthropic);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/anthropic/{endpoint}',
    httpMethod: 'get',
    summary: 'Anthropic Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
    stainlessPath: '(resource) anthropic > (method) retrieve',
    qualified: 'client.anthropic.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.anthropic.retrieve(endpoint: string): object`\n\n**get** `/anthropic/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/anthropic_completion)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst anthropic = await client.anthropic.retrieve('endpoint');\n\nconsole.log(anthropic);\n```",
  },
  {
    name: 'update',
    endpoint: '/anthropic/{endpoint}',
    httpMethod: 'put',
    summary: 'Anthropic Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
    stainlessPath: '(resource) anthropic > (method) update',
    qualified: 'client.anthropic.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.anthropic.update(endpoint: string): object`\n\n**put** `/anthropic/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/anthropic_completion)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst anthropic = await client.anthropic.update('endpoint');\n\nconsole.log(anthropic);\n```",
  },
  {
    name: 'delete',
    endpoint: '/anthropic/{endpoint}',
    httpMethod: 'delete',
    summary: 'Anthropic Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
    stainlessPath: '(resource) anthropic > (method) delete',
    qualified: 'client.anthropic.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.anthropic.delete(endpoint: string): object`\n\n**delete** `/anthropic/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/anthropic_completion)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst anthropic = await client.anthropic.delete('endpoint');\n\nconsole.log(anthropic);\n```",
  },
  {
    name: 'modify',
    endpoint: '/anthropic/{endpoint}',
    httpMethod: 'patch',
    summary: 'Anthropic Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/anthropic_completion)',
    stainlessPath: '(resource) anthropic > (method) modify',
    qualified: 'client.anthropic.modify',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## modify\n\n`client.anthropic.modify(endpoint: string): object`\n\n**patch** `/anthropic/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/anthropic_completion)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.anthropic.modify('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/bedrock/{endpoint}',
    httpMethod: 'post',
    summary: 'Bedrock Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
    stainlessPath: '(resource) bedrock > (method) create',
    qualified: 'client.bedrock.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.bedrock.create(endpoint: string): object`\n\n**post** `/bedrock/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst bedrock = await client.bedrock.create('endpoint');\n\nconsole.log(bedrock);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/bedrock/{endpoint}',
    httpMethod: 'get',
    summary: 'Bedrock Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
    stainlessPath: '(resource) bedrock > (method) retrieve',
    qualified: 'client.bedrock.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.bedrock.retrieve(endpoint: string): object`\n\n**get** `/bedrock/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst bedrock = await client.bedrock.retrieve('endpoint');\n\nconsole.log(bedrock);\n```",
  },
  {
    name: 'update',
    endpoint: '/bedrock/{endpoint}',
    httpMethod: 'put',
    summary: 'Bedrock Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
    stainlessPath: '(resource) bedrock > (method) update',
    qualified: 'client.bedrock.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.bedrock.update(endpoint: string): object`\n\n**put** `/bedrock/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst bedrock = await client.bedrock.update('endpoint');\n\nconsole.log(bedrock);\n```",
  },
  {
    name: 'delete',
    endpoint: '/bedrock/{endpoint}',
    httpMethod: 'delete',
    summary: 'Bedrock Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
    stainlessPath: '(resource) bedrock > (method) delete',
    qualified: 'client.bedrock.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.bedrock.delete(endpoint: string): object`\n\n**delete** `/bedrock/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst bedrock = await client.bedrock.delete('endpoint');\n\nconsole.log(bedrock);\n```",
  },
  {
    name: 'patch',
    endpoint: '/bedrock/{endpoint}',
    httpMethod: 'patch',
    summary: 'Bedrock Proxy Route',
    description: '[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)',
    stainlessPath: '(resource) bedrock > (method) patch',
    qualified: 'client.bedrock.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.bedrock.patch(endpoint: string): object`\n\n**patch** `/bedrock/{endpoint}`\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/bedrock)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.bedrock.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/eu.assemblyai/{endpoint}',
    httpMethod: 'post',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) eu_assemblyai > (method) create',
    qualified: 'client.euAssemblyai.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.euAssemblyai.create(endpoint: string): object`\n\n**post** `/eu.assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst euAssemblyai = await client.euAssemblyai.create('endpoint');\n\nconsole.log(euAssemblyai);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/eu.assemblyai/{endpoint}',
    httpMethod: 'get',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) eu_assemblyai > (method) retrieve',
    qualified: 'client.euAssemblyai.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.euAssemblyai.retrieve(endpoint: string): object`\n\n**get** `/eu.assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst euAssemblyai = await client.euAssemblyai.retrieve('endpoint');\n\nconsole.log(euAssemblyai);\n```",
  },
  {
    name: 'update',
    endpoint: '/eu.assemblyai/{endpoint}',
    httpMethod: 'put',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) eu_assemblyai > (method) update',
    qualified: 'client.euAssemblyai.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.euAssemblyai.update(endpoint: string): object`\n\n**put** `/eu.assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst euAssemblyai = await client.euAssemblyai.update('endpoint');\n\nconsole.log(euAssemblyai);\n```",
  },
  {
    name: 'delete',
    endpoint: '/eu.assemblyai/{endpoint}',
    httpMethod: 'delete',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) eu_assemblyai > (method) delete',
    qualified: 'client.euAssemblyai.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.euAssemblyai.delete(endpoint: string): object`\n\n**delete** `/eu.assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst euAssemblyai = await client.euAssemblyai.delete('endpoint');\n\nconsole.log(euAssemblyai);\n```",
  },
  {
    name: 'patch',
    endpoint: '/eu.assemblyai/{endpoint}',
    httpMethod: 'patch',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) eu_assemblyai > (method) patch',
    qualified: 'client.euAssemblyai.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.euAssemblyai.patch(endpoint: string): object`\n\n**patch** `/eu.assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.euAssemblyai.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/assemblyai/{endpoint}',
    httpMethod: 'post',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) assemblyai > (method) create',
    qualified: 'client.assemblyai.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.assemblyai.create(endpoint: string): object`\n\n**post** `/assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assemblyai = await client.assemblyai.create('endpoint');\n\nconsole.log(assemblyai);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/assemblyai/{endpoint}',
    httpMethod: 'get',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) assemblyai > (method) retrieve',
    qualified: 'client.assemblyai.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.assemblyai.retrieve(endpoint: string): object`\n\n**get** `/assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assemblyai = await client.assemblyai.retrieve('endpoint');\n\nconsole.log(assemblyai);\n```",
  },
  {
    name: 'update',
    endpoint: '/assemblyai/{endpoint}',
    httpMethod: 'put',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) assemblyai > (method) update',
    qualified: 'client.assemblyai.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.assemblyai.update(endpoint: string): object`\n\n**put** `/assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assemblyai = await client.assemblyai.update('endpoint');\n\nconsole.log(assemblyai);\n```",
  },
  {
    name: 'delete',
    endpoint: '/assemblyai/{endpoint}',
    httpMethod: 'delete',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) assemblyai > (method) delete',
    qualified: 'client.assemblyai.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.assemblyai.delete(endpoint: string): object`\n\n**delete** `/assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst assemblyai = await client.assemblyai.delete('endpoint');\n\nconsole.log(assemblyai);\n```",
  },
  {
    name: 'patch',
    endpoint: '/assemblyai/{endpoint}',
    httpMethod: 'patch',
    summary: 'Assemblyai Proxy Route',
    description: 'Assemblyai Proxy Route',
    stainlessPath: '(resource) assemblyai > (method) patch',
    qualified: 'client.assemblyai.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.assemblyai.patch(endpoint: string): object`\n\n**patch** `/assemblyai/{endpoint}`\n\nAssemblyai Proxy Route\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.assemblyai.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/azure/{endpoint}',
    httpMethod: 'post',
    summary: 'Azure Proxy Route',
    description:
      'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
    stainlessPath: '(resource) azure > (method) create',
    qualified: 'client.azure.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.azure.create(endpoint: string): object`\n\n**post** `/azure/{endpoint}`\n\nCall any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst azure = await client.azure.create('endpoint');\n\nconsole.log(azure);\n```",
  },
  {
    name: 'update',
    endpoint: '/azure/{endpoint}',
    httpMethod: 'put',
    summary: 'Azure Proxy Route',
    description:
      'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
    stainlessPath: '(resource) azure > (method) update',
    qualified: 'client.azure.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.azure.update(endpoint: string): object`\n\n**put** `/azure/{endpoint}`\n\nCall any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst azure = await client.azure.update('endpoint');\n\nconsole.log(azure);\n```",
  },
  {
    name: 'delete',
    endpoint: '/azure/{endpoint}',
    httpMethod: 'delete',
    summary: 'Azure Proxy Route',
    description:
      'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
    stainlessPath: '(resource) azure > (method) delete',
    qualified: 'client.azure.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.azure.delete(endpoint: string): object`\n\n**delete** `/azure/{endpoint}`\n\nCall any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst azure = await client.azure.delete('endpoint');\n\nconsole.log(azure);\n```",
  },
  {
    name: 'call',
    endpoint: '/azure/{endpoint}',
    httpMethod: 'get',
    summary: 'Azure Proxy Route',
    description:
      'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
    stainlessPath: '(resource) azure > (method) call',
    qualified: 'client.azure.call',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## call\n\n`client.azure.call(endpoint: string): object`\n\n**get** `/azure/{endpoint}`\n\nCall any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.azure.call('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'patch',
    endpoint: '/azure/{endpoint}',
    httpMethod: 'patch',
    summary: 'Azure Proxy Route',
    description:
      'Call any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`',
    stainlessPath: '(resource) azure > (method) patch',
    qualified: 'client.azure.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.azure.patch(endpoint: string): object`\n\n**patch** `/azure/{endpoint}`\n\nCall any azure endpoint using the proxy.\n\nJust use `{PROXY_BASE_URL}/azure/{endpoint:path}`\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.azure.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/langfuse/{endpoint}',
    httpMethod: 'post',
    summary: 'Langfuse Proxy Route',
    description:
      'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
    stainlessPath: '(resource) langfuse > (method) create',
    qualified: 'client.langfuse.create',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.langfuse.create(endpoint: string): object`\n\n**post** `/langfuse/{endpoint}`\n\nCall Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst langfuse = await client.langfuse.create('endpoint');\n\nconsole.log(langfuse);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/langfuse/{endpoint}',
    httpMethod: 'get',
    summary: 'Langfuse Proxy Route',
    description:
      'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
    stainlessPath: '(resource) langfuse > (method) retrieve',
    qualified: 'client.langfuse.retrieve',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.langfuse.retrieve(endpoint: string): object`\n\n**get** `/langfuse/{endpoint}`\n\nCall Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst langfuse = await client.langfuse.retrieve('endpoint');\n\nconsole.log(langfuse);\n```",
  },
  {
    name: 'update',
    endpoint: '/langfuse/{endpoint}',
    httpMethod: 'put',
    summary: 'Langfuse Proxy Route',
    description:
      'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
    stainlessPath: '(resource) langfuse > (method) update',
    qualified: 'client.langfuse.update',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.langfuse.update(endpoint: string): object`\n\n**put** `/langfuse/{endpoint}`\n\nCall Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst langfuse = await client.langfuse.update('endpoint');\n\nconsole.log(langfuse);\n```",
  },
  {
    name: 'delete',
    endpoint: '/langfuse/{endpoint}',
    httpMethod: 'delete',
    summary: 'Langfuse Proxy Route',
    description:
      'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
    stainlessPath: '(resource) langfuse > (method) delete',
    qualified: 'client.langfuse.delete',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.langfuse.delete(endpoint: string): object`\n\n**delete** `/langfuse/{endpoint}`\n\nCall Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst langfuse = await client.langfuse.delete('endpoint');\n\nconsole.log(langfuse);\n```",
  },
  {
    name: 'patch',
    endpoint: '/langfuse/{endpoint}',
    httpMethod: 'patch',
    summary: 'Langfuse Proxy Route',
    description:
      'Call Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)',
    stainlessPath: '(resource) langfuse > (method) patch',
    qualified: 'client.langfuse.patch',
    params: ['endpoint: string;'],
    response: 'object',
    markdown:
      "## patch\n\n`client.langfuse.patch(endpoint: string): object`\n\n**patch** `/langfuse/{endpoint}`\n\nCall Langfuse via LLM proxy. Works with Langfuse SDK.\n\n[Docs](https://docs.hanzo.ai/docs/pass_through/langfuse)\n\n### Parameters\n\n- `endpoint: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.langfuse.patch('endpoint');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/config/pass_through_endpoint',
    httpMethod: 'post',
    summary: 'Create Pass Through Endpoints',
    description: 'Create new pass-through endpoint',
    stainlessPath: '(resource) config.pass_through_endpoint > (method) create',
    qualified: 'client.config.passThroughEndpoint.create',
    params: ['headers: object;', 'path: string;', 'target: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.config.passThroughEndpoint.create(headers: object, path: string, target: string): object`\n\n**post** `/config/pass_through_endpoint`\n\nCreate new pass-through endpoint\n\n### Parameters\n\n- `headers: object`\n  Key-value pairs of headers to be forwarded with the request. You can set any key value pair here and it will be forwarded to your target endpoint\n\n- `path: string`\n  The route to be added to the LLM Proxy Server.\n\n- `target: string`\n  The URL to which requests for this path should be forwarded.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst passThroughEndpoint = await client.config.passThroughEndpoint.create({\n  headers: {},\n  path: 'path',\n  target: 'target',\n});\n\nconsole.log(passThroughEndpoint);\n```",
  },
  {
    name: 'update',
    endpoint: '/config/pass_through_endpoint/{endpoint_id}',
    httpMethod: 'post',
    summary: 'Update Pass Through Endpoints',
    description: 'Update a pass-through endpoint',
    stainlessPath: '(resource) config.pass_through_endpoint > (method) update',
    qualified: 'client.config.passThroughEndpoint.update',
    params: ['endpoint_id: string;'],
    response: 'object',
    markdown:
      "## update\n\n`client.config.passThroughEndpoint.update(endpoint_id: string): object`\n\n**post** `/config/pass_through_endpoint/{endpoint_id}`\n\nUpdate a pass-through endpoint\n\n### Parameters\n\n- `endpoint_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst passThroughEndpoint = await client.config.passThroughEndpoint.update('endpoint_id');\n\nconsole.log(passThroughEndpoint);\n```",
  },
  {
    name: 'list',
    endpoint: '/config/pass_through_endpoint',
    httpMethod: 'get',
    summary: 'Get Pass Through Endpoints',
    description:
      'GET configured pass through endpoint.\n\nIf no endpoint_id given, return all configured endpoints.',
    stainlessPath: '(resource) config.pass_through_endpoint > (method) list',
    qualified: 'client.config.passThroughEndpoint.list',
    params: ['endpoint_id?: string;'],
    response: '{ endpoints: { headers: object; path: string; target: string; }[]; }',
    markdown:
      "## list\n\n`client.config.passThroughEndpoint.list(endpoint_id?: string): { endpoints: pass_through_generic_endpoint[]; }`\n\n**get** `/config/pass_through_endpoint`\n\nGET configured pass through endpoint.\n\nIf no endpoint_id given, return all configured endpoints.\n\n### Parameters\n\n- `endpoint_id?: string`\n\n### Returns\n\n- `{ endpoints: { headers: object; path: string; target: string; }[]; }`\n\n  - `endpoints: { headers: object; path: string; target: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst passThroughEndpointResponse = await client.config.passThroughEndpoint.list();\n\nconsole.log(passThroughEndpointResponse);\n```",
  },
  {
    name: 'delete',
    endpoint: '/config/pass_through_endpoint',
    httpMethod: 'delete',
    summary: 'Delete Pass Through Endpoints',
    description: 'Delete a pass-through endpoint\n\nReturns - the deleted endpoint',
    stainlessPath: '(resource) config.pass_through_endpoint > (method) delete',
    qualified: 'client.config.passThroughEndpoint.delete',
    params: ['endpoint_id: string;'],
    response: '{ endpoints: { headers: object; path: string; target: string; }[]; }',
    markdown:
      "## delete\n\n`client.config.passThroughEndpoint.delete(endpoint_id: string): { endpoints: pass_through_generic_endpoint[]; }`\n\n**delete** `/config/pass_through_endpoint`\n\nDelete a pass-through endpoint\n\nReturns - the deleted endpoint\n\n### Parameters\n\n- `endpoint_id: string`\n\n### Returns\n\n- `{ endpoints: { headers: object; path: string; target: string; }[]; }`\n\n  - `endpoints: { headers: object; path: string; target: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst passThroughEndpointResponse = await client.config.passThroughEndpoint.delete({ endpoint_id: 'endpoint_id' });\n\nconsole.log(passThroughEndpointResponse);\n```",
  },
  {
    name: 'ping',
    endpoint: '/test',
    httpMethod: 'get',
    summary: 'Test Endpoint',
    description:
      "[DEPRECATED] use `/health/liveliness` instead.\n\nA test endpoint that pings the proxy server to check if it's healthy.\n\nParameters:\n    request (Request): The incoming request.\n\nReturns:\n    dict: A dictionary containing the route of the request URL.",
    stainlessPath: '(resource) test > (method) ping',
    qualified: 'client.test.ping',
    response: 'object',
    markdown:
      "## ping\n\n`client.test.ping(): object`\n\n**get** `/test`\n\n[DEPRECATED] use `/health/liveliness` instead.\n\nA test endpoint that pings the proxy server to check if it's healthy.\n\nParameters:\n    request (Request): The incoming request.\n\nReturns:\n    dict: A dictionary containing the route of the request URL.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.test.ping();\n\nconsole.log(response);\n```",
  },
  {
    name: 'check_all',
    endpoint: '/health',
    httpMethod: 'get',
    summary: 'Health Endpoint',
    description:
      '🚨 USE `/health/liveliness` to health check the proxy 🚨\n\nSee more 👉 https://docs.hanzo.ai/docs/proxy/health\n\n\nCheck the health of all the endpoints in config.yaml\n\nTo run health checks in the background, add this to config.yaml:\n```\ngeneral_settings:\n    # ... other settings\n    background_health_checks: True\n```\nelse, the health checks will be run on models when /health is called.',
    stainlessPath: '(resource) health > (method) check_all',
    qualified: 'client.health.checkAll',
    params: ['model?: string;'],
    response: 'object',
    markdown:
      "## check_all\n\n`client.health.checkAll(model?: string): object`\n\n**get** `/health`\n\n🚨 USE `/health/liveliness` to health check the proxy 🚨\n\nSee more 👉 https://docs.hanzo.ai/docs/proxy/health\n\n\nCheck the health of all the endpoints in config.yaml\n\nTo run health checks in the background, add this to config.yaml:\n```\ngeneral_settings:\n    # ... other settings\n    background_health_checks: True\n```\nelse, the health checks will be run on models when /health is called.\n\n### Parameters\n\n- `model?: string`\n  Specify the model name (optional)\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.health.checkAll();\n\nconsole.log(response);\n```",
  },
  {
    name: 'check_liveliness',
    endpoint: '/health/liveliness',
    httpMethod: 'get',
    summary: 'Health Liveliness',
    description: 'Unprotected endpoint for checking if worker is alive',
    stainlessPath: '(resource) health > (method) check_liveliness',
    qualified: 'client.health.checkLiveliness',
    response: 'object',
    markdown:
      "## check_liveliness\n\n`client.health.checkLiveliness(): object`\n\n**get** `/health/liveliness`\n\nUnprotected endpoint for checking if worker is alive\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.health.checkLiveliness();\n\nconsole.log(response);\n```",
  },
  {
    name: 'check_liveness',
    endpoint: '/health/liveness',
    httpMethod: 'get',
    summary: 'Health Liveliness',
    description: 'Unprotected endpoint for checking if worker is alive',
    stainlessPath: '(resource) health > (method) check_liveness',
    qualified: 'client.health.checkLiveness',
    response: 'object',
    markdown:
      "## check_liveness\n\n`client.health.checkLiveness(): object`\n\n**get** `/health/liveness`\n\nUnprotected endpoint for checking if worker is alive\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.health.checkLiveness();\n\nconsole.log(response);\n```",
  },
  {
    name: 'check_readiness',
    endpoint: '/health/readiness',
    httpMethod: 'get',
    summary: 'Health Readiness',
    description: 'Unprotected endpoint for checking if worker can receive requests',
    stainlessPath: '(resource) health > (method) check_readiness',
    qualified: 'client.health.checkReadiness',
    response: 'object',
    markdown:
      "## check_readiness\n\n`client.health.checkReadiness(): object`\n\n**get** `/health/readiness`\n\nUnprotected endpoint for checking if worker can receive requests\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.health.checkReadiness();\n\nconsole.log(response);\n```",
  },
  {
    name: 'check_services',
    endpoint: '/health/services',
    httpMethod: 'get',
    summary: 'Health Services Endpoint',
    description:
      "Use this admin-only endpoint to check if the service is healthy.\n\nExample:\n```\ncurl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) health > (method) check_services',
    qualified: 'client.health.checkServices',
    params: ['service: string | string;'],
    response: 'object',
    markdown:
      "## check_services\n\n`client.health.checkServices(service: string | string): object`\n\n**get** `/health/services`\n\nUse this admin-only endpoint to check if the service is healthy.\n\nExample:\n```\ncurl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'\n```\n\n### Parameters\n\n- `service: string | string`\n  Specify the service being hit.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.health.checkServices({ service: 'slack_budget_alerts' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_callbacks',
    endpoint: '/active/callbacks',
    httpMethod: 'get',
    summary: 'Active Callbacks',
    description:
      'Returns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```',
    stainlessPath: '(resource) active > (method) list_callbacks',
    qualified: 'client.active.listCallbacks',
    response: 'object',
    markdown:
      '## list_callbacks\n\n`client.active.listCallbacks(): object`\n\n**get** `/active/callbacks`\n\nReturns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.active.listCallbacks();\n\nconsole.log(response);\n```',
  },
  {
    name: 'retrieve',
    endpoint: '/settings',
    httpMethod: 'get',
    summary: 'Active Callbacks',
    description:
      'Returns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```',
    stainlessPath: '(resource) settings > (method) retrieve',
    qualified: 'client.settings.retrieve',
    response: 'object',
    markdown:
      '## retrieve\n\n`client.settings.retrieve(): object`\n\n**get** `/settings`\n\nReturns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst setting = await client.settings.retrieve();\n\nconsole.log(setting);\n```',
  },
  {
    name: 'update',
    endpoint: '/key/update',
    httpMethod: 'post',
    summary: 'Update Key Fn',
    description:
      'Update an existing API key\'s parameters.\n\nParameters:\n- key: str - The key to update\n- key_alias: Optional[str] - User-friendly key alias\n- user_id: Optional[str] - User ID associated with key\n- team_id: Optional[str] - Team ID associated with key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call\n- tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n- spend: Optional[float] - Amount spent by key\n- max_budget: Optional[float] - Max budget for key\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- soft_budget: Optional[float] - [TODO] Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n- max_parallel_requests: Optional[int] - Rate limit for parallel requests\n- metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n- tpm_limit: Optional[int] - Tokens per minute limit\n- rpm_limit: Optional[int] - Requests per minute limit\n- model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n- model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n- allowed_cache_controls: Optional[list] - List of allowed cache control values\n- duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n- permissions: Optional[dict] - Key-specific permissions\n- send_invite_email: Optional[bool] - Send invite email to user_id\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- blocked: Optional[bool] - Whether the key is blocked\n- aliases: Optional[dict] - Model aliases for the key - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] Key-specific config.\n- temp_budget_increase: Optional[float] - Temporary budget increase for the key (Enterprise only).\n- temp_budget_expiry: Optional[str] - Expiry time for the temporary budget increase (Enterprise only).\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "key": "sk-1234",\n    "key_alias": "my-key",\n    "user_id": "user-1234",\n    "team_id": "team-1234",\n    "max_budget": 100,\n    "metadata": {"any_key": "any-val"},\n}\'\n```',
    stainlessPath: '(resource) key > (method) update',
    qualified: 'client.key.update',
    params: [
      'key: string;',
      'aliases?: object;',
      'allowed_cache_controls?: object[];',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'budget_id?: string;',
      'config?: object;',
      'duration?: string;',
      'enforced_params?: string[];',
      'guardrails?: string[];',
      'key_alias?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'metadata?: object;',
      'model_max_budget?: object;',
      'model_rpm_limit?: object;',
      'model_tpm_limit?: object;',
      'models?: object[];',
      'permissions?: object;',
      'rpm_limit?: number;',
      'spend?: number;',
      'tags?: string[];',
      'team_id?: string;',
      'temp_budget_expiry?: string;',
      'temp_budget_increase?: number;',
      'tpm_limit?: number;',
      'user_id?: string;',
      'llm-changed-by?: string;',
    ],
    response: 'object',
    markdown:
      '## update\n\n`client.key.update(key: string, aliases?: object, allowed_cache_controls?: object[], blocked?: boolean, budget_duration?: string, budget_id?: string, config?: object, duration?: string, enforced_params?: string[], guardrails?: string[], key_alias?: string, max_budget?: number, max_parallel_requests?: number, metadata?: object, model_max_budget?: object, model_rpm_limit?: object, model_tpm_limit?: object, models?: object[], permissions?: object, rpm_limit?: number, spend?: number, tags?: string[], team_id?: string, temp_budget_expiry?: string, temp_budget_increase?: number, tpm_limit?: number, user_id?: string, llm-changed-by?: string): object`\n\n**post** `/key/update`\n\nUpdate an existing API key\'s parameters.\n\nParameters:\n- key: str - The key to update\n- key_alias: Optional[str] - User-friendly key alias\n- user_id: Optional[str] - User ID associated with key\n- team_id: Optional[str] - Team ID associated with key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call\n- tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n- spend: Optional[float] - Amount spent by key\n- max_budget: Optional[float] - Max budget for key\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- soft_budget: Optional[float] - [TODO] Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n- max_parallel_requests: Optional[int] - Rate limit for parallel requests\n- metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n- tpm_limit: Optional[int] - Tokens per minute limit\n- rpm_limit: Optional[int] - Requests per minute limit\n- model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n- model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n- allowed_cache_controls: Optional[list] - List of allowed cache control values\n- duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n- permissions: Optional[dict] - Key-specific permissions\n- send_invite_email: Optional[bool] - Send invite email to user_id\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- blocked: Optional[bool] - Whether the key is blocked\n- aliases: Optional[dict] - Model aliases for the key - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] Key-specific config.\n- temp_budget_increase: Optional[float] - Temporary budget increase for the key (Enterprise only).\n- temp_budget_expiry: Optional[str] - Expiry time for the temporary budget increase (Enterprise only).\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "key": "sk-1234",\n    "key_alias": "my-key",\n    "user_id": "user-1234",\n    "team_id": "team-1234",\n    "max_budget": 100,\n    "metadata": {"any_key": "any-val"},\n}\'\n```\n\n### Parameters\n\n- `key: string`\n\n- `aliases?: object`\n\n- `allowed_cache_controls?: object[]`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `budget_id?: string`\n\n- `config?: object`\n\n- `duration?: string`\n\n- `enforced_params?: string[]`\n\n- `guardrails?: string[]`\n\n- `key_alias?: string`\n\n- `max_budget?: number`\n\n- `max_parallel_requests?: number`\n\n- `metadata?: object`\n\n- `model_max_budget?: object`\n\n- `model_rpm_limit?: object`\n\n- `model_tpm_limit?: object`\n\n- `models?: object[]`\n\n- `permissions?: object`\n\n- `rpm_limit?: number`\n\n- `spend?: number`\n\n- `tags?: string[]`\n\n- `team_id?: string`\n\n- `temp_budget_expiry?: string`\n\n- `temp_budget_increase?: number`\n\n- `tpm_limit?: number`\n\n- `user_id?: string`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst key = await client.key.update({ key: \'key\' });\n\nconsole.log(key);\n```',
  },
  {
    name: 'list',
    endpoint: '/key/list',
    httpMethod: 'get',
    summary: 'List Keys',
    description:
      'List all keys for a given user / team / organization.\n\nReturns:\n    {\n        "keys": List[str] or List[UserAPIKeyAuth],\n        "total_count": int,\n        "current_page": int,\n        "total_pages": int,\n    }',
    stainlessPath: '(resource) key > (method) list',
    qualified: 'client.key.list',
    params: [
      'include_team_keys?: boolean;',
      'key_alias?: string;',
      'organization_id?: string;',
      'page?: number;',
      'return_full_object?: boolean;',
      'size?: number;',
      'team_id?: string;',
      'user_id?: string;',
    ],
    response:
      '{ current_page?: number; keys?: string | object[]; total_count?: number; total_pages?: number; }',
    markdown:
      "## list\n\n`client.key.list(include_team_keys?: boolean, key_alias?: string, organization_id?: string, page?: number, return_full_object?: boolean, size?: number, team_id?: string, user_id?: string): { current_page?: number; keys?: string | object[]; total_count?: number; total_pages?: number; }`\n\n**get** `/key/list`\n\nList all keys for a given user / team / organization.\n\nReturns:\n    {\n        \"keys\": List[str] or List[UserAPIKeyAuth],\n        \"total_count\": int,\n        \"current_page\": int,\n        \"total_pages\": int,\n    }\n\n### Parameters\n\n- `include_team_keys?: boolean`\n  Include all keys for teams that user is an admin of.\n\n- `key_alias?: string`\n  Filter keys by key alias\n\n- `organization_id?: string`\n  Filter keys by organization ID\n\n- `page?: number`\n  Page number\n\n- `return_full_object?: boolean`\n  Return full key object\n\n- `size?: number`\n  Page size\n\n- `team_id?: string`\n  Filter keys by team ID\n\n- `user_id?: string`\n  Filter keys by user ID\n\n### Returns\n\n- `{ current_page?: number; keys?: string | { token?: string; aliases?: object; allowed_cache_controls?: object[]; allowed_model_region?: 'eu' | 'us'; api_key?: string; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; config?: object; created_at?: string; created_by?: string; end_user_id?: string; end_user_max_budget?: number; end_user_rpm_limit?: number; end_user_tpm_limit?: number; expires?: string | string; key_alias?: string; key_name?: string; last_refreshed_at?: number; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; org_id?: string; parent_otel_span?: object; permissions?: object; rpm_limit?: number; rpm_limit_per_model?: object; soft_budget?: number; soft_budget_cooldown?: boolean; spend?: number; team_alias?: string; team_blocked?: boolean; team_id?: string; team_max_budget?: number; team_member?: object; team_member_spend?: number; team_metadata?: object; team_model_aliases?: object; team_models?: object[]; team_rpm_limit?: number; team_spend?: number; team_tpm_limit?: number; tpm_limit?: number; tpm_limit_per_model?: object; updated_at?: string; updated_by?: string; user_email?: string; user_id?: string; user_role?: string; user_rpm_limit?: number; user_tpm_limit?: number; }[]; total_count?: number; total_pages?: number; }`\n\n  - `current_page?: number`\n  - `keys?: string | { token?: string; aliases?: object; allowed_cache_controls?: object[]; allowed_model_region?: 'eu' | 'us'; api_key?: string; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; config?: object; created_at?: string; created_by?: string; end_user_id?: string; end_user_max_budget?: number; end_user_rpm_limit?: number; end_user_tpm_limit?: number; expires?: string | string; key_alias?: string; key_name?: string; last_refreshed_at?: number; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; org_id?: string; parent_otel_span?: object; permissions?: object; rpm_limit?: number; rpm_limit_per_model?: object; soft_budget?: number; soft_budget_cooldown?: boolean; spend?: number; team_alias?: string; team_blocked?: boolean; team_id?: string; team_max_budget?: number; team_member?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }; team_member_spend?: number; team_metadata?: object; team_model_aliases?: object; team_models?: object[]; team_rpm_limit?: number; team_spend?: number; team_tpm_limit?: number; tpm_limit?: number; tpm_limit_per_model?: object; updated_at?: string; updated_by?: string; user_email?: string; user_id?: string; user_role?: string; user_rpm_limit?: number; user_tpm_limit?: number; }[]`\n  - `total_count?: number`\n  - `total_pages?: number`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst keys = await client.key.list();\n\nconsole.log(keys);\n```",
  },
  {
    name: 'delete',
    endpoint: '/key/delete',
    httpMethod: 'post',
    summary: 'Delete Key Fn',
    description:
      'Delete a key from the key management system.\n\nParameters::\n- keys (List[str]): A list of keys or hashed keys to delete. Example {"keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n- key_aliases (List[str]): A list of key aliases to delete. Can be passed instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}\n\nReturns:\n- deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]\n}\'\n```\n\nRaises:\n    HTTPException: If an error occurs during key deletion.',
    stainlessPath: '(resource) key > (method) delete',
    qualified: 'client.key.delete',
    params: ['key_aliases?: string[];', 'keys?: string[];', 'llm-changed-by?: string;'],
    response: 'object',
    markdown:
      '## delete\n\n`client.key.delete(key_aliases?: string[], keys?: string[], llm-changed-by?: string): object`\n\n**post** `/key/delete`\n\nDelete a key from the key management system.\n\nParameters::\n- keys (List[str]): A list of keys or hashed keys to delete. Example {"keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n- key_aliases (List[str]): A list of key aliases to delete. Can be passed instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}\n\nReturns:\n- deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]\n}\'\n```\n\nRaises:\n    HTTPException: If an error occurs during key deletion.\n\n### Parameters\n\n- `key_aliases?: string[]`\n\n- `keys?: string[]`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst key = await client.key.delete();\n\nconsole.log(key);\n```',
  },
  {
    name: 'block',
    endpoint: '/key/block',
    httpMethod: 'post',
    summary: 'Block Key',
    description:
      "Block an Virtual key from making any requests.\n\nParameters:\n- key: str - The key to block. Can be either the unhashed key (sk-...) or the hashed key value\n\n Example:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can block keys.",
    stainlessPath: '(resource) key > (method) block',
    qualified: 'client.key.block',
    params: ['key: string;', 'llm-changed-by?: string;'],
    response:
      '{ token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; config?: object; created_at?: string; created_by?: string; expires?: string | string; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; org_id?: string; permissions?: object; rpm_limit?: number; soft_budget_cooldown?: boolean; spend?: number; team_id?: string; tpm_limit?: number; updated_at?: string; updated_by?: string; user_id?: string; }',
    markdown:
      "## block\n\n`client.key.block(key: string, llm-changed-by?: string): { token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; config?: object; created_at?: string; created_by?: string; expires?: string | string; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; org_id?: string; permissions?: object; rpm_limit?: number; soft_budget_cooldown?: boolean; spend?: number; team_id?: string; tpm_limit?: number; updated_at?: string; updated_by?: string; user_id?: string; }`\n\n**post** `/key/block`\n\nBlock an Virtual key from making any requests.\n\nParameters:\n- key: str - The key to block. Can be either the unhashed key (sk-...) or the hashed key value\n\n Example:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can block keys.\n\n### Parameters\n\n- `key: string`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `{ token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; config?: object; created_at?: string; created_by?: string; expires?: string | string; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; org_id?: string; permissions?: object; rpm_limit?: number; soft_budget_cooldown?: boolean; spend?: number; team_id?: string; tpm_limit?: number; updated_at?: string; updated_by?: string; user_id?: string; }`\n\n  - `token?: string`\n  - `aliases?: object`\n  - `allowed_cache_controls?: object[]`\n  - `blocked?: boolean`\n  - `budget_duration?: string`\n  - `budget_reset_at?: string`\n  - `config?: object`\n  - `created_at?: string`\n  - `created_by?: string`\n  - `expires?: string | string`\n  - `key_alias?: string`\n  - `key_name?: string`\n  - `llm_budget_table?: object`\n  - `max_budget?: number`\n  - `max_parallel_requests?: number`\n  - `metadata?: object`\n  - `model_max_budget?: object`\n  - `model_spend?: object`\n  - `models?: object[]`\n  - `org_id?: string`\n  - `permissions?: object`\n  - `rpm_limit?: number`\n  - `soft_budget_cooldown?: boolean`\n  - `spend?: number`\n  - `team_id?: string`\n  - `tpm_limit?: number`\n  - `updated_at?: string`\n  - `updated_by?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.key.block({ key: 'key' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'check_health',
    endpoint: '/key/health',
    httpMethod: 'post',
    summary: 'Key Health',
    description:
      'Check the health of the key\n\nChecks:\n- If key based logging is configured correctly - sends a test log\n\nUsage \n\nPass the key in the request header\n\n```bash\ncurl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"\n```\n\nResponse when logging callbacks are setup correctly:\n\n```json\n{\n  "key": "healthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "healthy",\n    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to [\'gcs_bucket\']"\n  }\n}\n```\n\n\nResponse when logging callbacks are not setup correctly:\n```json\n{\n  "key": "unhealthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "unhealthy",\n    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."\n  }\n}\n```',
    stainlessPath: '(resource) key > (method) check_health',
    qualified: 'client.key.checkHealth',
    response:
      "{ key?: 'healthy' | 'unhealthy'; logging_callbacks?: { callbacks?: string[]; details?: string; status?: 'healthy' | 'unhealthy'; }; }",
    markdown:
      '## check_health\n\n`client.key.checkHealth(): { key?: \'healthy\' | \'unhealthy\'; logging_callbacks?: object; }`\n\n**post** `/key/health`\n\nCheck the health of the key\n\nChecks:\n- If key based logging is configured correctly - sends a test log\n\nUsage \n\nPass the key in the request header\n\n```bash\ncurl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"\n```\n\nResponse when logging callbacks are setup correctly:\n\n```json\n{\n  "key": "healthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "healthy",\n    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to [\'gcs_bucket\']"\n  }\n}\n```\n\n\nResponse when logging callbacks are not setup correctly:\n```json\n{\n  "key": "unhealthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "unhealthy",\n    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."\n  }\n}\n```\n\n### Returns\n\n- `{ key?: \'healthy\' | \'unhealthy\'; logging_callbacks?: { callbacks?: string[]; details?: string; status?: \'healthy\' | \'unhealthy\'; }; }`\n\n  - `key?: \'healthy\' | \'unhealthy\'`\n  - `logging_callbacks?: { callbacks?: string[]; details?: string; status?: \'healthy\' | \'unhealthy\'; }`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.key.checkHealth();\n\nconsole.log(response);\n```',
  },
  {
    name: 'generate',
    endpoint: '/key/generate',
    httpMethod: 'post',
    summary: 'Generate Key Fn',
    description:
      'Generate an API key based on the provided data.\n\nDocs: https://docs.hanzo.ai/docs/proxy/virtual_keys\n\nParameters:\n- duration: Optional[str] - Specify the length of time the token is valid for. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- key_alias: Optional[str] - User defined key alias\n- key: Optional[str] - User defined key value. If not set, a 16-digit unique sk-key is created for you.\n- team_id: Optional[str] - The team id of the key\n- user_id: Optional[str] - The user id of the key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n- aliases: Optional[dict] - Any alias mappings, on top of anything in the config.yaml model list. - https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models\n- config: Optional[dict] - any key-specific configs, overrides config in config.yaml\n- spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by proxy whenever key is used. https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend\n- send_invite_email: Optional[bool] - Whether to send an invite email to the user_id, with the generate key\n- max_budget: Optional[float] - Specify max budget for a given key.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- metadata: Optional[dict] - Metadata for key, store information for key. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- permissions: Optional[dict] - key-specific permissions. Currently just used for turning off pii masking (if connected). Example - {"pii": false}\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then no model specific budget.\n- model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific rpm limit.\n- model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific tpm limit.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request\n- blocked: Optional[bool] - Whether the key is blocked.\n- rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per minute)\n- tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per minute)\n- soft_budget: Optional[float] - Specify soft budget for a given key. Will trigger a slack alert when this soft budget is reached.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n\nExamples:\n\n1. Allow users to turn on/off pii masking\n\n```bash\ncurl --location \'http://0.0.0.0:4000/key/generate\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "permissions": {"allow_pii_controls": true}\n}\'\n```\n\nReturns:\n- key: (str) The generated api key\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.',
    stainlessPath: '(resource) key > (method) generate',
    qualified: 'client.key.generate',
    params: [
      'aliases?: object;',
      'allowed_cache_controls?: object[];',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'budget_id?: string;',
      'config?: object;',
      'duration?: string;',
      'enforced_params?: string[];',
      'guardrails?: string[];',
      'key?: string;',
      'key_alias?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'metadata?: object;',
      'model_max_budget?: object;',
      'model_rpm_limit?: object;',
      'model_tpm_limit?: object;',
      'models?: object[];',
      'permissions?: object;',
      'rpm_limit?: number;',
      'send_invite_email?: boolean;',
      'soft_budget?: number;',
      'spend?: number;',
      'tags?: string[];',
      'team_id?: string;',
      'tpm_limit?: number;',
      'user_id?: string;',
      'llm-changed-by?: string;',
    ],
    response:
      '{ expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; token_id?: string; tpm_limit?: number; updated_by?: string; user_id?: string; }',
    markdown:
      '## generate\n\n`client.key.generate(aliases?: object, allowed_cache_controls?: object[], blocked?: boolean, budget_duration?: string, budget_id?: string, config?: object, duration?: string, enforced_params?: string[], guardrails?: string[], key?: string, key_alias?: string, max_budget?: number, max_parallel_requests?: number, metadata?: object, model_max_budget?: object, model_rpm_limit?: object, model_tpm_limit?: object, models?: object[], permissions?: object, rpm_limit?: number, send_invite_email?: boolean, soft_budget?: number, spend?: number, tags?: string[], team_id?: string, tpm_limit?: number, user_id?: string, llm-changed-by?: string): { expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; token_id?: string; tpm_limit?: number; updated_by?: string; user_id?: string; }`\n\n**post** `/key/generate`\n\nGenerate an API key based on the provided data.\n\nDocs: https://docs.hanzo.ai/docs/proxy/virtual_keys\n\nParameters:\n- duration: Optional[str] - Specify the length of time the token is valid for. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- key_alias: Optional[str] - User defined key alias\n- key: Optional[str] - User defined key value. If not set, a 16-digit unique sk-key is created for you.\n- team_id: Optional[str] - The team id of the key\n- user_id: Optional[str] - The user id of the key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n- aliases: Optional[dict] - Any alias mappings, on top of anything in the config.yaml model list. - https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models\n- config: Optional[dict] - any key-specific configs, overrides config in config.yaml\n- spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by proxy whenever key is used. https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend\n- send_invite_email: Optional[bool] - Whether to send an invite email to the user_id, with the generate key\n- max_budget: Optional[float] - Specify max budget for a given key.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- metadata: Optional[dict] - Metadata for key, store information for key. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- permissions: Optional[dict] - key-specific permissions. Currently just used for turning off pii masking (if connected). Example - {"pii": false}\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then no model specific budget.\n- model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific rpm limit.\n- model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific tpm limit.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request\n- blocked: Optional[bool] - Whether the key is blocked.\n- rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per minute)\n- tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per minute)\n- soft_budget: Optional[float] - Specify soft budget for a given key. Will trigger a slack alert when this soft budget is reached.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n\nExamples:\n\n1. Allow users to turn on/off pii masking\n\n```bash\ncurl --location \'http://0.0.0.0:4000/key/generate\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "permissions": {"allow_pii_controls": true}\n}\'\n```\n\nReturns:\n- key: (str) The generated api key\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.\n\n### Parameters\n\n- `aliases?: object`\n\n- `allowed_cache_controls?: object[]`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `budget_id?: string`\n\n- `config?: object`\n\n- `duration?: string`\n\n- `enforced_params?: string[]`\n\n- `guardrails?: string[]`\n\n- `key?: string`\n\n- `key_alias?: string`\n\n- `max_budget?: number`\n\n- `max_parallel_requests?: number`\n\n- `metadata?: object`\n\n- `model_max_budget?: object`\n\n- `model_rpm_limit?: object`\n\n- `model_tpm_limit?: object`\n\n- `models?: object[]`\n\n- `permissions?: object`\n\n- `rpm_limit?: number`\n\n- `send_invite_email?: boolean`\n\n- `soft_budget?: number`\n\n- `spend?: number`\n\n- `tags?: string[]`\n\n- `team_id?: string`\n\n- `tpm_limit?: number`\n\n- `user_id?: string`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `{ expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; token_id?: string; tpm_limit?: number; updated_by?: string; user_id?: string; }`\n\n  - `expires: string`\n  - `key: string`\n  - `token?: string`\n  - `aliases?: object`\n  - `allowed_cache_controls?: object[]`\n  - `blocked?: boolean`\n  - `budget_duration?: string`\n  - `budget_id?: string`\n  - `config?: object`\n  - `created_by?: string`\n  - `duration?: string`\n  - `enforced_params?: string[]`\n  - `guardrails?: string[]`\n  - `key_alias?: string`\n  - `key_name?: string`\n  - `llm_budget_table?: object`\n  - `max_budget?: number`\n  - `max_parallel_requests?: number`\n  - `metadata?: object`\n  - `model_max_budget?: object`\n  - `model_rpm_limit?: object`\n  - `model_tpm_limit?: object`\n  - `models?: object[]`\n  - `permissions?: object`\n  - `rpm_limit?: number`\n  - `spend?: number`\n  - `tags?: string[]`\n  - `team_id?: string`\n  - `token_id?: string`\n  - `tpm_limit?: number`\n  - `updated_by?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst generateKeyResponse = await client.key.generate();\n\nconsole.log(generateKeyResponse);\n```',
  },
  {
    name: 'regenerate_by_key',
    endpoint: '/key/{key}/regenerate',
    httpMethod: 'post',
    summary: 'Regenerate Key Fn',
    description:
      'Regenerate an existing API key while optionally updating its parameters.\n\nParameters:\n- key: str (path parameter) - The key to regenerate\n- data: Optional[RegenerateKeyRequest] - Request body containing optional parameters to update\n    - key_alias: Optional[str] - User-friendly key alias\n    - user_id: Optional[str] - User ID associated with key\n    - team_id: Optional[str] - Team ID associated with key\n    - models: Optional[list] - Model_name\'s a user is allowed to call\n    - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n    - spend: Optional[float] - Amount spent by key\n    - max_budget: Optional[float] - Max budget for key\n    - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n    - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n    - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n    - max_parallel_requests: Optional[int] - Rate limit for parallel requests\n    - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n    - tpm_limit: Optional[int] - Tokens per minute limit\n    - rpm_limit: Optional[int] - Requests per minute limit\n    - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n    - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values\n    - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n    - permissions: Optional[dict] - Key-specific permissions\n    - guardrails: Optional[List[str]] - List of active guardrails for the key\n    - blocked: Optional[bool] - Whether the key is blocked\n\n\nReturns:\n- GenerateKeyResponse containing the new key and its updated parameters\n\nExample:\n```bash\ncurl --location --request POST \'http://localhost:4000/key/sk-1234/regenerate\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "max_budget": 100,\n    "metadata": {"team": "core-infra"},\n    "models": ["gpt-4", "gpt-3.5-turbo"]\n}\'\n```\n\nNote: This is an Enterprise feature. It requires a premium license to use.',
    stainlessPath: '(resource) key > (method) regenerate_by_key',
    qualified: 'client.key.regenerateByKey',
    params: [
      'key: string;',
      'aliases?: object;',
      'allowed_cache_controls?: object[];',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'budget_id?: string;',
      'config?: object;',
      'duration?: string;',
      'enforced_params?: string[];',
      'guardrails?: string[];',
      'key?: string;',
      'key_alias?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'metadata?: object;',
      'model_max_budget?: object;',
      'model_rpm_limit?: object;',
      'model_tpm_limit?: object;',
      'models?: object[];',
      'new_master_key?: string;',
      'permissions?: object;',
      'rpm_limit?: number;',
      'send_invite_email?: boolean;',
      'soft_budget?: number;',
      'spend?: number;',
      'tags?: string[];',
      'team_id?: string;',
      'tpm_limit?: number;',
      'user_id?: string;',
      'llm-changed-by?: string;',
    ],
    response:
      '{ expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; token_id?: string; tpm_limit?: number; updated_by?: string; user_id?: string; }',
    markdown:
      '## regenerate_by_key\n\n`client.key.regenerateByKey(key: string, aliases?: object, allowed_cache_controls?: object[], blocked?: boolean, budget_duration?: string, budget_id?: string, config?: object, duration?: string, enforced_params?: string[], guardrails?: string[], key?: string, key_alias?: string, max_budget?: number, max_parallel_requests?: number, metadata?: object, model_max_budget?: object, model_rpm_limit?: object, model_tpm_limit?: object, models?: object[], new_master_key?: string, permissions?: object, rpm_limit?: number, send_invite_email?: boolean, soft_budget?: number, spend?: number, tags?: string[], team_id?: string, tpm_limit?: number, user_id?: string, llm-changed-by?: string): { expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; token_id?: string; tpm_limit?: number; updated_by?: string; user_id?: string; }`\n\n**post** `/key/{key}/regenerate`\n\nRegenerate an existing API key while optionally updating its parameters.\n\nParameters:\n- key: str (path parameter) - The key to regenerate\n- data: Optional[RegenerateKeyRequest] - Request body containing optional parameters to update\n    - key_alias: Optional[str] - User-friendly key alias\n    - user_id: Optional[str] - User ID associated with key\n    - team_id: Optional[str] - Team ID associated with key\n    - models: Optional[list] - Model_name\'s a user is allowed to call\n    - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n    - spend: Optional[float] - Amount spent by key\n    - max_budget: Optional[float] - Max budget for key\n    - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n    - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n    - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n    - max_parallel_requests: Optional[int] - Rate limit for parallel requests\n    - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n    - tpm_limit: Optional[int] - Tokens per minute limit\n    - rpm_limit: Optional[int] - Requests per minute limit\n    - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n    - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values\n    - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n    - permissions: Optional[dict] - Key-specific permissions\n    - guardrails: Optional[List[str]] - List of active guardrails for the key\n    - blocked: Optional[bool] - Whether the key is blocked\n\n\nReturns:\n- GenerateKeyResponse containing the new key and its updated parameters\n\nExample:\n```bash\ncurl --location --request POST \'http://localhost:4000/key/sk-1234/regenerate\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "max_budget": 100,\n    "metadata": {"team": "core-infra"},\n    "models": ["gpt-4", "gpt-3.5-turbo"]\n}\'\n```\n\nNote: This is an Enterprise feature. It requires a premium license to use.\n\n### Parameters\n\n- `key: string`\n\n- `aliases?: object`\n\n- `allowed_cache_controls?: object[]`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `budget_id?: string`\n\n- `config?: object`\n\n- `duration?: string`\n\n- `enforced_params?: string[]`\n\n- `guardrails?: string[]`\n\n- `key?: string`\n\n- `key_alias?: string`\n\n- `max_budget?: number`\n\n- `max_parallel_requests?: number`\n\n- `metadata?: object`\n\n- `model_max_budget?: object`\n\n- `model_rpm_limit?: object`\n\n- `model_tpm_limit?: object`\n\n- `models?: object[]`\n\n- `new_master_key?: string`\n\n- `permissions?: object`\n\n- `rpm_limit?: number`\n\n- `send_invite_email?: boolean`\n\n- `soft_budget?: number`\n\n- `spend?: number`\n\n- `tags?: string[]`\n\n- `team_id?: string`\n\n- `tpm_limit?: number`\n\n- `user_id?: string`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `{ expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; token_id?: string; tpm_limit?: number; updated_by?: string; user_id?: string; }`\n\n  - `expires: string`\n  - `key: string`\n  - `token?: string`\n  - `aliases?: object`\n  - `allowed_cache_controls?: object[]`\n  - `blocked?: boolean`\n  - `budget_duration?: string`\n  - `budget_id?: string`\n  - `config?: object`\n  - `created_by?: string`\n  - `duration?: string`\n  - `enforced_params?: string[]`\n  - `guardrails?: string[]`\n  - `key_alias?: string`\n  - `key_name?: string`\n  - `llm_budget_table?: object`\n  - `max_budget?: number`\n  - `max_parallel_requests?: number`\n  - `metadata?: object`\n  - `model_max_budget?: object`\n  - `model_rpm_limit?: object`\n  - `model_tpm_limit?: object`\n  - `models?: object[]`\n  - `permissions?: object`\n  - `rpm_limit?: number`\n  - `spend?: number`\n  - `tags?: string[]`\n  - `team_id?: string`\n  - `token_id?: string`\n  - `tpm_limit?: number`\n  - `updated_by?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst generateKeyResponse = await client.key.regenerateByKey(\'key\');\n\nconsole.log(generateKeyResponse);\n```',
  },
  {
    name: 'retrieve_info',
    endpoint: '/key/info',
    httpMethod: 'get',
    summary: 'Info Key Fn',
    description:
      'Retrieve information about a key.\nParameters:\n    key: Optional[str] = Query parameter representing the key in the request\n    user_api_key_dict: UserAPIKeyAuth = Dependency representing the user\'s API key\nReturns:\n    Dict containing the key and its associated information\n\nExample Curl:\n```\ncurl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"\n```\n\nExample Curl - if no key is passed, it will use the Key Passed in Authorization Header\n```\ncurl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"\n```',
    stainlessPath: '(resource) key > (method) retrieve_info',
    qualified: 'client.key.retrieveInfo',
    params: ['key?: string;'],
    response: 'object',
    markdown:
      '## retrieve_info\n\n`client.key.retrieveInfo(key?: string): object`\n\n**get** `/key/info`\n\nRetrieve information about a key.\nParameters:\n    key: Optional[str] = Query parameter representing the key in the request\n    user_api_key_dict: UserAPIKeyAuth = Dependency representing the user\'s API key\nReturns:\n    Dict containing the key and its associated information\n\nExample Curl:\n```\ncurl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"\n```\n\nExample Curl - if no key is passed, it will use the Key Passed in Authorization Header\n```\ncurl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"\n```\n\n### Parameters\n\n- `key?: string`\n  Key in the request parameters\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.key.retrieveInfo();\n\nconsole.log(response);\n```',
  },
  {
    name: 'unblock',
    endpoint: '/key/unblock',
    httpMethod: 'post',
    summary: 'Unblock Key',
    description:
      "Unblock a Virtual key to allow it to make requests again.\n\nParameters:\n- key: str - The key to unblock. Can be either the unhashed key (sk-...) or the hashed key value\n\nExample:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can unblock keys.",
    stainlessPath: '(resource) key > (method) unblock',
    qualified: 'client.key.unblock',
    params: ['key: string;', 'llm-changed-by?: string;'],
    response: 'object',
    markdown:
      "## unblock\n\n`client.key.unblock(key: string, llm-changed-by?: string): object`\n\n**post** `/key/unblock`\n\nUnblock a Virtual key to allow it to make requests again.\n\nParameters:\n- key: str - The key to unblock. Can be either the unhashed key (sk-...) or the hashed key value\n\nExample:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can unblock keys.\n\n### Parameters\n\n- `key: string`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.key.unblock({ key: 'key' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/user/new',
    httpMethod: 'post',
    summary: 'New User',
    description:
      'Use this to create a new INTERNAL user with a budget.\nInternal Users can access LLM Admin UI to make keys, request access to models.\nThis creates a new user and generates a new api key for the new user. The new api key is returned.\n\nReturns user id, budget + new key.\n\nParameters:\n- user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n- user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n- teams: Optional[list] - specify a list of team id\'s a user belongs to.\n- user_email: Optional[str] - Specify a user email.\n- send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n- user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n- max_budget: Optional[float] - Specify max budget for a given user.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models). Set to [\'no-default-models\'] to block all model access. Restricting user to only team-based model access.\n- tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n- rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n- auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n- aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n- blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n- guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n- permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n- metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n- model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n- model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n- duration: Optional[str] - Duration for the key auto-created on `/user/new`. Default is None.\n- key_alias: Optional[str] - Alias for the key auto-created on `/user/new`. Default is None.\n\nReturns:\n- key: (str) The generated api key for the user\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.\n- max_budget: (float|None) Max budget for given user.\n\nUsage Example \n\n```shell\n curl -X POST "http://localhost:4000/user/new"      -H "Content-Type: application/json"      -H "Authorization: Bearer sk-1234"      -d \'{\n     "username": "new_user",\n     "email": "new_user@example.com"\n }\'\n```',
    stainlessPath: '(resource) user > (method) create',
    qualified: 'client.user.create',
    params: [
      'aliases?: object;',
      'allowed_cache_controls?: object[];',
      'auto_create_key?: boolean;',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'config?: object;',
      'duration?: string;',
      'guardrails?: string[];',
      'key_alias?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'metadata?: object;',
      'model_max_budget?: object;',
      'model_rpm_limit?: object;',
      'model_tpm_limit?: object;',
      'models?: object[];',
      'permissions?: object;',
      'rpm_limit?: number;',
      'send_invite_email?: boolean;',
      'spend?: number;',
      'team_id?: string;',
      'teams?: object[];',
      'tpm_limit?: number;',
      'user_alias?: string;',
      'user_email?: string;',
      'user_id?: string;',
      "user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer';",
    ],
    response:
      "{ expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; teams?: object[]; token_id?: string; tpm_limit?: number; updated_by?: string; user_alias?: string; user_email?: string; user_id?: string; user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer'; }",
    markdown:
      '## create\n\n`client.user.create(aliases?: object, allowed_cache_controls?: object[], auto_create_key?: boolean, blocked?: boolean, budget_duration?: string, config?: object, duration?: string, guardrails?: string[], key_alias?: string, max_budget?: number, max_parallel_requests?: number, metadata?: object, model_max_budget?: object, model_rpm_limit?: object, model_tpm_limit?: object, models?: object[], permissions?: object, rpm_limit?: number, send_invite_email?: boolean, spend?: number, team_id?: string, teams?: object[], tpm_limit?: number, user_alias?: string, user_email?: string, user_id?: string, user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'): { expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; teams?: object[]; token_id?: string; tpm_limit?: number; updated_by?: string; user_alias?: string; user_email?: string; user_id?: string; user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'; }`\n\n**post** `/user/new`\n\nUse this to create a new INTERNAL user with a budget.\nInternal Users can access LLM Admin UI to make keys, request access to models.\nThis creates a new user and generates a new api key for the new user. The new api key is returned.\n\nReturns user id, budget + new key.\n\nParameters:\n- user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n- user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n- teams: Optional[list] - specify a list of team id\'s a user belongs to.\n- user_email: Optional[str] - Specify a user email.\n- send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n- user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n- max_budget: Optional[float] - Specify max budget for a given user.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models). Set to [\'no-default-models\'] to block all model access. Restricting user to only team-based model access.\n- tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n- rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n- auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n- aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n- blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n- guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n- permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n- metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n- model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n- model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n- duration: Optional[str] - Duration for the key auto-created on `/user/new`. Default is None.\n- key_alias: Optional[str] - Alias for the key auto-created on `/user/new`. Default is None.\n\nReturns:\n- key: (str) The generated api key for the user\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.\n- max_budget: (float|None) Max budget for given user.\n\nUsage Example \n\n```shell\n curl -X POST "http://localhost:4000/user/new"      -H "Content-Type: application/json"      -H "Authorization: Bearer sk-1234"      -d \'{\n     "username": "new_user",\n     "email": "new_user@example.com"\n }\'\n```\n\n### Parameters\n\n- `aliases?: object`\n\n- `allowed_cache_controls?: object[]`\n\n- `auto_create_key?: boolean`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `config?: object`\n\n- `duration?: string`\n\n- `guardrails?: string[]`\n\n- `key_alias?: string`\n\n- `max_budget?: number`\n\n- `max_parallel_requests?: number`\n\n- `metadata?: object`\n\n- `model_max_budget?: object`\n\n- `model_rpm_limit?: object`\n\n- `model_tpm_limit?: object`\n\n- `models?: object[]`\n\n- `permissions?: object`\n\n- `rpm_limit?: number`\n\n- `send_invite_email?: boolean`\n\n- `spend?: number`\n\n- `team_id?: string`\n\n- `teams?: object[]`\n\n- `tpm_limit?: number`\n\n- `user_alias?: string`\n\n- `user_email?: string`\n\n- `user_id?: string`\n\n- `user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'`\n\n### Returns\n\n- `{ expires: string; key: string; token?: string; aliases?: object; allowed_cache_controls?: object[]; blocked?: boolean; budget_duration?: string; budget_id?: string; config?: object; created_by?: string; duration?: string; enforced_params?: string[]; guardrails?: string[]; key_alias?: string; key_name?: string; llm_budget_table?: object; max_budget?: number; max_parallel_requests?: number; metadata?: object; model_max_budget?: object; model_rpm_limit?: object; model_tpm_limit?: object; models?: object[]; permissions?: object; rpm_limit?: number; spend?: number; tags?: string[]; team_id?: string; teams?: object[]; token_id?: string; tpm_limit?: number; updated_by?: string; user_alias?: string; user_email?: string; user_id?: string; user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'; }`\n\n  - `expires: string`\n  - `key: string`\n  - `token?: string`\n  - `aliases?: object`\n  - `allowed_cache_controls?: object[]`\n  - `blocked?: boolean`\n  - `budget_duration?: string`\n  - `budget_id?: string`\n  - `config?: object`\n  - `created_by?: string`\n  - `duration?: string`\n  - `enforced_params?: string[]`\n  - `guardrails?: string[]`\n  - `key_alias?: string`\n  - `key_name?: string`\n  - `llm_budget_table?: object`\n  - `max_budget?: number`\n  - `max_parallel_requests?: number`\n  - `metadata?: object`\n  - `model_max_budget?: object`\n  - `model_rpm_limit?: object`\n  - `model_tpm_limit?: object`\n  - `models?: object[]`\n  - `permissions?: object`\n  - `rpm_limit?: number`\n  - `spend?: number`\n  - `tags?: string[]`\n  - `team_id?: string`\n  - `teams?: object[]`\n  - `token_id?: string`\n  - `tpm_limit?: number`\n  - `updated_by?: string`\n  - `user_alias?: string`\n  - `user_email?: string`\n  - `user_id?: string`\n  - `user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst user = await client.user.create();\n\nconsole.log(user);\n```',
  },
  {
    name: 'update',
    endpoint: '/user/update',
    httpMethod: 'post',
    summary: 'User Update',
    description:
      'Example curl \n\n```\ncurl --location \'http://0.0.0.0:4000/user/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "user_role": "proxy_admin_viewer"\n}\'\n```\n\nParameters:\n    - user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n    - user_email: Optional[str] - Specify a user email.\n    - password: Optional[str] - Specify a user password.\n    - user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n    - teams: Optional[list] - specify a list of team id\'s a user belongs to.\n    - send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n    - user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n    - max_budget: Optional[float] - Specify max budget for a given user.\n    - budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n    - models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n    - tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n    - rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n    - auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n    - aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n    - config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n    - blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n    - guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n    - permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n    - metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n    - max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n    - soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n    - model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n    - model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n    - model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n    - spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n    - team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n    - duration: Optional[str] - [NOT IMPLEMENTED].\n    - key_alias: Optional[str] - [NOT IMPLEMENTED].',
    stainlessPath: '(resource) user > (method) update',
    qualified: 'client.user.update',
    params: [
      'aliases?: object;',
      'allowed_cache_controls?: object[];',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'config?: object;',
      'duration?: string;',
      'guardrails?: string[];',
      'key_alias?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'metadata?: object;',
      'model_max_budget?: object;',
      'model_rpm_limit?: object;',
      'model_tpm_limit?: object;',
      'models?: object[];',
      'password?: string;',
      'permissions?: object;',
      'rpm_limit?: number;',
      'spend?: number;',
      'team_id?: string;',
      'tpm_limit?: number;',
      'user_email?: string;',
      'user_id?: string;',
      "user_role?: 'proxy_admin' | 'proxy_admin_viewer' | 'internal_user' | 'internal_user_viewer';",
    ],
    response: 'object',
    markdown:
      '## update\n\n`client.user.update(aliases?: object, allowed_cache_controls?: object[], blocked?: boolean, budget_duration?: string, config?: object, duration?: string, guardrails?: string[], key_alias?: string, max_budget?: number, max_parallel_requests?: number, metadata?: object, model_max_budget?: object, model_rpm_limit?: object, model_tpm_limit?: object, models?: object[], password?: string, permissions?: object, rpm_limit?: number, spend?: number, team_id?: string, tpm_limit?: number, user_email?: string, user_id?: string, user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'): object`\n\n**post** `/user/update`\n\nExample curl \n\n```\ncurl --location \'http://0.0.0.0:4000/user/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "user_role": "proxy_admin_viewer"\n}\'\n```\n\nParameters:\n    - user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n    - user_email: Optional[str] - Specify a user email.\n    - password: Optional[str] - Specify a user password.\n    - user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n    - teams: Optional[list] - specify a list of team id\'s a user belongs to.\n    - send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n    - user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n    - max_budget: Optional[float] - Specify max budget for a given user.\n    - budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n    - models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n    - tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n    - rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n    - auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n    - aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n    - config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n    - blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n    - guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n    - permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n    - metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n    - max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n    - soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n    - model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n    - model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n    - model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n    - spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n    - team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n    - duration: Optional[str] - [NOT IMPLEMENTED].\n    - key_alias: Optional[str] - [NOT IMPLEMENTED].\n\n### Parameters\n\n- `aliases?: object`\n\n- `allowed_cache_controls?: object[]`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `config?: object`\n\n- `duration?: string`\n\n- `guardrails?: string[]`\n\n- `key_alias?: string`\n\n- `max_budget?: number`\n\n- `max_parallel_requests?: number`\n\n- `metadata?: object`\n\n- `model_max_budget?: object`\n\n- `model_rpm_limit?: object`\n\n- `model_tpm_limit?: object`\n\n- `models?: object[]`\n\n- `password?: string`\n\n- `permissions?: object`\n\n- `rpm_limit?: number`\n\n- `spend?: number`\n\n- `team_id?: string`\n\n- `tpm_limit?: number`\n\n- `user_email?: string`\n\n- `user_id?: string`\n\n- `user_role?: \'proxy_admin\' | \'proxy_admin_viewer\' | \'internal_user\' | \'internal_user_viewer\'`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst user = await client.user.update();\n\nconsole.log(user);\n```',
  },
  {
    name: 'list',
    endpoint: '/user/get_users',
    httpMethod: 'get',
    summary: 'Get Users',
    description:
      'Get a paginated list of users, optionally filtered by role.\n\nUsed by the UI to populate the user lists.\n\nParameters:\n    role: Optional[str]\n        Filter users by role. Can be one of:\n        - proxy_admin\n        - proxy_admin_viewer\n        - internal_user\n        - internal_user_viewer\n    user_ids: Optional[str]\n        Get list of users by user_ids. Comma separated list of user_ids.\n    page: int\n        The page number to return\n    page_size: int\n        The number of items per page\n\nCurrently - admin-only endpoint.\n\nExample curl:\n```\nhttp://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17\n```',
    stainlessPath: '(resource) user > (method) list',
    qualified: 'client.user.list',
    params: ['page?: number;', 'page_size?: number;', 'role?: string;', 'user_ids?: string;'],
    response: 'object',
    markdown:
      "## list\n\n`client.user.list(page?: number, page_size?: number, role?: string, user_ids?: string): object`\n\n**get** `/user/get_users`\n\nGet a paginated list of users, optionally filtered by role.\n\nUsed by the UI to populate the user lists.\n\nParameters:\n    role: Optional[str]\n        Filter users by role. Can be one of:\n        - proxy_admin\n        - proxy_admin_viewer\n        - internal_user\n        - internal_user_viewer\n    user_ids: Optional[str]\n        Get list of users by user_ids. Comma separated list of user_ids.\n    page: int\n        The page number to return\n    page_size: int\n        The number of items per page\n\nCurrently - admin-only endpoint.\n\nExample curl:\n```\nhttp://0.0.0.0:4000/user/list?user_ids=default_user_id,693c1a4a-1cc0-4c7c-afe8-b5d2c8d52e17\n```\n\n### Parameters\n\n- `page?: number`\n  Page number\n\n- `page_size?: number`\n  Number of items per page\n\n- `role?: string`\n  Filter users by role\n\n- `user_ids?: string`\n  Get list of users by user_ids\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst users = await client.user.list();\n\nconsole.log(users);\n```",
  },
  {
    name: 'delete',
    endpoint: '/user/delete',
    httpMethod: 'post',
    summary: 'Delete User',
    description:
      "delete user and associated user keys\n\n```\ncurl --location 'http://0.0.0.0:4000/user/delete' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data-raw '{\n    \"user_ids\": [\"45e3e396-ee08-4a61-a88e-16b3ce7e0849\"]\n}'\n```\n\nParameters:\n- user_ids: List[str] - The list of user id's to be deleted.",
    stainlessPath: '(resource) user > (method) delete',
    qualified: 'client.user.delete',
    params: ['user_ids: string[];', 'llm-changed-by?: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.user.delete(user_ids: string[], llm-changed-by?: string): object`\n\n**post** `/user/delete`\n\ndelete user and associated user keys\n\n```\ncurl --location 'http://0.0.0.0:4000/user/delete' \n--header 'Authorization: Bearer sk-1234' \n--header 'Content-Type: application/json' \n--data-raw '{\n    \"user_ids\": [\"45e3e396-ee08-4a61-a88e-16b3ce7e0849\"]\n}'\n```\n\nParameters:\n- user_ids: List[str] - The list of user id's to be deleted.\n\n### Parameters\n\n- `user_ids: string[]`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst user = await client.user.delete({ user_ids: ['string'] });\n\nconsole.log(user);\n```",
  },
  {
    name: 'retrieve_info',
    endpoint: '/user/info',
    httpMethod: 'get',
    summary: 'User Info',
    description:
      "[10/07/2024]\nNote: To get all users (+pagination), use `/user/list` endpoint.\n\n\nUse this to get user information. (user row + all user key info)\n\nExample request\n```\ncurl -X GET 'http://localhost:4000/user/info?user_id=dev7%40hanzo.ai'     --header 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) user > (method) retrieve_info',
    qualified: 'client.user.retrieveInfo',
    params: ['user_id?: string;'],
    response: 'object',
    markdown:
      "## retrieve_info\n\n`client.user.retrieveInfo(user_id?: string): object`\n\n**get** `/user/info`\n\n[10/07/2024]\nNote: To get all users (+pagination), use `/user/list` endpoint.\n\n\nUse this to get user information. (user row + all user key info)\n\nExample request\n```\ncurl -X GET 'http://localhost:4000/user/info?user_id=dev7%40hanzo.ai'     --header 'Authorization: Bearer sk-1234'\n```\n\n### Parameters\n\n- `user_id?: string`\n  User ID in the request parameters\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.user.retrieveInfo();\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/team/new',
    httpMethod: 'post',
    summary: 'New Team',
    description:
      'Allow users to create a new team. Apply user permissions to their team.\n\n👉 [Detailed Doc on setting team budgets](https://docs.hanzo.ai/docs/proxy/team_budgets)\n\n\nParameters:\n- team_alias: Optional[str] - User defined team alias\n- team_id: Optional[str] - The team id of the user. If none passed, we\'ll generate it.\n- members_with_roles: List[{"role": "admin" or "user", "user_id": "<user-id>"}] - A list of users and their roles in the team. Get user_id when making a new user via `/user/new`.\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"extra_info": "some info"}\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- members: Optional[List] - Control team members via `/team/member/add` and `/team/member/delete`. \n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nReturns:\n- team_id: (str) Unique team id - used for tracking spend across multiple keys for same team id.\n\n_deprecated_params:\n- admins: list - A list of user_id\'s for the admin role\n- users: list - A list of user_id\'s for the user role\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n  "team_alias": "my-new-team_2",\n  "members_with_roles": [{"role": "admin", "user_id": "user-1234"},\n    {"role": "user", "user_id": "user-2434"}]\n}\'\n\n```\n\n ```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n            "team_alias": "QA Prod Bot", \n            "max_budget": 0.000000001, \n            "budget_duration": "1d"\n        }\'\n```',
    stainlessPath: '(resource) team > (method) create',
    qualified: 'client.team.create',
    params: [
      'admins?: object[];',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'guardrails?: string[];',
      'max_budget?: number;',
      'members?: object[];',
      "members_with_roles?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[];",
      'metadata?: object;',
      'model_aliases?: object;',
      'models?: object[];',
      'organization_id?: string;',
      'rpm_limit?: number;',
      'tags?: object[];',
      'team_alias?: string;',
      'team_id?: string;',
      'tpm_limit?: number;',
      'llm-changed-by?: string;',
    ],
    response:
      "{ team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }",
    markdown:
      '## create\n\n`client.team.create(admins?: object[], blocked?: boolean, budget_duration?: string, guardrails?: string[], max_budget?: number, members?: object[], members_with_roles?: { role: \'admin\' | \'user\'; user_email?: string; user_id?: string; }[], metadata?: object, model_aliases?: object, models?: object[], organization_id?: string, rpm_limit?: number, tags?: object[], team_alias?: string, team_id?: string, tpm_limit?: number, llm-changed-by?: string): { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: object; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: member[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }`\n\n**post** `/team/new`\n\nAllow users to create a new team. Apply user permissions to their team.\n\n👉 [Detailed Doc on setting team budgets](https://docs.hanzo.ai/docs/proxy/team_budgets)\n\n\nParameters:\n- team_alias: Optional[str] - User defined team alias\n- team_id: Optional[str] - The team id of the user. If none passed, we\'ll generate it.\n- members_with_roles: List[{"role": "admin" or "user", "user_id": "<user-id>"}] - A list of users and their roles in the team. Get user_id when making a new user via `/user/new`.\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"extra_info": "some info"}\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- members: Optional[List] - Control team members via `/team/member/add` and `/team/member/delete`. \n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nReturns:\n- team_id: (str) Unique team id - used for tracking spend across multiple keys for same team id.\n\n_deprecated_params:\n- admins: list - A list of user_id\'s for the admin role\n- users: list - A list of user_id\'s for the user role\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n  "team_alias": "my-new-team_2",\n  "members_with_roles": [{"role": "admin", "user_id": "user-1234"},\n    {"role": "user", "user_id": "user-2434"}]\n}\'\n\n```\n\n ```\ncurl --location \'http://0.0.0.0:4000/team/new\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n            "team_alias": "QA Prod Bot", \n            "max_budget": 0.000000001, \n            "budget_duration": "1d"\n        }\'\n```\n\n### Parameters\n\n- `admins?: object[]`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `guardrails?: string[]`\n\n- `max_budget?: number`\n\n- `members?: object[]`\n\n- `members_with_roles?: { role: \'admin\' | \'user\'; user_email?: string; user_id?: string; }[]`\n\n- `metadata?: object`\n\n- `model_aliases?: object`\n\n- `models?: object[]`\n\n- `organization_id?: string`\n\n- `rpm_limit?: number`\n\n- `tags?: object[]`\n\n- `team_alias?: string`\n\n- `team_id?: string`\n\n- `tpm_limit?: number`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `{ team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: { role: \'admin\' | \'user\'; user_email?: string; user_id?: string; }[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }`\n\n  - `team_id: string`\n  - `admins?: object[]`\n  - `blocked?: boolean`\n  - `budget_duration?: string`\n  - `budget_reset_at?: string`\n  - `created_at?: string`\n  - `llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }`\n  - `max_budget?: number`\n  - `max_parallel_requests?: number`\n  - `members?: object[]`\n  - `members_with_roles?: { role: \'admin\' | \'user\'; user_email?: string; user_id?: string; }[]`\n  - `metadata?: object`\n  - `model_id?: number`\n  - `models?: object[]`\n  - `organization_id?: string`\n  - `rpm_limit?: number`\n  - `spend?: number`\n  - `team_alias?: string`\n  - `tpm_limit?: number`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst team = await client.team.create();\n\nconsole.log(team);\n```',
  },
  {
    name: 'update',
    endpoint: '/team/update',
    httpMethod: 'post',
    summary: 'Update Team',
    description:
      'Use `/team/member_add` AND `/team/member/delete` to add/remove new team members  \n\nYou can now update team budget / rate limits via /team/update\n\nParameters:\n- team_id: str - The team id of the user. Required param.\n- team_alias: Optional[str] - User defined team alias\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nExample - update team TPM Limit\n\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "tpm_limit": 100\n}\'\n```\n\nExample - Update Team `max_budget` budget\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "max_budget": 10\n}\'\n```',
    stainlessPath: '(resource) team > (method) update',
    qualified: 'client.team.update',
    params: [
      'team_id: string;',
      'blocked?: boolean;',
      'budget_duration?: string;',
      'guardrails?: string[];',
      'max_budget?: number;',
      'metadata?: object;',
      'model_aliases?: object;',
      'models?: object[];',
      'organization_id?: string;',
      'rpm_limit?: number;',
      'tags?: object[];',
      'team_alias?: string;',
      'tpm_limit?: number;',
      'llm-changed-by?: string;',
    ],
    response: 'object',
    markdown:
      '## update\n\n`client.team.update(team_id: string, blocked?: boolean, budget_duration?: string, guardrails?: string[], max_budget?: number, metadata?: object, model_aliases?: object, models?: object[], organization_id?: string, rpm_limit?: number, tags?: object[], team_alias?: string, tpm_limit?: number, llm-changed-by?: string): object`\n\n**post** `/team/update`\n\nUse `/team/member_add` AND `/team/member/delete` to add/remove new team members  \n\nYou can now update team budget / rate limits via /team/update\n\nParameters:\n- team_id: str - The team id of the user. Required param.\n- team_alias: Optional[str] - User defined team alias\n- metadata: Optional[dict] - Metadata for team, store information for team. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- tpm_limit: Optional[int] - The TPM (Tokens Per Minute) limit for this team - all keys with this team_id will have at max this TPM limit\n- rpm_limit: Optional[int] - The RPM (Requests Per Minute) limit for this team - all keys associated with this team_id will have at max this RPM limit\n- max_budget: Optional[float] - The maximum budget allocated to the team - all keys for this team_id will have at max this max_budget\n- budget_duration: Optional[str] - The duration of the budget for the team. Doc [here](https://docs.hanzo.ai/docs/proxy/team_budgets)\n- models: Optional[list] - A list of models associated with the team - all keys for this team_id will have at most, these models. If empty, assumes all models are allowed.\n- blocked: bool - Flag indicating if the team is blocked or not - will stop all calls from keys with this team_id.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: Optional[str] - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n- guardrails: Optional[List[str]] - Guardrails for the team. [Docs](https://docs.hanzo.ai/docs/proxy/guardrails)\nExample - update team TPM Limit\n\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "tpm_limit": 100\n}\'\n```\n\nExample - Update Team `max_budget` budget\n```\ncurl --location \'http://0.0.0.0:4000/team/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_id": "8d916b1c-510d-4894-a334-1c16a93344f5",\n    "max_budget": 10\n}\'\n```\n\n### Parameters\n\n- `team_id: string`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n\n- `guardrails?: string[]`\n\n- `max_budget?: number`\n\n- `metadata?: object`\n\n- `model_aliases?: object`\n\n- `models?: object[]`\n\n- `organization_id?: string`\n\n- `rpm_limit?: number`\n\n- `tags?: object[]`\n\n- `team_alias?: string`\n\n- `tpm_limit?: number`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst team = await client.team.update({ team_id: \'team_id\' });\n\nconsole.log(team);\n```',
  },
  {
    name: 'list',
    endpoint: '/team/list',
    httpMethod: 'get',
    summary: 'List Team',
    description:
      "```\ncurl --location --request GET 'http://0.0.0.0:4000/team/list'         --header 'Authorization: Bearer sk-1234'\n```\n\nParameters:\n- user_id: str - Optional. If passed will only return teams that the user_id is a member of.\n- organization_id: str - Optional. If passed will only return teams that belong to the organization_id. Pass 'default_organization' to get all teams without organization_id.",
    stainlessPath: '(resource) team > (method) list',
    qualified: 'client.team.list',
    params: ['organization_id?: string;', 'user_id?: string;'],
    response: 'object',
    markdown:
      "## list\n\n`client.team.list(organization_id?: string, user_id?: string): object`\n\n**get** `/team/list`\n\n```\ncurl --location --request GET 'http://0.0.0.0:4000/team/list'         --header 'Authorization: Bearer sk-1234'\n```\n\nParameters:\n- user_id: str - Optional. If passed will only return teams that the user_id is a member of.\n- organization_id: str - Optional. If passed will only return teams that belong to the organization_id. Pass 'default_organization' to get all teams without organization_id.\n\n### Parameters\n\n- `organization_id?: string`\n\n- `user_id?: string`\n  Only return teams which this 'user_id' belongs to\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst teams = await client.team.list();\n\nconsole.log(teams);\n```",
  },
  {
    name: 'delete',
    endpoint: '/team/delete',
    httpMethod: 'post',
    summary: 'Delete Team',
    description:
      'delete team and associated team keys\n\nParameters:\n- team_ids: List[str] - Required. List of team IDs to delete. Example: ["team-1234", "team-5678"]\n\n```\ncurl --location \'http://0.0.0.0:4000/team/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_ids": ["8d916b1c-510d-4894-a334-1c16a93344f5"]\n}\'\n```',
    stainlessPath: '(resource) team > (method) delete',
    qualified: 'client.team.delete',
    params: ['team_ids: string[];', 'llm-changed-by?: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.team.delete(team_ids: string[], llm-changed-by?: string): object`\n\n**post** `/team/delete`\n\ndelete team and associated team keys\n\nParameters:\n- team_ids: List[str] - Required. List of team IDs to delete. Example: [\"team-1234\", \"team-5678\"]\n\n```\ncurl --location 'http://0.0.0.0:4000/team/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{\n    \"team_ids\": [\"8d916b1c-510d-4894-a334-1c16a93344f5\"]\n}'\n```\n\n### Parameters\n\n- `team_ids: string[]`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst team = await client.team.delete({ team_ids: ['string'] });\n\nconsole.log(team);\n```",
  },
  {
    name: 'add_member',
    endpoint: '/team/member_add',
    httpMethod: 'post',
    summary: 'Team Member Add',
    description:
      '[BETA]\n\nAdd new members (either via user_email or user_id) to a team\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or admin of team, allowed to access this endpoint.\n```\n\ncurl -X POST \'http://0.0.0.0:4000/team/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{"team_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849", "member": {"role": "user", "user_id": "dev247652@hanzo.ai"}}\'\n\n```',
    stainlessPath: '(resource) team > (method) add_member',
    qualified: 'client.team.addMember',
    params: [
      "member: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[] | { role: 'admin' | 'user'; user_email?: string; user_id?: string; };",
      'team_id: string;',
      'max_budget_in_team?: number;',
    ],
    response:
      '{ team_id: string; updated_team_memberships: { budget_id: string; llm_budget_table: object; team_id: string; user_id: string; }[]; updated_users: { user_id: string; budget_duration?: string; budget_reset_at?: string; max_budget?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; organization_memberships?: object[]; rpm_limit?: number; spend?: number; sso_user_id?: string; teams?: string[]; tpm_limit?: number; user_email?: string; user_role?: string; }[]; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: object[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }',
    markdown:
      "## add_member\n\n`client.team.addMember(member: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[] | { role: 'admin' | 'user'; user_email?: string; user_id?: string; }, team_id: string, max_budget_in_team?: number): { team_id: string; updated_team_memberships: object[]; updated_users: object[]; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: object; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: member[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }`\n\n**post** `/team/member_add`\n\n[BETA]\n\nAdd new members (either via user_email or user_id) to a team\n\nIf user doesn't exist, new user row will also be added to User Table\n\nOnly proxy_admin or admin of team, allowed to access this endpoint.\n```\n\ncurl -X POST 'http://0.0.0.0:4000/team/member_add'     -H 'Authorization: Bearer sk-1234'     -H 'Content-Type: application/json'     -d '{\"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\", \"member\": {\"role\": \"user\", \"user_id\": \"dev247652@hanzo.ai\"}}'\n\n```\n\n### Parameters\n\n- `member: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[] | { role: 'admin' | 'user'; user_email?: string; user_id?: string; }`\n\n- `team_id: string`\n\n- `max_budget_in_team?: number`\n\n### Returns\n\n- `{ team_id: string; updated_team_memberships: { budget_id: string; llm_budget_table: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; team_id: string; user_id: string; }[]; updated_users: { user_id: string; budget_duration?: string; budget_reset_at?: string; max_budget?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; organization_memberships?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; rpm_limit?: number; spend?: number; sso_user_id?: string; teams?: string[]; tpm_limit?: number; user_email?: string; user_role?: string; }[]; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }`\n\n  - `team_id: string`\n  - `updated_team_memberships: { budget_id: string; llm_budget_table: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; team_id: string; user_id: string; }[]`\n  - `updated_users: { user_id: string; budget_duration?: string; budget_reset_at?: string; max_budget?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; organization_memberships?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; rpm_limit?: number; spend?: number; sso_user_id?: string; teams?: string[]; tpm_limit?: number; user_email?: string; user_role?: string; }[]`\n  - `admins?: object[]`\n  - `blocked?: boolean`\n  - `budget_duration?: string`\n  - `budget_reset_at?: string`\n  - `created_at?: string`\n  - `llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }`\n  - `max_budget?: number`\n  - `max_parallel_requests?: number`\n  - `members?: object[]`\n  - `members_with_roles?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[]`\n  - `metadata?: object`\n  - `model_id?: number`\n  - `models?: object[]`\n  - `organization_id?: string`\n  - `rpm_limit?: number`\n  - `spend?: number`\n  - `team_alias?: string`\n  - `tpm_limit?: number`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.addMember({ member: [{ role: 'admin' }], team_id: 'team_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'block',
    endpoint: '/team/block',
    httpMethod: 'post',
    summary: 'Block Team',
    description:
      "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to block.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```\n\nReturns:\n- The updated team record with blocked=True",
    stainlessPath: '(resource) team > (method) block',
    qualified: 'client.team.block',
    params: ['team_id: string;'],
    response: 'object',
    markdown:
      "## block\n\n`client.team.block(team_id: string): object`\n\n**post** `/team/block`\n\nBlocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to block.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```\n\nReturns:\n- The updated team record with blocked=True\n\n### Parameters\n\n- `team_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.block({ team_id: 'team_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'disable_logging',
    endpoint: '/team/{team_id}/disable_logging',
    httpMethod: 'post',
    summary: 'Disable Team Logging',
    description:
      "Disable all logging callbacks for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging'         -H 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) team > (method) disable_logging',
    qualified: 'client.team.disableLogging',
    params: ['team_id: string;'],
    response: 'object',
    markdown:
      "## disable_logging\n\n`client.team.disableLogging(team_id: string): object`\n\n**post** `/team/{team_id}/disable_logging`\n\nDisable all logging callbacks for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging'         -H 'Authorization: Bearer sk-1234'\n```\n\n### Parameters\n\n- `team_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.disableLogging('team_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_available',
    endpoint: '/team/available',
    httpMethod: 'get',
    summary: 'List Available Teams',
    description: 'List Available Teams',
    stainlessPath: '(resource) team > (method) list_available',
    qualified: 'client.team.listAvailable',
    params: ['response_model?: object;'],
    response: 'object',
    markdown:
      "## list_available\n\n`client.team.listAvailable(response_model?: object): object`\n\n**get** `/team/available`\n\nList Available Teams\n\n### Parameters\n\n- `response_model?: object`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.listAvailable();\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove_member',
    endpoint: '/team/member_delete',
    httpMethod: 'post',
    summary: 'Team Member Delete',
    description:
      "[BETA]\n\ndelete members (either via user_email or user_id) from a team\n\nIf user doesn't exist, an exception will be raised\n```\ncurl -X POST 'http://0.0.0.0:8000/team/member_delete' \n-H 'Authorization: Bearer sk-1234' \n-H 'Content-Type: application/json' \n-d '{\n    \"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"user_id\": \"dev247652@hanzo.ai\"\n}'\n```",
    stainlessPath: '(resource) team > (method) remove_member',
    qualified: 'client.team.removeMember',
    params: ['team_id: string;', 'user_email?: string;', 'user_id?: string;'],
    response: 'object',
    markdown:
      "## remove_member\n\n`client.team.removeMember(team_id: string, user_email?: string, user_id?: string): object`\n\n**post** `/team/member_delete`\n\n[BETA]\n\ndelete members (either via user_email or user_id) from a team\n\nIf user doesn't exist, an exception will be raised\n```\ncurl -X POST 'http://0.0.0.0:8000/team/member_delete' \n-H 'Authorization: Bearer sk-1234' \n-H 'Content-Type: application/json' \n-d '{\n    \"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"user_id\": \"dev247652@hanzo.ai\"\n}'\n```\n\n### Parameters\n\n- `team_id: string`\n\n- `user_email?: string`\n\n- `user_id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.removeMember({ team_id: 'team_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_info',
    endpoint: '/team/info',
    httpMethod: 'get',
    summary: 'Team Info',
    description:
      "get info on team + related keys\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to get info on.\n\n```\ncurl --location 'http://localhost:4000/team/info?team_id=your_team_id_here'     --header 'Authorization: Bearer your_api_key_here'\n```",
    stainlessPath: '(resource) team > (method) retrieve_info',
    qualified: 'client.team.retrieveInfo',
    params: ['team_id?: string;'],
    response: 'object',
    markdown:
      "## retrieve_info\n\n`client.team.retrieveInfo(team_id?: string): object`\n\n**get** `/team/info`\n\nget info on team + related keys\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to get info on.\n\n```\ncurl --location 'http://localhost:4000/team/info?team_id=your_team_id_here'     --header 'Authorization: Bearer your_api_key_here'\n```\n\n### Parameters\n\n- `team_id?: string`\n  Team ID in the request parameters\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.retrieveInfo();\n\nconsole.log(response);\n```",
  },
  {
    name: 'unblock',
    endpoint: '/team/unblock',
    httpMethod: 'post',
    summary: 'Unblock Team',
    description:
      "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to unblock.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```",
    stainlessPath: '(resource) team > (method) unblock',
    qualified: 'client.team.unblock',
    params: ['team_id: string;'],
    response: 'object',
    markdown:
      "## unblock\n\n`client.team.unblock(team_id: string): object`\n\n**post** `/team/unblock`\n\nBlocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to unblock.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```\n\n### Parameters\n\n- `team_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.unblock({ team_id: 'team_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'update_member',
    endpoint: '/team/member_update',
    httpMethod: 'post',
    summary: 'Team Member Update',
    description: '[BETA]\n\nUpdate team member budgets and team member role',
    stainlessPath: '(resource) team > (method) update_member',
    qualified: 'client.team.updateMember',
    params: [
      'team_id: string;',
      'max_budget_in_team?: number;',
      "role?: 'admin' | 'user';",
      'user_email?: string;',
      'user_id?: string;',
    ],
    response: '{ team_id: string; user_id: string; max_budget_in_team?: number; user_email?: string; }',
    markdown:
      "## update_member\n\n`client.team.updateMember(team_id: string, max_budget_in_team?: number, role?: 'admin' | 'user', user_email?: string, user_id?: string): { team_id: string; user_id: string; max_budget_in_team?: number; user_email?: string; }`\n\n**post** `/team/member_update`\n\n[BETA]\n\nUpdate team member budgets and team member role\n\n### Parameters\n\n- `team_id: string`\n\n- `max_budget_in_team?: number`\n\n- `role?: 'admin' | 'user'`\n\n- `user_email?: string`\n\n- `user_id?: string`\n\n### Returns\n\n- `{ team_id: string; user_id: string; max_budget_in_team?: number; user_email?: string; }`\n\n  - `team_id: string`\n  - `user_id: string`\n  - `max_budget_in_team?: number`\n  - `user_email?: string`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.updateMember({ team_id: 'team_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'add',
    endpoint: '/team/model/add',
    httpMethod: 'post',
    summary: 'Team Model Add',
    description:
      'Add models to a team\'s allowed model list. Only proxy admin or team admin can add models.\n\nParameters:\n- team_id: str - Required. The team to add models to\n- models: List[str] - Required. List of models to add to the team\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/model/add\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "team_id": "team-1234",\n    "models": ["gpt-4", "claude-2"]\n}\'\n```',
    stainlessPath: '(resource) team.model > (method) add',
    qualified: 'client.team.model.add',
    params: ['models: string[];', 'team_id: string;'],
    response: 'object',
    markdown:
      "## add\n\n`client.team.model.add(models: string[], team_id: string): object`\n\n**post** `/team/model/add`\n\nAdd models to a team's allowed model list. Only proxy admin or team admin can add models.\n\nParameters:\n- team_id: str - Required. The team to add models to\n- models: List[str] - Required. List of models to add to the team\n\nExample Request:\n```\ncurl --location 'http://0.0.0.0:4000/team/model/add'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\",\n    \"models\": [\"gpt-4\", \"claude-2\"]\n}'\n```\n\n### Parameters\n\n- `models: string[]`\n\n- `team_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.team.model.add({ models: ['string'], team_id: 'team_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'remove',
    endpoint: '/team/model/delete',
    httpMethod: 'post',
    summary: 'Team Model Delete',
    description:
      "Remove models from a team's allowed model list. Only proxy admin or team admin can remove models.\n\nParameters:\n- team_id: str - Required. The team to remove models from\n- models: List[str] - Required. List of models to remove from the team\n\nExample Request:\n```\ncurl --location 'http://0.0.0.0:4000/team/model/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\",\n    \"models\": [\"gpt-4\"]\n}'\n```",
    stainlessPath: '(resource) team.model > (method) remove',
    qualified: 'client.team.model.remove',
    params: ['models: string[];', 'team_id: string;'],
    response: 'object',
    markdown:
      "## remove\n\n`client.team.model.remove(models: string[], team_id: string): object`\n\n**post** `/team/model/delete`\n\nRemove models from a team's allowed model list. Only proxy admin or team admin can remove models.\n\nParameters:\n- team_id: str - Required. The team to remove models from\n- models: List[str] - Required. List of models to remove from the team\n\nExample Request:\n```\ncurl --location 'http://0.0.0.0:4000/team/model/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\",\n    \"models\": [\"gpt-4\"]\n}'\n```\n\n### Parameters\n\n- `models: string[]`\n\n- `team_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst model = await client.team.model.remove({ models: ['string'], team_id: 'team_id' });\n\nconsole.log(model);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/team/{team_id}/callback',
    httpMethod: 'get',
    summary: 'Get Team Callbacks',
    description:
      'Get the success/failure callbacks and variables for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X GET \'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Authorization: Bearer sk-1234\'\n```\n\nThis will return the callback settings for the team with id dbe2f686-a686-4896-864a-4c3924458709\n\nReturns {\n        "status": "success",\n        "data": {\n            "team_id": team_id,\n            "success_callbacks": team_callback_settings_obj.success_callback,\n            "failure_callbacks": team_callback_settings_obj.failure_callback,\n            "callback_vars": team_callback_settings_obj.callback_vars,\n        },\n    }',
    stainlessPath: '(resource) team.callback > (method) retrieve',
    qualified: 'client.team.callback.retrieve',
    params: ['team_id: string;'],
    response: 'object',
    markdown:
      '## retrieve\n\n`client.team.callback.retrieve(team_id: string): object`\n\n**get** `/team/{team_id}/callback`\n\nGet the success/failure callbacks and variables for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X GET \'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Authorization: Bearer sk-1234\'\n```\n\nThis will return the callback settings for the team with id dbe2f686-a686-4896-864a-4c3924458709\n\nReturns {\n        "status": "success",\n        "data": {\n            "team_id": team_id,\n            "success_callbacks": team_callback_settings_obj.success_callback,\n            "failure_callbacks": team_callback_settings_obj.failure_callback,\n            "callback_vars": team_callback_settings_obj.callback_vars,\n        },\n    }\n\n### Parameters\n\n- `team_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst callback = await client.team.callback.retrieve(\'team_id\');\n\nconsole.log(callback);\n```',
  },
  {
    name: 'add',
    endpoint: '/team/{team_id}/callback',
    httpMethod: 'post',
    summary: 'Add Team Callbacks',
    description:
      'Add a success/failure callback to a team\n\nUse this if if you want different teams to have different success/failure callbacks\n\nParameters:\n- callback_name (Literal["langfuse", "langsmith", "gcs"], required): The name of the callback to add\n- callback_type (Literal["success", "failure", "success_and_failure"], required): The type of callback to add. One of:\n    - "success": Callback for successful LLM calls\n    - "failure": Callback for failed LLM calls\n    - "success_and_failure": Callback for both successful and failed LLM calls\n- callback_vars (StandardCallbackDynamicParams, required): A dictionary of variables to pass to the callback\n    - langfuse_public_key: The public key for the Langfuse callback\n    - langfuse_secret_key: The secret key for the Langfuse callback\n    - langfuse_secret: The secret for the Langfuse callback\n    - langfuse_host: The host for the Langfuse callback\n    - gcs_bucket_name: The name of the GCS bucket\n    - gcs_path_service_account: The path to the GCS service account\n    - langsmith_api_key: The API key for the Langsmith callback\n    - langsmith_project: The project for the Langsmith callback\n    - langsmith_base_url: The base URL for the Langsmith callback\n\nExample curl:\n```\ncurl -X POST \'http:/localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Content-Type: application/json\'         -H \'Authorization: Bearer sk-1234\'         -d \'{\n    "callback_name": "langfuse",\n    "callback_type": "success",\n    "callback_vars": {"langfuse_public_key": "pk-lf-xxxx1", "langfuse_secret_key": "sk-xxxxx"}\n    \n}\'\n```\n\nThis means for the team where team_id = dbe2f686-a686-4896-864a-4c3924458709, all LLM calls will be logged to langfuse using the public key pk-lf-xxxx1 and the secret key sk-xxxxx',
    stainlessPath: '(resource) team.callback > (method) add',
    qualified: 'client.team.callback.add',
    params: [
      'team_id: string;',
      'callback_name: string;',
      'callback_vars: object;',
      "callback_type?: 'success' | 'failure' | 'success_and_failure';",
      'llm-changed-by?: string;',
    ],
    response: 'object',
    markdown:
      '## add\n\n`client.team.callback.add(team_id: string, callback_name: string, callback_vars: object, callback_type?: \'success\' | \'failure\' | \'success_and_failure\', llm-changed-by?: string): object`\n\n**post** `/team/{team_id}/callback`\n\nAdd a success/failure callback to a team\n\nUse this if if you want different teams to have different success/failure callbacks\n\nParameters:\n- callback_name (Literal["langfuse", "langsmith", "gcs"], required): The name of the callback to add\n- callback_type (Literal["success", "failure", "success_and_failure"], required): The type of callback to add. One of:\n    - "success": Callback for successful LLM calls\n    - "failure": Callback for failed LLM calls\n    - "success_and_failure": Callback for both successful and failed LLM calls\n- callback_vars (StandardCallbackDynamicParams, required): A dictionary of variables to pass to the callback\n    - langfuse_public_key: The public key for the Langfuse callback\n    - langfuse_secret_key: The secret key for the Langfuse callback\n    - langfuse_secret: The secret for the Langfuse callback\n    - langfuse_host: The host for the Langfuse callback\n    - gcs_bucket_name: The name of the GCS bucket\n    - gcs_path_service_account: The path to the GCS service account\n    - langsmith_api_key: The API key for the Langsmith callback\n    - langsmith_project: The project for the Langsmith callback\n    - langsmith_base_url: The base URL for the Langsmith callback\n\nExample curl:\n```\ncurl -X POST \'http:/localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/callback\'         -H \'Content-Type: application/json\'         -H \'Authorization: Bearer sk-1234\'         -d \'{\n    "callback_name": "langfuse",\n    "callback_type": "success",\n    "callback_vars": {"langfuse_public_key": "pk-lf-xxxx1", "langfuse_secret_key": "sk-xxxxx"}\n    \n}\'\n```\n\nThis means for the team where team_id = dbe2f686-a686-4896-864a-4c3924458709, all LLM calls will be logged to langfuse using the public key pk-lf-xxxx1 and the secret key sk-xxxxx\n\n### Parameters\n\n- `team_id: string`\n\n- `callback_name: string`\n\n- `callback_vars: object`\n\n- `callback_type?: \'success\' | \'failure\' | \'success_and_failure\'`\n\n- `llm-changed-by?: string`\n  The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.team.callback.add(\'team_id\', {\n  callback_name: \'callback_name\',\n  callback_vars: { foo: \'string\' },\n});\n\nconsole.log(response);\n```',
  },
  {
    name: 'create',
    endpoint: '/organization/new',
    httpMethod: 'post',
    summary: 'New Organization',
    description:
      'Allow orgs to own teams\n\nSet org level budgets + model access.\n\nOnly admins can create orgs.\n\n# Parameters\n\n- organization_alias: *str* - The name of the organization.\n- models: *List* - The models the organization has access to.\n- budget_id: *Optional[str]* - The id for a budget (tpm/rpm/max budget) for the organization.\n### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS ###\n- max_budget: *Optional[float]* - Max budget for org\n- tpm_limit: *Optional[int]* - Max tpm limit for org\n- rpm_limit: *Optional[int]* - Max rpm limit for org\n- max_parallel_requests: *Optional[int]* - [Not Implemented Yet] Max parallel requests for org\n- soft_budget: *Optional[float]* - [Not Implemented Yet] Get a slack alert when this soft budget is reached. Don\'t block requests.\n- model_max_budget: *Optional[dict]* - Max budget for a specific model\n- budget_duration: *Optional[str]* - Frequency of reseting org budget\n- metadata: *Optional[dict]* - Metadata for organization, store information for organization. Example metadata - {"extra_info": "some info"}\n- blocked: *bool* - Flag indicating if the org is blocked or not - will stop all calls from keys with this org_id.\n- tags: *Optional[List[str]]* - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: *Optional[str]* - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n\nCase 1: Create new org **without** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "max_budget": 100\n}\'\n\n\n```\n\nCase 2: Create new org **with** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "budget_id": "428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689"\n}\'\n```',
    stainlessPath: '(resource) organization > (method) create',
    qualified: 'client.organization.create',
    params: [
      'organization_alias: string;',
      'budget_duration?: string;',
      'budget_id?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'metadata?: object;',
      'model_max_budget?: object;',
      'models?: object[];',
      'organization_id?: string;',
      'rpm_limit?: number;',
      'soft_budget?: number;',
      'tpm_limit?: number;',
    ],
    response:
      '{ budget_id: string; created_at: string; created_by: string; models: string[]; organization_id: string; updated_at: string; updated_by: string; metadata?: object; organization_alias?: string; spend?: number; }',
    markdown:
      '## create\n\n`client.organization.create(organization_alias: string, budget_duration?: string, budget_id?: string, max_budget?: number, max_parallel_requests?: number, metadata?: object, model_max_budget?: object, models?: object[], organization_id?: string, rpm_limit?: number, soft_budget?: number, tpm_limit?: number): { budget_id: string; created_at: string; created_by: string; models: string[]; organization_id: string; updated_at: string; updated_by: string; metadata?: object; organization_alias?: string; spend?: number; }`\n\n**post** `/organization/new`\n\nAllow orgs to own teams\n\nSet org level budgets + model access.\n\nOnly admins can create orgs.\n\n# Parameters\n\n- organization_alias: *str* - The name of the organization.\n- models: *List* - The models the organization has access to.\n- budget_id: *Optional[str]* - The id for a budget (tpm/rpm/max budget) for the organization.\n### IF NO BUDGET ID - CREATE ONE WITH THESE PARAMS ###\n- max_budget: *Optional[float]* - Max budget for org\n- tpm_limit: *Optional[int]* - Max tpm limit for org\n- rpm_limit: *Optional[int]* - Max rpm limit for org\n- max_parallel_requests: *Optional[int]* - [Not Implemented Yet] Max parallel requests for org\n- soft_budget: *Optional[float]* - [Not Implemented Yet] Get a slack alert when this soft budget is reached. Don\'t block requests.\n- model_max_budget: *Optional[dict]* - Max budget for a specific model\n- budget_duration: *Optional[str]* - Frequency of reseting org budget\n- metadata: *Optional[dict]* - Metadata for organization, store information for organization. Example metadata - {"extra_info": "some info"}\n- blocked: *bool* - Flag indicating if the org is blocked or not - will stop all calls from keys with this org_id.\n- tags: *Optional[List[str]]* - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- organization_id: *Optional[str]* - The organization id of the team. Default is None. Create via `/organization/new`.\n- model_aliases: Optional[dict] - Model aliases for the team. [Docs](https://docs.hanzo.ai/docs/proxy/team_based_routing#create-team-with-model-alias)\n\nCase 1: Create new org **without** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "max_budget": 100\n}\'\n\n\n```\n\nCase 2: Create new org **with** a budget_id\n\n```bash\ncurl --location \'http://0.0.0.0:4000/organization/new\' \n--header \'Authorization: Bearer sk-1234\' \n--header \'Content-Type: application/json\' \n--data \'{\n    "organization_alias": "my-secret-org",\n    "models": ["model1", "model2"],\n    "budget_id": "428eeaa8-f3ac-4e85-a8fb-7dc8d7aa8689"\n}\'\n```\n\n### Parameters\n\n- `organization_alias: string`\n\n- `budget_duration?: string`\n\n- `budget_id?: string`\n\n- `max_budget?: number`\n\n- `max_parallel_requests?: number`\n\n- `metadata?: object`\n\n- `model_max_budget?: object`\n\n- `models?: object[]`\n\n- `organization_id?: string`\n\n- `rpm_limit?: number`\n\n- `soft_budget?: number`\n\n- `tpm_limit?: number`\n\n### Returns\n\n- `{ budget_id: string; created_at: string; created_by: string; models: string[]; organization_id: string; updated_at: string; updated_by: string; metadata?: object; organization_alias?: string; spend?: number; }`\n\n  - `budget_id: string`\n  - `created_at: string`\n  - `created_by: string`\n  - `models: string[]`\n  - `organization_id: string`\n  - `updated_at: string`\n  - `updated_by: string`\n  - `metadata?: object`\n  - `organization_alias?: string`\n  - `spend?: number`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst organization = await client.organization.create({ organization_alias: \'organization_alias\' });\n\nconsole.log(organization);\n```',
  },
  {
    name: 'update',
    endpoint: '/organization/update',
    httpMethod: 'patch',
    summary: 'Update Organization',
    description: 'Update an organization',
    stainlessPath: '(resource) organization > (method) update',
    qualified: 'client.organization.update',
    params: [
      'budget_id?: string;',
      'metadata?: object;',
      'models?: string[];',
      'organization_alias?: string;',
      'organization_id?: string;',
      'spend?: number;',
      'updated_by?: string;',
    ],
    response:
      '{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: object; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: member[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }',
    markdown:
      "## update\n\n`client.organization.update(budget_id?: string, metadata?: object, models?: string[], organization_alias?: string, organization_id?: string, spend?: number, updated_by?: string): { budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: object; members?: object[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: object[]; }`\n\n**patch** `/organization/update`\n\nUpdate an organization\n\n### Parameters\n\n- `budget_id?: string`\n\n- `metadata?: object`\n\n- `models?: string[]`\n\n- `organization_alias?: string`\n\n- `organization_id?: string`\n\n- `spend?: number`\n\n- `updated_by?: string`\n\n### Returns\n\n- `{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: object[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }`\n  Returned by the /organization/info endpoint and /organization/list endpoint\n\n  - `budget_id: string`\n  - `created_at: string`\n  - `created_by: string`\n  - `models: string[]`\n  - `updated_at: string`\n  - `updated_by: string`\n  - `llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }`\n  - `members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]`\n  - `metadata?: object`\n  - `organization_alias?: string`\n  - `organization_id?: string`\n  - `spend?: number`\n  - `teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst organization = await client.organization.update();\n\nconsole.log(organization);\n```",
  },
  {
    name: 'list',
    endpoint: '/organization/list',
    httpMethod: 'get',
    summary: 'List Organization',
    description:
      "```\ncurl --location --request GET 'http://0.0.0.0:4000/organization/list'         --header 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) organization > (method) list',
    qualified: 'client.organization.list',
    response:
      '{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: object; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: member[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }[]',
    markdown:
      "## list\n\n`client.organization.list(): { budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: object; members?: object[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: object[]; }[]`\n\n**get** `/organization/list`\n\n```\ncurl --location --request GET 'http://0.0.0.0:4000/organization/list'         --header 'Authorization: Bearer sk-1234'\n```\n\n### Returns\n\n- `{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: object[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst organizations = await client.organization.list();\n\nconsole.log(organizations);\n```",
  },
  {
    name: 'delete',
    endpoint: '/organization/delete',
    httpMethod: 'delete',
    summary: 'Delete Organization',
    description:
      'Delete an organization\n\n# Parameters:\n\n- organization_ids: List[str] - The organization ids to delete.',
    stainlessPath: '(resource) organization > (method) delete',
    qualified: 'client.organization.delete',
    params: ['organization_ids: string[];'],
    response:
      '{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: object; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: member[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }[]',
    markdown:
      "## delete\n\n`client.organization.delete(organization_ids: string[]): { budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: object; members?: object[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: object[]; }[]`\n\n**delete** `/organization/delete`\n\nDelete an organization\n\n# Parameters:\n\n- organization_ids: List[str] - The organization ids to delete.\n\n### Parameters\n\n- `organization_ids: string[]`\n\n### Returns\n\n- `{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: object[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst organizations = await client.organization.delete({ organization_ids: ['string'] });\n\nconsole.log(organizations);\n```",
  },
  {
    name: 'add_member',
    endpoint: '/organization/member_add',
    httpMethod: 'post',
    summary: 'Organization Member Add',
    description:
      '[BETA]\n\nAdd new members (either via user_email or user_id) to an organization\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or org_admin of organization, allowed to access this endpoint.\n\n# Parameters:\n\n- organization_id: str (required)\n- member: Union[List[Member], Member] (required)\n    - role: Literal[LLMUserRoles] (required)\n    - user_id: Optional[str]\n    - user_email: Optional[str]\n\nNote: Either user_id or user_email must be provided for each member.\n\nExample:\n```\ncurl -X POST \'http://0.0.0.0:4000/organization/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{\n    "organization_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",\n    "member": {\n        "role": "internal_user",\n        "user_id": "dev247652@hanzo.ai"\n    },\n    "max_budget_in_organization": 100.0\n}\'\n```\n\nThe following is executed in this function:\n\n1. Check if organization exists\n2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable\n3. Add Internal User to the `LLM_OrganizationMembership` table',
    stainlessPath: '(resource) organization > (method) add_member',
    qualified: 'client.organization.addMember',
    params: [
      "member: { role: 'org_admin' | 'internal_user' | 'internal_user_viewer'; user_email?: string; user_id?: string; }[] | { role: 'org_admin' | 'internal_user' | 'internal_user_viewer'; user_email?: string; user_id?: string; };",
      'organization_id: string;',
      'max_budget_in_organization?: number;',
    ],
    response:
      '{ organization_id: string; updated_organization_memberships: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; updated_users: { user_id: string; budget_duration?: string; budget_reset_at?: string; max_budget?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; organization_memberships?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; rpm_limit?: number; spend?: number; sso_user_id?: string; teams?: string[]; tpm_limit?: number; user_email?: string; user_role?: string; }[]; }',
    markdown:
      "## add_member\n\n`client.organization.addMember(member: { role: 'org_admin' | 'internal_user' | 'internal_user_viewer'; user_email?: string; user_id?: string; }[] | { role: 'org_admin' | 'internal_user' | 'internal_user_viewer'; user_email?: string; user_id?: string; }, organization_id: string, max_budget_in_organization?: number): { organization_id: string; updated_organization_memberships: object[]; updated_users: object[]; }`\n\n**post** `/organization/member_add`\n\n[BETA]\n\nAdd new members (either via user_email or user_id) to an organization\n\nIf user doesn't exist, new user row will also be added to User Table\n\nOnly proxy_admin or org_admin of organization, allowed to access this endpoint.\n\n# Parameters:\n\n- organization_id: str (required)\n- member: Union[List[Member], Member] (required)\n    - role: Literal[LLMUserRoles] (required)\n    - user_id: Optional[str]\n    - user_email: Optional[str]\n\nNote: Either user_id or user_email must be provided for each member.\n\nExample:\n```\ncurl -X POST 'http://0.0.0.0:4000/organization/member_add'     -H 'Authorization: Bearer sk-1234'     -H 'Content-Type: application/json'     -d '{\n    \"organization_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"member\": {\n        \"role\": \"internal_user\",\n        \"user_id\": \"dev247652@hanzo.ai\"\n    },\n    \"max_budget_in_organization\": 100.0\n}'\n```\n\nThe following is executed in this function:\n\n1. Check if organization exists\n2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable\n3. Add Internal User to the `LLM_OrganizationMembership` table\n\n### Parameters\n\n- `member: { role: 'org_admin' | 'internal_user' | 'internal_user_viewer'; user_email?: string; user_id?: string; }[] | { role: 'org_admin' | 'internal_user' | 'internal_user_viewer'; user_email?: string; user_id?: string; }`\n\n- `organization_id: string`\n\n- `max_budget_in_organization?: number`\n\n### Returns\n\n- `{ organization_id: string; updated_organization_memberships: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; updated_users: { user_id: string; budget_duration?: string; budget_reset_at?: string; max_budget?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; organization_memberships?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; rpm_limit?: number; spend?: number; sso_user_id?: string; teams?: string[]; tpm_limit?: number; user_email?: string; user_role?: string; }[]; }`\n\n  - `organization_id: string`\n  - `updated_organization_memberships: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]`\n  - `updated_users: { user_id: string; budget_duration?: string; budget_reset_at?: string; max_budget?: number; metadata?: object; model_max_budget?: object; model_spend?: object; models?: object[]; organization_memberships?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; rpm_limit?: number; spend?: number; sso_user_id?: string; teams?: string[]; tpm_limit?: number; user_email?: string; user_role?: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.organization.addMember({ member: [{ role: 'org_admin' }], organization_id: 'organization_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'delete_member',
    endpoint: '/organization/member_delete',
    httpMethod: 'delete',
    summary: 'Organization Member Delete',
    description: 'Delete a member from an organization',
    stainlessPath: '(resource) organization > (method) delete_member',
    qualified: 'client.organization.deleteMember',
    params: ['organization_id: string;', 'user_email?: string;', 'user_id?: string;'],
    response: 'object',
    markdown:
      "## delete_member\n\n`client.organization.deleteMember(organization_id: string, user_email?: string, user_id?: string): object`\n\n**delete** `/organization/member_delete`\n\nDelete a member from an organization\n\n### Parameters\n\n- `organization_id: string`\n\n- `user_email?: string`\n\n- `user_id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.organization.deleteMember({ organization_id: 'organization_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'update_member',
    endpoint: '/organization/member_update',
    httpMethod: 'patch',
    summary: 'Organization Member Update',
    description: "Update a member's role in an organization",
    stainlessPath: '(resource) organization > (method) update_member',
    qualified: 'client.organization.updateMember',
    params: [
      'organization_id: string;',
      'max_budget_in_organization?: number;',
      'role?: string;',
      'user_email?: string;',
      'user_id?: string;',
    ],
    response:
      '{ created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }',
    markdown:
      "## update_member\n\n`client.organization.updateMember(organization_id: string, max_budget_in_organization?: number, role?: string, user_email?: string, user_id?: string): { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }`\n\n**patch** `/organization/member_update`\n\nUpdate a member's role in an organization\n\n### Parameters\n\n- `organization_id: string`\n\n- `max_budget_in_organization?: number`\n\n- `role?: string`\n  Admin Roles:\nPROXY_ADMIN: admin over the platform\nPROXY_ADMIN_VIEW_ONLY: can login, view all own keys, view all spend\nORG_ADMIN: admin over a specific organization, can create teams, users only within their organization\n\nInternal User Roles:\nINTERNAL_USER: can login, view/create/delete their own keys, view their spend\nINTERNAL_USER_VIEW_ONLY: can login, view their own keys, view their own spend\n\n\nTeam Roles:\nTEAM: used for JWT auth\n\n\nCustomer Roles:\nCUSTOMER: External users -> these are customers\n\n- `user_email?: string`\n\n- `user_id?: string`\n\n### Returns\n\n- `{ created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }`\n  This is the table that track what organizations a user belongs to and users spend within the organization\n\n  - `created_at: string`\n  - `organization_id: string`\n  - `updated_at: string`\n  - `user_id: string`\n  - `budget_id?: string`\n  - `llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }`\n  - `spend?: number`\n  - `user?: object`\n  - `user_role?: string`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.organization.updateMember({ organization_id: 'organization_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/organization/info',
    httpMethod: 'get',
    summary: 'Info Organization',
    description: 'Get the org specific information',
    stainlessPath: '(resource) organization.info > (method) retrieve',
    qualified: 'client.organization.info.retrieve',
    params: ['organization_id: string;'],
    response:
      '{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: object; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: object; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: member[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }',
    markdown:
      "## retrieve\n\n`client.organization.info.retrieve(organization_id: string): { budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: object; members?: object[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: object[]; }`\n\n**get** `/organization/info`\n\nGet the org specific information\n\n### Parameters\n\n- `organization_id: string`\n\n### Returns\n\n- `{ budget_id: string; created_at: string; created_by: string; models: string[]; updated_at: string; updated_by: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]; metadata?: object; organization_alias?: string; organization_id?: string; spend?: number; teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: object[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]; }`\n  Returned by the /organization/info endpoint and /organization/list endpoint\n\n  - `budget_id: string`\n  - `created_at: string`\n  - `created_by: string`\n  - `models: string[]`\n  - `updated_at: string`\n  - `updated_by: string`\n  - `llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }`\n  - `members?: { created_at: string; organization_id: string; updated_at: string; user_id: string; budget_id?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; user?: object; user_role?: string; }[]`\n  - `metadata?: object`\n  - `organization_alias?: string`\n  - `organization_id?: string`\n  - `spend?: number`\n  - `teams?: { team_id: string; admins?: object[]; blocked?: boolean; budget_duration?: string; budget_reset_at?: string; created_at?: string; llm_model_table?: { created_by: string; updated_by: string; model_aliases?: object | string; }; max_budget?: number; max_parallel_requests?: number; members?: object[]; members_with_roles?: { role: 'admin' | 'user'; user_email?: string; user_id?: string; }[]; metadata?: object; model_id?: number; models?: object[]; organization_id?: string; rpm_limit?: number; spend?: number; team_alias?: string; tpm_limit?: number; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst info = await client.organization.info.retrieve({ organization_id: 'organization_id' });\n\nconsole.log(info);\n```",
  },
  {
    name: 'deprecated',
    endpoint: '/organization/info',
    httpMethod: 'post',
    summary: 'Deprecated Info Organization',
    description: 'DEPRECATED: Use GET /organization/info instead',
    stainlessPath: '(resource) organization.info > (method) deprecated',
    qualified: 'client.organization.info.deprecated',
    params: ['organizations: string[];'],
    response: 'object',
    markdown:
      "## deprecated\n\n`client.organization.info.deprecated(organizations: string[]): object`\n\n**post** `/organization/info`\n\nDEPRECATED: Use GET /organization/info instead\n\n### Parameters\n\n- `organizations: string[]`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.organization.info.deprecated({ organizations: ['string'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/customer/new',
    httpMethod: 'post',
    summary: 'New End User',
    description:
      'Allow creating a new Customer \n\n\nParameters:\n- user_id: str - The unique identifier for the user.\n- alias: Optional[str] - A human-friendly alias for the user.\n- blocked: bool - Flag to allow or disallow requests for this end-user. Default is False.\n- max_budget: Optional[float] - The maximum budget allocated to the user. Either \'max_budget\' or \'budget_id\' should be provided, not both.\n- budget_id: Optional[str] - The identifier for an existing budget allocated to the user. Either \'max_budget\' or \'budget_id\' should be provided, not both.\n- allowed_model_region: Optional[Union[Literal["eu"], Literal["us"]]] - Require all user requests to use models in this specific region.\n- default_model: Optional[str] - If no equivalent model in the allowed region, default all requests to this model.\n- metadata: Optional[dict] = Metadata for customer, store information for customer. Example metadata = {"data_training_opt_out": True}\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- tpm_limit: Optional[int] - [Not Implemented Yet] Specify tpm limit for a given customer (Tokens per minute)\n- rpm_limit: Optional[int] - [Not Implemented Yet] Specify rpm limit for a given customer (Requests per minute)\n- model_max_budget: Optional[dict] - [Not Implemented Yet] Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d"}}\n- max_parallel_requests: Optional[int] - [Not Implemented Yet] Specify max parallel requests for a given customer.\n- soft_budget: Optional[float] - [Not Implemented Yet] Get alerts when customer crosses given budget, doesn\'t block requests.\n\n\n- Allow specifying allowed regions \n- Allow specifying default model\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/new\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "user_id" : "z-jaff-3",\n        "allowed_region": "eu",\n        "budget_id": "free_tier",\n        "default_model": "azure/gpt-3.5-turbo-eu" <- all calls from this user, use this model? \n    }\'\n\n    # return end-user object\n```\n\nNOTE: This used to be called `/end_user/new`, we will still be maintaining compatibility for /end_user/XXX for these endpoints',
    stainlessPath: '(resource) customer > (method) create',
    qualified: 'client.customer.create',
    params: [
      'user_id: string;',
      'alias?: string;',
      "allowed_model_region?: 'eu' | 'us';",
      'blocked?: boolean;',
      'budget_duration?: string;',
      'budget_id?: string;',
      'default_model?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'model_max_budget?: object;',
      'rpm_limit?: number;',
      'soft_budget?: number;',
      'tpm_limit?: number;',
    ],
    response: 'object',
    markdown:
      "## create\n\n`client.customer.create(user_id: string, alias?: string, allowed_model_region?: 'eu' | 'us', blocked?: boolean, budget_duration?: string, budget_id?: string, default_model?: string, max_budget?: number, max_parallel_requests?: number, model_max_budget?: object, rpm_limit?: number, soft_budget?: number, tpm_limit?: number): object`\n\n**post** `/customer/new`\n\nAllow creating a new Customer \n\n\nParameters:\n- user_id: str - The unique identifier for the user.\n- alias: Optional[str] - A human-friendly alias for the user.\n- blocked: bool - Flag to allow or disallow requests for this end-user. Default is False.\n- max_budget: Optional[float] - The maximum budget allocated to the user. Either 'max_budget' or 'budget_id' should be provided, not both.\n- budget_id: Optional[str] - The identifier for an existing budget allocated to the user. Either 'max_budget' or 'budget_id' should be provided, not both.\n- allowed_model_region: Optional[Union[Literal[\"eu\"], Literal[\"us\"]]] - Require all user requests to use models in this specific region.\n- default_model: Optional[str] - If no equivalent model in the allowed region, default all requests to this model.\n- metadata: Optional[dict] = Metadata for customer, store information for customer. Example metadata = {\"data_training_opt_out\": True}\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds (\"30s\"), minutes (\"30m\"), hours (\"30h\"), days (\"30d\").\n- tpm_limit: Optional[int] - [Not Implemented Yet] Specify tpm limit for a given customer (Tokens per minute)\n- rpm_limit: Optional[int] - [Not Implemented Yet] Specify rpm limit for a given customer (Requests per minute)\n- model_max_budget: Optional[dict] - [Not Implemented Yet] Specify max budget for a given model. Example: {\"openai/gpt-4o-mini\": {\"max_budget\": 100.0, \"budget_duration\": \"1d\"}}\n- max_parallel_requests: Optional[int] - [Not Implemented Yet] Specify max parallel requests for a given customer.\n- soft_budget: Optional[float] - [Not Implemented Yet] Get alerts when customer crosses given budget, doesn't block requests.\n\n\n- Allow specifying allowed regions \n- Allow specifying default model\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/new'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{\n        \"user_id\" : \"z-jaff-3\",\n        \"allowed_region\": \"eu\",\n        \"budget_id\": \"free_tier\",\n        \"default_model\": \"azure/gpt-3.5-turbo-eu\" <- all calls from this user, use this model? \n    }'\n\n    # return end-user object\n```\n\nNOTE: This used to be called `/end_user/new`, we will still be maintaining compatibility for /end_user/XXX for these endpoints\n\n### Parameters\n\n- `user_id: string`\n\n- `alias?: string`\n\n- `allowed_model_region?: 'eu' | 'us'`\n\n- `blocked?: boolean`\n\n- `budget_duration?: string`\n  Max duration budget should be set for (e.g. '1hr', '1d', '28d')\n\n- `budget_id?: string`\n\n- `default_model?: string`\n\n- `max_budget?: number`\n  Requests will fail if this budget (in USD) is exceeded.\n\n- `max_parallel_requests?: number`\n  Max concurrent requests allowed for this budget id.\n\n- `model_max_budget?: object`\n  Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})\n\n- `rpm_limit?: number`\n  Max requests per minute, allowed for this budget id.\n\n- `soft_budget?: number`\n  Requests will NOT fail if this is exceeded. Will fire alerting though.\n\n- `tpm_limit?: number`\n  Max tokens per minute, allowed for this budget id.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst customer = await client.customer.create({ user_id: 'user_id' });\n\nconsole.log(customer);\n```",
  },
  {
    name: 'update',
    endpoint: '/customer/update',
    httpMethod: 'post',
    summary: 'Update End User',
    description:
      'Example curl \n\nParameters:\n- user_id: str\n- alias: Optional[str] = None  # human-friendly alias\n- blocked: bool = False  # allow/disallow requests for this end-user\n- max_budget: Optional[float] = None\n- budget_id: Optional[str] = None  # give either a budget_id or max_budget\n- allowed_model_region: Optional[AllowedModelRegion] = (\n    None  # require all user requests to use models in this specific region\n)\n- default_model: Optional[str] = (\n    None  # if no equivalent model in allowed region - default all requests to this model\n)\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "budget_id": "paid_tier"\n}\'\n\nSee below for all params \n```',
    stainlessPath: '(resource) customer > (method) update',
    qualified: 'client.customer.update',
    params: [
      'user_id: string;',
      'alias?: string;',
      "allowed_model_region?: 'eu' | 'us';",
      'blocked?: boolean;',
      'budget_id?: string;',
      'default_model?: string;',
      'max_budget?: number;',
    ],
    response: 'object',
    markdown:
      "## update\n\n`client.customer.update(user_id: string, alias?: string, allowed_model_region?: 'eu' | 'us', blocked?: boolean, budget_id?: string, default_model?: string, max_budget?: number): object`\n\n**post** `/customer/update`\n\nExample curl \n\nParameters:\n- user_id: str\n- alias: Optional[str] = None  # human-friendly alias\n- blocked: bool = False  # allow/disallow requests for this end-user\n- max_budget: Optional[float] = None\n- budget_id: Optional[str] = None  # give either a budget_id or max_budget\n- allowed_model_region: Optional[AllowedModelRegion] = (\n    None  # require all user requests to use models in this specific region\n)\n- default_model: Optional[str] = (\n    None  # if no equivalent model in allowed region - default all requests to this model\n)\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/update'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"user_id\": \"test-llm-user-4\",\n    \"budget_id\": \"paid_tier\"\n}'\n\nSee below for all params \n```\n\n### Parameters\n\n- `user_id: string`\n\n- `alias?: string`\n\n- `allowed_model_region?: 'eu' | 'us'`\n\n- `blocked?: boolean`\n\n- `budget_id?: string`\n\n- `default_model?: string`\n\n- `max_budget?: number`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst customer = await client.customer.update({ user_id: 'user_id' });\n\nconsole.log(customer);\n```",
  },
  {
    name: 'list',
    endpoint: '/customer/list',
    httpMethod: 'get',
    summary: 'List End User',
    description:
      "[Admin-only] List all available customers\n\nExample curl:\n```\ncurl --location --request GET 'http://0.0.0.0:4000/customer/list'         --header 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) customer > (method) list',
    qualified: 'client.customer.list',
    response:
      "{ blocked: boolean; user_id: string; alias?: string; allowed_model_region?: 'eu' | 'us'; default_model?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; }[]",
    markdown:
      "## list\n\n`client.customer.list(): { blocked: boolean; user_id: string; alias?: string; allowed_model_region?: 'eu' | 'us'; default_model?: string; llm_budget_table?: object; spend?: number; }[]`\n\n**get** `/customer/list`\n\n[Admin-only] List all available customers\n\nExample curl:\n```\ncurl --location --request GET 'http://0.0.0.0:4000/customer/list'         --header 'Authorization: Bearer sk-1234'\n```\n\n### Returns\n\n- `{ blocked: boolean; user_id: string; alias?: string; allowed_model_region?: 'eu' | 'us'; default_model?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst customers = await client.customer.list();\n\nconsole.log(customers);\n```",
  },
  {
    name: 'delete',
    endpoint: '/customer/delete',
    httpMethod: 'post',
    summary: 'Delete End User',
    description:
      "Delete multiple end-users.\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to delete\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/delete'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{\n        \"user_ids\" :[\"z-jaff-5\"]\n}'\n\nSee below for all params \n```",
    stainlessPath: '(resource) customer > (method) delete',
    qualified: 'client.customer.delete',
    params: ['user_ids: string[];'],
    response: 'object',
    markdown:
      "## delete\n\n`client.customer.delete(user_ids: string[]): object`\n\n**post** `/customer/delete`\n\nDelete multiple end-users.\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to delete\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/delete'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{\n        \"user_ids\" :[\"z-jaff-5\"]\n}'\n\nSee below for all params \n```\n\n### Parameters\n\n- `user_ids: string[]`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst customer = await client.customer.delete({ user_ids: ['string'] });\n\nconsole.log(customer);\n```",
  },
  {
    name: 'block',
    endpoint: '/customer/block',
    httpMethod: 'post',
    summary: 'Block User',
    description:
      '[BETA] Reject calls with this end-user id\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to block\n\n    (any /chat/completion call with this user={end-user-id} param, will be rejected.)\n\n    ```\n    curl -X POST "http://0.0.0.0:8000/user/block"\n    -H "Authorization: Bearer sk-1234"\n    -d \'{\n    "user_ids": [<user_id>, ...]\n    }\'\n    ```',
    stainlessPath: '(resource) customer > (method) block',
    qualified: 'client.customer.block',
    params: ['user_ids: string[];'],
    response: 'object',
    markdown:
      '## block\n\n`client.customer.block(user_ids: string[]): object`\n\n**post** `/customer/block`\n\n[BETA] Reject calls with this end-user id\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to block\n\n    (any /chat/completion call with this user={end-user-id} param, will be rejected.)\n\n    ```\n    curl -X POST "http://0.0.0.0:8000/user/block"\n    -H "Authorization: Bearer sk-1234"\n    -d \'{\n    "user_ids": [<user_id>, ...]\n    }\'\n    ```\n\n### Parameters\n\n- `user_ids: string[]`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.customer.block({ user_ids: [\'string\'] });\n\nconsole.log(response);\n```',
  },
  {
    name: 'retrieve_info',
    endpoint: '/customer/info',
    httpMethod: 'get',
    summary: 'End User Info',
    description:
      "Get information about an end-user. An `end_user` is a customer (external user) of the proxy.\n\nParameters:\n- end_user_id (str, required): The unique identifier for the end-user\n\nExample curl:\n```\ncurl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'\n```",
    stainlessPath: '(resource) customer > (method) retrieve_info',
    qualified: 'client.customer.retrieveInfo',
    params: ['end_user_id: string;'],
    response:
      "{ blocked: boolean; user_id: string; alias?: string; allowed_model_region?: 'eu' | 'us'; default_model?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; }",
    markdown:
      "## retrieve_info\n\n`client.customer.retrieveInfo(end_user_id: string): { blocked: boolean; user_id: string; alias?: string; allowed_model_region?: 'eu' | 'us'; default_model?: string; llm_budget_table?: object; spend?: number; }`\n\n**get** `/customer/info`\n\nGet information about an end-user. An `end_user` is a customer (external user) of the proxy.\n\nParameters:\n- end_user_id (str, required): The unique identifier for the end-user\n\nExample curl:\n```\ncurl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'\n```\n\n### Parameters\n\n- `end_user_id: string`\n  End User ID in the request parameters\n\n### Returns\n\n- `{ blocked: boolean; user_id: string; alias?: string; allowed_model_region?: 'eu' | 'us'; default_model?: string; llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }; spend?: number; }`\n\n  - `blocked: boolean`\n  - `user_id: string`\n  - `alias?: string`\n  - `allowed_model_region?: 'eu' | 'us'`\n  - `default_model?: string`\n  - `llm_budget_table?: { budget_duration?: string; max_budget?: number; max_parallel_requests?: number; model_max_budget?: object; rpm_limit?: number; soft_budget?: number; tpm_limit?: number; }`\n  - `spend?: number`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.customer.retrieveInfo({ end_user_id: 'end_user_id' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'unblock',
    endpoint: '/customer/unblock',
    httpMethod: 'post',
    summary: 'Unblock User',
    description:
      '[BETA] Unblock calls with this user id\n\nExample\n```\ncurl -X POST "http://0.0.0.0:8000/user/unblock"\n-H "Authorization: Bearer sk-1234"\n-d \'{\n"user_ids": [<user_id>, ...]\n}\'\n```',
    stainlessPath: '(resource) customer > (method) unblock',
    qualified: 'client.customer.unblock',
    params: ['user_ids: string[];'],
    response: 'object',
    markdown:
      '## unblock\n\n`client.customer.unblock(user_ids: string[]): object`\n\n**post** `/customer/unblock`\n\n[BETA] Unblock calls with this user id\n\nExample\n```\ncurl -X POST "http://0.0.0.0:8000/user/unblock"\n-H "Authorization: Bearer sk-1234"\n-d \'{\n"user_ids": [<user_id>, ...]\n}\'\n```\n\n### Parameters\n\n- `user_ids: string[]`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.customer.unblock({ user_ids: [\'string\'] });\n\nconsole.log(response);\n```',
  },
  {
    name: 'calculate_spend',
    endpoint: '/spend/calculate',
    httpMethod: 'post',
    summary: 'Calculate Spend',
    description:
      'Accepts all the params of completion_cost.\n\nCalculate spend **before** making call:\n\nNote: If you see a spend of $0.0 you need to set custom_pricing for your model: https://docs.hanzo.ai/docs/proxy/custom_pricing\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "model": "anthropic.claude-v2",\n    "messages": [{"role": "user", "content": "Hey, how\'\'\'s it going?"}]\n}\'\n```\n\nCalculate spend **after** making call:\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "completion_response": {\n        "id": "chatcmpl-123",\n        "object": "chat.completion",\n        "created": 1677652288,\n        "model": "gpt-3.5-turbo-0125",\n        "system_fingerprint": "fp_44709d6fcb",\n        "choices": [{\n            "index": 0,\n            "message": {\n                "role": "assistant",\n                "content": "Hello there, how may I assist you today?"\n            },\n            "logprobs": null,\n            "finish_reason": "stop"\n        }]\n        "usage": {\n            "prompt_tokens": 9,\n            "completion_tokens": 12,\n            "total_tokens": 21\n        }\n    }\n}\'\n```',
    stainlessPath: '(resource) spend > (method) calculate_spend',
    qualified: 'client.spend.calculateSpend',
    params: ['completion_response?: object;', 'messages?: object[];', 'model?: string;'],
    response: 'object',
    markdown:
      '## calculate_spend\n\n`client.spend.calculateSpend(completion_response?: object, messages?: object[], model?: string): object`\n\n**post** `/spend/calculate`\n\nAccepts all the params of completion_cost.\n\nCalculate spend **before** making call:\n\nNote: If you see a spend of $0.0 you need to set custom_pricing for your model: https://docs.hanzo.ai/docs/proxy/custom_pricing\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "model": "anthropic.claude-v2",\n    "messages": [{"role": "user", "content": "Hey, how\'\'\'s it going?"}]\n}\'\n```\n\nCalculate spend **after** making call:\n\n```\ncurl --location \'http://localhost:4000/spend/calculate\'\n--header \'Authorization: Bearer sk-1234\'\n--header \'Content-Type: application/json\'\n--data \'{\n    "completion_response": {\n        "id": "chatcmpl-123",\n        "object": "chat.completion",\n        "created": 1677652288,\n        "model": "gpt-3.5-turbo-0125",\n        "system_fingerprint": "fp_44709d6fcb",\n        "choices": [{\n            "index": 0,\n            "message": {\n                "role": "assistant",\n                "content": "Hello there, how may I assist you today?"\n            },\n            "logprobs": null,\n            "finish_reason": "stop"\n        }]\n        "usage": {\n            "prompt_tokens": 9,\n            "completion_tokens": 12,\n            "total_tokens": 21\n        }\n    }\n}\'\n```\n\n### Parameters\n\n- `completion_response?: object`\n\n- `messages?: object[]`\n\n- `model?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.spend.calculateSpend();\n\nconsole.log(response);\n```',
  },
  {
    name: 'list_logs',
    endpoint: '/spend/logs',
    httpMethod: 'get',
    summary: 'View Spend Logs',
    description:
      'View all spend logs, if request_id is provided, only logs for that request_id will be returned\n\nExample Request for all logs\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific request_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?request_id=chatcmpl-6dcb2540-d3d7-4e49-bb27-291f863f112e" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific api_key\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?api_key=sk-Fn8Ej39NkBQmUagFEoUWPQ" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific user_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?user_id=z@hanzo.ai" -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) spend > (method) list_logs',
    qualified: 'client.spend.listLogs',
    params: [
      'api_key?: string;',
      'end_date?: string;',
      'request_id?: string;',
      'start_date?: string;',
      'user_id?: string;',
    ],
    response:
      '{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]',
    markdown:
      '## list_logs\n\n`client.spend.listLogs(api_key?: string, end_date?: string, request_id?: string, start_date?: string, user_id?: string): { api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n**get** `/spend/logs`\n\nView all spend logs, if request_id is provided, only logs for that request_id will be returned\n\nExample Request for all logs\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific request_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?request_id=chatcmpl-6dcb2540-d3d7-4e49-bb27-291f863f112e" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific api_key\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?api_key=sk-Fn8Ej39NkBQmUagFEoUWPQ" -H "Authorization: Bearer sk-1234"\n```\n\nExample Request for specific user_id\n```\ncurl -X GET "http://0.0.0.0:8000/spend/logs?user_id=z@hanzo.ai" -H "Authorization: Bearer sk-1234"\n```\n\n### Parameters\n\n- `api_key?: string`\n  Get spend logs based on api key\n\n- `end_date?: string`\n  Time till which to view key spend\n\n- `request_id?: string`\n  request_id to get spend logs for specific request_id. If none passed then pass spend logs for all requests\n\n- `start_date?: string`\n  Time from which to start viewing key spend\n\n- `user_id?: string`\n  Get spend logs based on user_id\n\n### Returns\n\n- `{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.spend.listLogs();\n\nconsole.log(response);\n```',
  },
  {
    name: 'list_tags',
    endpoint: '/spend/tags',
    httpMethod: 'get',
    summary: 'View Spend Tags',
    description:
      'LLM Enterprise - View Spend Per Request Tag\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) spend > (method) list_tags',
    qualified: 'client.spend.listTags',
    params: ['end_date?: string;', 'start_date?: string;'],
    response:
      '{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]',
    markdown:
      '## list_tags\n\n`client.spend.listTags(end_date?: string, start_date?: string): { api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n**get** `/spend/tags`\n\nLLM Enterprise - View Spend Per Request Tag\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:8000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```\n\n### Parameters\n\n- `end_date?: string`\n  Time till which to view key spend\n\n- `start_date?: string`\n  Time from which to start viewing key spend\n\n### Returns\n\n- `{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.spend.listTags();\n\nconsole.log(response);\n```',
  },
  {
    name: 'list_tags',
    endpoint: '/global/spend/tags',
    httpMethod: 'get',
    summary: 'Global View Spend Tags',
    description:
      'LLM Enterprise - View Spend Per Request Tag. Used by LLM UI\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) global.spend > (method) list_tags',
    qualified: 'client.global.spend.listTags',
    params: ['end_date?: string;', 'start_date?: string;', 'tags?: string;'],
    response:
      '{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]',
    markdown:
      '## list_tags\n\n`client.global.spend.listTags(end_date?: string, start_date?: string, tags?: string): { api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n**get** `/global/spend/tags`\n\nLLM Enterprise - View Spend Per Request Tag. Used by LLM UI\n\nExample Request:\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags" -H "Authorization: Bearer sk-1234"\n```\n\nSpend with Start Date and End Date\n```\ncurl -X GET "http://0.0.0.0:4000/spend/tags?start_date=2022-01-01&end_date=2022-02-01" -H "Authorization: Bearer sk-1234"\n```\n\n### Parameters\n\n- `end_date?: string`\n  Time till which to view key spend\n\n- `start_date?: string`\n  Time from which to start viewing key spend\n\n- `tags?: string`\n  comman separated tags to filter on\n\n### Returns\n\n- `{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.global.spend.listTags();\n\nconsole.log(response);\n```',
  },
  {
    name: 'reset',
    endpoint: '/global/spend/reset',
    httpMethod: 'post',
    summary: 'Global Spend Reset',
    description:
      'ADMIN ONLY / MASTER KEY Only Endpoint\n\nGlobally reset spend for All API Keys and Teams, maintain LLM_SpendLogs\n\n1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there\n2. LLM_VerificationTokens spend will be set = 0\n3. LLM_TeamTable spend will be set = 0',
    stainlessPath: '(resource) global.spend > (method) reset',
    qualified: 'client.global.spend.reset',
    response: 'object',
    markdown:
      "## reset\n\n`client.global.spend.reset(): object`\n\n**post** `/global/spend/reset`\n\nADMIN ONLY / MASTER KEY Only Endpoint\n\nGlobally reset spend for All API Keys and Teams, maintain LLM_SpendLogs\n\n1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there\n2. LLM_VerificationTokens spend will be set = 0\n3. LLM_TeamTable spend will be set = 0\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.global.spend.reset();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_report',
    endpoint: '/global/spend/report',
    httpMethod: 'get',
    summary: 'Get Global Spend Report',
    description:
      'Get Daily Spend per Team, based on specific startTime and endTime. Per team, view usage by each key, model\n[\n    {\n        "group-by-day": "2024-05-10",\n        "teams": [\n            {\n                "team_name": "team-1"\n                "spend": 10,\n                "keys": [\n                    "key": "1213",\n                    "usage": {\n                        "model-1": {\n                                "cost": 12.50,\n                                "input_tokens": 1000,\n                                "output_tokens": 5000,\n                                "requests": 100\n                            },\n                            "audio-modelname1": {\n                            "cost": 25.50,\n                            "seconds": 25,\n                            "requests": 50\n                    },\n                    }\n                }\n        ]\n    ]\n}',
    stainlessPath: '(resource) global.spend > (method) retrieve_report',
    qualified: 'client.global.spend.retrieveReport',
    params: [
      'api_key?: string;',
      'customer_id?: string;',
      'end_date?: string;',
      "group_by?: 'team' | 'customer' | 'api_key';",
      'internal_user_id?: string;',
      'start_date?: string;',
      'team_id?: string;',
    ],
    response:
      '{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]',
    markdown:
      '## retrieve_report\n\n`client.global.spend.retrieveReport(api_key?: string, customer_id?: string, end_date?: string, group_by?: \'team\' | \'customer\' | \'api_key\', internal_user_id?: string, start_date?: string, team_id?: string): { api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n**get** `/global/spend/report`\n\nGet Daily Spend per Team, based on specific startTime and endTime. Per team, view usage by each key, model\n[\n    {\n        "group-by-day": "2024-05-10",\n        "teams": [\n            {\n                "team_name": "team-1"\n                "spend": 10,\n                "keys": [\n                    "key": "1213",\n                    "usage": {\n                        "model-1": {\n                                "cost": 12.50,\n                                "input_tokens": 1000,\n                                "output_tokens": 5000,\n                                "requests": 100\n                            },\n                            "audio-modelname1": {\n                            "cost": 25.50,\n                            "seconds": 25,\n                            "requests": 50\n                    },\n                    }\n                }\n        ]\n    ]\n}\n\n### Parameters\n\n- `api_key?: string`\n  View spend for a specific api_key. Example api_key=\'sk-1234\n\n- `customer_id?: string`\n  View spend for a specific customer_id. Example customer_id=\'1234. Can be used in conjunction with team_id as well.\n\n- `end_date?: string`\n  Time till which to view spend\n\n- `group_by?: \'team\' | \'customer\' | \'api_key\'`\n  Group spend by internal team or customer or api_key\n\n- `internal_user_id?: string`\n  View spend for a specific internal_user_id. Example internal_user_id=\'1234\n\n- `start_date?: string`\n  Time from which to start viewing spend\n\n- `team_id?: string`\n  View spend for a specific team_id. Example team_id=\'1234\n\n### Returns\n\n- `{ api_key: string; call_type: string; endTime: string | string; messages: string | object[] | object; request_id: string; response: string | object[] | object; startTime: string | string; api_base?: string; cache_hit?: string; cache_key?: string; completion_tokens?: number; metadata?: object; model?: string; prompt_tokens?: number; request_tags?: object; requester_ip_address?: string; spend?: number; total_tokens?: number; user?: string; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.global.spend.retrieveReport();\n\nconsole.log(response);\n```',
  },
  {
    name: 'list_budgets',
    endpoint: '/provider/budgets',
    httpMethod: 'get',
    summary: 'Provider Budgets',
    description:
      'Provider Budget Routing - Get Budget, Spend Details https://docs.hanzo.ai/docs/proxy/provider_budget_routing\n\nUse this endpoint to check current budget, spend and budget reset time for a provider\n\nExample Request\n\n```bash\ncurl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"\n```\n\nExample Response\n\n```json\n{\n    "providers": {\n        "openai": {\n            "budget_limit": 1e-12,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "azure": {\n            "budget_limit": 100.0,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "anthropic": {\n            "budget_limit": 100.0,\n            "time_period": "10d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "vertex_ai": {\n            "budget_limit": 100.0,\n            "time_period": "12d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        }\n    }\n}\n```',
    stainlessPath: '(resource) provider > (method) list_budgets',
    qualified: 'client.provider.listBudgets',
    response: '{ providers?: object; }',
    markdown:
      '## list_budgets\n\n`client.provider.listBudgets(): { providers?: object; }`\n\n**get** `/provider/budgets`\n\nProvider Budget Routing - Get Budget, Spend Details https://docs.hanzo.ai/docs/proxy/provider_budget_routing\n\nUse this endpoint to check current budget, spend and budget reset time for a provider\n\nExample Request\n\n```bash\ncurl -X GET http://localhost:4000/provider/budgets     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"\n```\n\nExample Response\n\n```json\n{\n    "providers": {\n        "openai": {\n            "budget_limit": 1e-12,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "azure": {\n            "budget_limit": 100.0,\n            "time_period": "1d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "anthropic": {\n            "budget_limit": 100.0,\n            "time_period": "10d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        },\n        "vertex_ai": {\n            "budget_limit": 100.0,\n            "time_period": "12d",\n            "spend": 0.0,\n            "budget_reset_at": null\n        }\n    }\n}\n```\n\n### Returns\n\n- `{ providers?: object; }`\n  Complete provider budget configuration and status.\nMaps provider names to their budget configs.\n\n  - `providers?: object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.provider.listBudgets();\n\nconsole.log(response);\n```',
  },
  {
    name: 'delete',
    endpoint: '/cache/delete',
    httpMethod: 'post',
    summary: 'Cache Delete',
    description:
      'Endpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers\n\nParameters:\n- **keys**: *Optional[List[str]]* - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}\n\n```shell\ncurl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d \'{"keys": ["key1", "key2"]}\'\n```',
    stainlessPath: '(resource) cache > (method) delete',
    qualified: 'client.cache.delete',
    response: 'object',
    markdown:
      '## delete\n\n`client.cache.delete(): object`\n\n**post** `/cache/delete`\n\nEndpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers\n\nParameters:\n- **keys**: *Optional[List[str]]* - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}\n\n```shell\ncurl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d \'{"keys": ["key1", "key2"]}\'\n```\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst cache = await client.cache.delete();\n\nconsole.log(cache);\n```',
  },
  {
    name: 'flush_all',
    endpoint: '/cache/flushall',
    httpMethod: 'post',
    summary: 'Cache Flushall',
    description:
      'A function to flush all items from the cache. (All items will be deleted from the cache with this)\nRaises HTTPException if the cache is not initialized or if the cache type does not support flushing.\nReturns a dictionary with the status of the operation.\n\nUsage:\n```\ncurl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"\n```',
    stainlessPath: '(resource) cache > (method) flush_all',
    qualified: 'client.cache.flushAll',
    response: 'object',
    markdown:
      '## flush_all\n\n`client.cache.flushAll(): object`\n\n**post** `/cache/flushall`\n\nA function to flush all items from the cache. (All items will be deleted from the cache with this)\nRaises HTTPException if the cache is not initialized or if the cache type does not support flushing.\nReturns a dictionary with the status of the operation.\n\nUsage:\n```\ncurl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"\n```\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst response = await client.cache.flushAll();\n\nconsole.log(response);\n```',
  },
  {
    name: 'ping',
    endpoint: '/cache/ping',
    httpMethod: 'get',
    summary: 'Cache Ping',
    description: 'Endpoint for checking if cache can be pinged',
    stainlessPath: '(resource) cache > (method) ping',
    qualified: 'client.cache.ping',
    response:
      '{ cache_type: string; status: string; health_check_cache_params?: object; llm_cache_params?: string; ping_response?: boolean; set_cache_response?: string; }',
    markdown:
      "## ping\n\n`client.cache.ping(): { cache_type: string; status: string; health_check_cache_params?: object; llm_cache_params?: string; ping_response?: boolean; set_cache_response?: string; }`\n\n**get** `/cache/ping`\n\nEndpoint for checking if cache can be pinged\n\n### Returns\n\n- `{ cache_type: string; status: string; health_check_cache_params?: object; llm_cache_params?: string; ping_response?: boolean; set_cache_response?: string; }`\n\n  - `cache_type: string`\n  - `status: string`\n  - `health_check_cache_params?: object`\n  - `llm_cache_params?: string`\n  - `ping_response?: boolean`\n  - `set_cache_response?: string`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.cache.ping();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_info',
    endpoint: '/cache/redis/info',
    httpMethod: 'get',
    summary: 'Cache Redis Info',
    description: 'Endpoint for getting /redis/info',
    stainlessPath: '(resource) cache.redis > (method) retrieve_info',
    qualified: 'client.cache.redis.retrieveInfo',
    response: 'object',
    markdown:
      "## retrieve_info\n\n`client.cache.redis.retrieveInfo(): object`\n\n**get** `/cache/redis/info`\n\nEndpoint for getting /redis/info\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.cache.redis.retrieveInfo();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/guardrails/list',
    httpMethod: 'get',
    summary: 'List Guardrails',
    description:
      'List the guardrails that are available on the proxy server\n\n👉 [Guardrail docs](https://docs.hanzo.ai/docs/proxy/guardrails/quick_start)\n\nExample Request:\n```bash\ncurl -X GET "http://localhost:4000/guardrails/list" -H "Authorization: Bearer <your_api_key>"\n```\n\nExample Response:\n```json\n{\n    "guardrails": [\n        {\n        "guardrail_name": "bedrock-pre-guard",\n        "guardrail_info": {\n            "params": [\n            {\n                "name": "toxicity_score",\n                "type": "float",\n                "description": "Score between 0-1 indicating content toxicity level"\n            },\n            {\n                "name": "pii_detection",\n                "type": "boolean"\n            }\n            ]\n        }\n        }\n    ]\n}\n```',
    stainlessPath: '(resource) guardrails > (method) list',
    qualified: 'client.guardrails.list',
    response:
      '{ guardrails: { guardrail_info: object; guardrail_name: string; llm_params: { guardrail: string; mode: string | string[]; default_on?: boolean; }; }[]; }',
    markdown:
      '## list\n\n`client.guardrails.list(): { guardrails: object[]; }`\n\n**get** `/guardrails/list`\n\nList the guardrails that are available on the proxy server\n\n👉 [Guardrail docs](https://docs.hanzo.ai/docs/proxy/guardrails/quick_start)\n\nExample Request:\n```bash\ncurl -X GET "http://localhost:4000/guardrails/list" -H "Authorization: Bearer <your_api_key>"\n```\n\nExample Response:\n```json\n{\n    "guardrails": [\n        {\n        "guardrail_name": "bedrock-pre-guard",\n        "guardrail_info": {\n            "params": [\n            {\n                "name": "toxicity_score",\n                "type": "float",\n                "description": "Score between 0-1 indicating content toxicity level"\n            },\n            {\n                "name": "pii_detection",\n                "type": "boolean"\n            }\n            ]\n        }\n        }\n    ]\n}\n```\n\n### Returns\n\n- `{ guardrails: { guardrail_info: object; guardrail_name: string; llm_params: { guardrail: string; mode: string | string[]; default_on?: boolean; }; }[]; }`\n\n  - `guardrails: { guardrail_info: object; guardrail_name: string; llm_params: { guardrail: string; mode: string | string[]; default_on?: boolean; }; }[]`\n\n### Example\n\n```typescript\nimport Hanzo from \'hanzoai\';\n\nconst client = new Hanzo();\n\nconst guardrails = await client.guardrails.list();\n\nconsole.log(guardrails);\n```',
  },
  {
    name: 'add_allowed_ip',
    endpoint: '/add/allowed_ip',
    httpMethod: 'post',
    summary: 'Add Allowed Ip',
    description: 'Add Allowed Ip',
    stainlessPath: '(resource) add > (method) add_allowed_ip',
    qualified: 'client.add.addAllowedIP',
    params: ['ip: string;'],
    response: 'object',
    markdown:
      "## add_allowed_ip\n\n`client.add.addAllowedIP(ip: string): object`\n\n**post** `/add/allowed_ip`\n\nAdd Allowed Ip\n\n### Parameters\n\n- `ip: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.add.addAllowedIP({ ip: 'ip' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create_allowed_ip',
    endpoint: '/delete/allowed_ip',
    httpMethod: 'post',
    summary: 'Delete Allowed Ip',
    description: 'Delete Allowed Ip',
    stainlessPath: '(resource) delete > (method) create_allowed_ip',
    qualified: 'client.delete.createAllowedIP',
    params: ['ip: string;'],
    response: 'object',
    markdown:
      "## create_allowed_ip\n\n`client.delete.createAllowedIP(ip: string): object`\n\n**post** `/delete/allowed_ip`\n\nDelete Allowed Ip\n\n### Parameters\n\n- `ip: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.delete.createAllowedIP({ ip: 'ip' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/{provider}/v1/files',
    httpMethod: 'post',
    summary: 'Create File',
    description:
      'Upload a file that can be used across - Assistants API, Batch API \nThis is the equivalent of POST https://api.openai.com/v1/files\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/create\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files         -H "Authorization: Bearer sk-1234"         -F purpose="batch"         -F file="@mydata.jsonl"\n\n```',
    stainlessPath: '(resource) files > (method) create',
    qualified: 'client.files.create',
    params: ['provider: string;', 'file: string;', 'purpose: string;', 'custom_llm_provider?: string;'],
    response: 'object',
    markdown:
      "## create\n\n`client.files.create(provider: string, file: string, purpose: string, custom_llm_provider?: string): object`\n\n**post** `/{provider}/v1/files`\n\nUpload a file that can be used across - Assistants API, Batch API \nThis is the equivalent of POST https://api.openai.com/v1/files\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/create\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files         -H \"Authorization: Bearer sk-1234\"         -F purpose=\"batch\"         -F file=\"@mydata.jsonl\"\n\n```\n\n### Parameters\n\n- `provider: string`\n\n- `file: string`\n\n- `purpose: string`\n\n- `custom_llm_provider?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst file = await client.files.create('provider', { file: fs.createReadStream('path/to/file'), purpose: 'purpose' });\n\nconsole.log(file);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/{provider}/v1/files/{file_id}',
    httpMethod: 'get',
    summary: 'Get File',
    description:
      'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123         -H "Authorization: Bearer sk-1234"\n\n```',
    stainlessPath: '(resource) files > (method) retrieve',
    qualified: 'client.files.retrieve',
    params: ['provider: string;', 'file_id: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.files.retrieve(provider: string, file_id: string): object`\n\n**get** `/{provider}/v1/files/{file_id}`\n\nReturns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123         -H \"Authorization: Bearer sk-1234\"\n\n```\n\n### Parameters\n\n- `provider: string`\n\n- `file_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst file = await client.files.retrieve('file_id', { provider: 'provider' });\n\nconsole.log(file);\n```",
  },
  {
    name: 'list',
    endpoint: '/{provider}/v1/files',
    httpMethod: 'get',
    summary: 'List Files',
    description:
      'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files        -H "Authorization: Bearer sk-1234"\n\n```',
    stainlessPath: '(resource) files > (method) list',
    qualified: 'client.files.list',
    params: ['provider: string;', 'purpose?: string;'],
    response: 'object',
    markdown:
      "## list\n\n`client.files.list(provider: string, purpose?: string): object`\n\n**get** `/{provider}/v1/files`\n\nReturns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/list\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files        -H \"Authorization: Bearer sk-1234\"\n\n```\n\n### Parameters\n\n- `provider: string`\n\n- `purpose?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst files = await client.files.list('provider');\n\nconsole.log(files);\n```",
  },
  {
    name: 'delete',
    endpoint: '/{provider}/v1/files/{file_id}',
    httpMethod: 'delete',
    summary: 'Delete File',
    description:
      'Deletes a specified file. that can be used across - Assistants API, Batch API \nThis is the equivalent of DELETE https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/delete\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123     -X DELETE     -H "Authorization: Bearer $OPENAI_API_KEY"\n\n```',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['provider: string;', 'file_id: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.files.delete(provider: string, file_id: string): object`\n\n**delete** `/{provider}/v1/files/{file_id}`\n\nDeletes a specified file. that can be used across - Assistants API, Batch API \nThis is the equivalent of DELETE https://api.openai.com/v1/files/{file_id}\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/delete\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123     -X DELETE     -H \"Authorization: Bearer $OPENAI_API_KEY\"\n\n```\n\n### Parameters\n\n- `provider: string`\n\n- `file_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst file = await client.files.delete('file_id', { provider: 'provider' });\n\nconsole.log(file);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/{provider}/v1/files/{file_id}/content',
    httpMethod: 'get',
    summary: 'Get File Content',
    description:
      'Returns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}/content\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve-contents\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123/content         -H "Authorization: Bearer sk-1234"\n\n```',
    stainlessPath: '(resource) files.content > (method) retrieve',
    qualified: 'client.files.content.retrieve',
    params: ['provider: string;', 'file_id: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.files.content.retrieve(provider: string, file_id: string): object`\n\n**get** `/{provider}/v1/files/{file_id}/content`\n\nReturns information about a specific file. that can be used across - Assistants API, Batch API \nThis is the equivalent of GET https://api.openai.com/v1/files/{file_id}/content\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/files/retrieve-contents\n\nExample Curl\n```\ncurl http://localhost:4000/v1/files/file-abc123/content         -H \"Authorization: Bearer sk-1234\"\n\n```\n\n### Parameters\n\n- `provider: string`\n\n- `file_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst content = await client.files.content.retrieve('file_id', { provider: 'provider' });\n\nconsole.log(content);\n```",
  },
  {
    name: 'create',
    endpoint: '/budget/new',
    httpMethod: 'post',
    summary: 'New Budget',
    description:
      'Create a new budget object. Can apply this to teams, orgs, end-users, keys.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}',
    stainlessPath: '(resource) budget > (method) create',
    qualified: 'client.budget.create',
    params: [
      'budget_duration?: string;',
      'budget_id?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'model_max_budget?: object;',
      'rpm_limit?: number;',
      'soft_budget?: number;',
      'tpm_limit?: number;',
    ],
    response: 'object',
    markdown:
      "## create\n\n`client.budget.create(budget_duration?: string, budget_id?: string, max_budget?: number, max_parallel_requests?: number, model_max_budget?: object, rpm_limit?: number, soft_budget?: number, tpm_limit?: number): object`\n\n**post** `/budget/new`\n\nCreate a new budget object. Can apply this to teams, orgs, end-users, keys.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period (\"30d\", \"1h\", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {\"openai/gpt-4o-mini\": {\"max_budget\": 100.0, \"budget_duration\": \"1d\", \"tpm_limit\": 100000, \"rpm_limit\": 100000}}\n\n### Parameters\n\n- `budget_duration?: string`\n  Max duration budget should be set for (e.g. '1hr', '1d', '28d')\n\n- `budget_id?: string`\n  The unique budget id.\n\n- `max_budget?: number`\n  Requests will fail if this budget (in USD) is exceeded.\n\n- `max_parallel_requests?: number`\n  Max concurrent requests allowed for this budget id.\n\n- `model_max_budget?: object`\n  Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})\n\n- `rpm_limit?: number`\n  Max requests per minute, allowed for this budget id.\n\n- `soft_budget?: number`\n  Requests will NOT fail if this is exceeded. Will fire alerting though.\n\n- `tpm_limit?: number`\n  Max tokens per minute, allowed for this budget id.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst budget = await client.budget.create();\n\nconsole.log(budget);\n```",
  },
  {
    name: 'update',
    endpoint: '/budget/update',
    httpMethod: 'post',
    summary: 'Update Budget',
    description:
      'Update an existing budget object.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}',
    stainlessPath: '(resource) budget > (method) update',
    qualified: 'client.budget.update',
    params: [
      'budget_duration?: string;',
      'budget_id?: string;',
      'max_budget?: number;',
      'max_parallel_requests?: number;',
      'model_max_budget?: object;',
      'rpm_limit?: number;',
      'soft_budget?: number;',
      'tpm_limit?: number;',
    ],
    response: 'object',
    markdown:
      "## update\n\n`client.budget.update(budget_duration?: string, budget_id?: string, max_budget?: number, max_parallel_requests?: number, model_max_budget?: object, rpm_limit?: number, soft_budget?: number, tpm_limit?: number): object`\n\n**post** `/budget/update`\n\nUpdate an existing budget object.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period (\"30d\", \"1h\", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {\"openai/gpt-4o-mini\": {\"max_budget\": 100.0, \"budget_duration\": \"1d\", \"tpm_limit\": 100000, \"rpm_limit\": 100000}}\n\n### Parameters\n\n- `budget_duration?: string`\n  Max duration budget should be set for (e.g. '1hr', '1d', '28d')\n\n- `budget_id?: string`\n  The unique budget id.\n\n- `max_budget?: number`\n  Requests will fail if this budget (in USD) is exceeded.\n\n- `max_parallel_requests?: number`\n  Max concurrent requests allowed for this budget id.\n\n- `model_max_budget?: object`\n  Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})\n\n- `rpm_limit?: number`\n  Max requests per minute, allowed for this budget id.\n\n- `soft_budget?: number`\n  Requests will NOT fail if this is exceeded. Will fire alerting though.\n\n- `tpm_limit?: number`\n  Max tokens per minute, allowed for this budget id.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst budget = await client.budget.update();\n\nconsole.log(budget);\n```",
  },
  {
    name: 'list',
    endpoint: '/budget/list',
    httpMethod: 'get',
    summary: 'List Budget',
    description: 'List all the created budgets in proxy db. Used on Admin UI.',
    stainlessPath: '(resource) budget > (method) list',
    qualified: 'client.budget.list',
    response: 'object',
    markdown:
      "## list\n\n`client.budget.list(): object`\n\n**get** `/budget/list`\n\nList all the created budgets in proxy db. Used on Admin UI.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst budgets = await client.budget.list();\n\nconsole.log(budgets);\n```",
  },
  {
    name: 'delete',
    endpoint: '/budget/delete',
    httpMethod: 'post',
    summary: 'Delete Budget',
    description: 'Delete budget\n\nParameters:\n- id: str - The budget id to delete',
    stainlessPath: '(resource) budget > (method) delete',
    qualified: 'client.budget.delete',
    params: ['id: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.budget.delete(id: string): object`\n\n**post** `/budget/delete`\n\nDelete budget\n\nParameters:\n- id: str - The budget id to delete\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst budget = await client.budget.delete({ id: 'id' });\n\nconsole.log(budget);\n```",
  },
  {
    name: 'info',
    endpoint: '/budget/info',
    httpMethod: 'post',
    summary: 'Info Budget',
    description:
      'Get the budget id specific information\n\nParameters:\n- budgets: List[str] - The list of budget ids to get information for',
    stainlessPath: '(resource) budget > (method) info',
    qualified: 'client.budget.info',
    params: ['budgets: string[];'],
    response: 'object',
    markdown:
      "## info\n\n`client.budget.info(budgets: string[]): object`\n\n**post** `/budget/info`\n\nGet the budget id specific information\n\nParameters:\n- budgets: List[str] - The list of budget ids to get information for\n\n### Parameters\n\n- `budgets: string[]`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.budget.info({ budgets: ['string'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'settings',
    endpoint: '/budget/settings',
    httpMethod: 'get',
    summary: 'Budget Settings',
    description:
      'Get list of configurable params + current value for a budget item + description of each field\n\nUsed on Admin UI.\n\nQuery Parameters:\n- budget_id: str - The budget id to get information for',
    stainlessPath: '(resource) budget > (method) settings',
    qualified: 'client.budget.settings',
    params: ['budget_id: string;'],
    response: 'object',
    markdown:
      "## settings\n\n`client.budget.settings(budget_id: string): object`\n\n**get** `/budget/settings`\n\nGet list of configurable params + current value for a budget item + description of each field\n\nUsed on Admin UI.\n\nQuery Parameters:\n- budget_id: str - The budget id to get information for\n\n### Parameters\n\n- `budget_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Hanzo from 'hanzoai';\n\nconst client = new Hanzo();\n\nconst response = await client.budget.settings({ budget_id: 'budget_id' });\n\nconsole.log(response);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
