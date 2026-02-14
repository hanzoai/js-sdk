// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.getHome',
    fullyQualifiedName: 'getHome',
    httpMethod: 'get',
    httpPath: '/',
  },
  {
    clientCallName: 'client.models.list',
    fullyQualifiedName: 'models.list',
    httpMethod: 'get',
    httpPath: '/v1/models',
  },
  {
    clientCallName: 'client.openai.create',
    fullyQualifiedName: 'openai.create',
    httpMethod: 'post',
    httpPath: '/openai/{endpoint}',
  },
  {
    clientCallName: 'client.openai.retrieve',
    fullyQualifiedName: 'openai.retrieve',
    httpMethod: 'get',
    httpPath: '/openai/{endpoint}',
  },
  {
    clientCallName: 'client.openai.update',
    fullyQualifiedName: 'openai.update',
    httpMethod: 'put',
    httpPath: '/openai/{endpoint}',
  },
  {
    clientCallName: 'client.openai.delete',
    fullyQualifiedName: 'openai.delete',
    httpMethod: 'delete',
    httpPath: '/openai/{endpoint}',
  },
  {
    clientCallName: 'client.openai.patch',
    fullyQualifiedName: 'openai.patch',
    httpMethod: 'patch',
    httpPath: '/openai/{endpoint}',
  },
  {
    clientCallName: 'client.openai.deployments.complete',
    fullyQualifiedName: 'openai.deployments.complete',
    httpMethod: 'post',
    httpPath: '/openai/deployments/{model}/completions',
  },
  {
    clientCallName: 'client.openai.deployments.embed',
    fullyQualifiedName: 'openai.deployments.embed',
    httpMethod: 'post',
    httpPath: '/openai/deployments/{model}/embeddings',
  },
  {
    clientCallName: 'client.openai.deployments.chat.complete',
    fullyQualifiedName: 'openai.deployments.chat.complete',
    httpMethod: 'post',
    httpPath: '/openai/deployments/{model}/chat/completions',
  },
  {
    clientCallName: 'client.engines.complete',
    fullyQualifiedName: 'engines.complete',
    httpMethod: 'post',
    httpPath: '/engines/{model}/completions',
  },
  {
    clientCallName: 'client.engines.embed',
    fullyQualifiedName: 'engines.embed',
    httpMethod: 'post',
    httpPath: '/engines/{model}/embeddings',
  },
  {
    clientCallName: 'client.engines.chat.complete',
    fullyQualifiedName: 'engines.chat.complete',
    httpMethod: 'post',
    httpPath: '/engines/{model}/chat/completions',
  },
  {
    clientCallName: 'client.chat.completions.create',
    fullyQualifiedName: 'chat.completions.create',
    httpMethod: 'post',
    httpPath: '/v1/chat/completions',
  },
  {
    clientCallName: 'client.completions.create',
    fullyQualifiedName: 'completions.create',
    httpMethod: 'post',
    httpPath: '/completions',
  },
  {
    clientCallName: 'client.embeddings.create',
    fullyQualifiedName: 'embeddings.create',
    httpMethod: 'post',
    httpPath: '/embeddings',
  },
  {
    clientCallName: 'client.images.generations.create',
    fullyQualifiedName: 'images.generations.create',
    httpMethod: 'post',
    httpPath: '/v1/images/generations',
  },
  {
    clientCallName: 'client.audio.speech.create',
    fullyQualifiedName: 'audio.speech.create',
    httpMethod: 'post',
    httpPath: '/v1/audio/speech',
  },
  {
    clientCallName: 'client.audio.transcriptions.create',
    fullyQualifiedName: 'audio.transcriptions.create',
    httpMethod: 'post',
    httpPath: '/v1/audio/transcriptions',
  },
  {
    clientCallName: 'client.assistants.create',
    fullyQualifiedName: 'assistants.create',
    httpMethod: 'post',
    httpPath: '/v1/assistants',
  },
  {
    clientCallName: 'client.assistants.list',
    fullyQualifiedName: 'assistants.list',
    httpMethod: 'get',
    httpPath: '/v1/assistants',
  },
  {
    clientCallName: 'client.assistants.delete',
    fullyQualifiedName: 'assistants.delete',
    httpMethod: 'delete',
    httpPath: '/v1/assistants/{assistant_id}',
  },
  {
    clientCallName: 'client.threads.create',
    fullyQualifiedName: 'threads.create',
    httpMethod: 'post',
    httpPath: '/v1/threads',
  },
  {
    clientCallName: 'client.threads.retrieve',
    fullyQualifiedName: 'threads.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/threads/{thread_id}',
  },
  {
    clientCallName: 'client.threads.messages.create',
    fullyQualifiedName: 'threads.messages.create',
    httpMethod: 'post',
    httpPath: '/v1/threads/{thread_id}/messages',
  },
  {
    clientCallName: 'client.threads.messages.list',
    fullyQualifiedName: 'threads.messages.list',
    httpMethod: 'get',
    httpPath: '/v1/threads/{thread_id}/messages',
  },
  {
    clientCallName: 'client.threads.runs.create',
    fullyQualifiedName: 'threads.runs.create',
    httpMethod: 'post',
    httpPath: '/v1/threads/{thread_id}/runs',
  },
  {
    clientCallName: 'client.moderations.create',
    fullyQualifiedName: 'moderations.create',
    httpMethod: 'post',
    httpPath: '/v1/moderations',
  },
  {
    clientCallName: 'client.utils.getSupportedOpenAIParams',
    fullyQualifiedName: 'utils.getSupportedOpenAIParams',
    httpMethod: 'get',
    httpPath: '/utils/supported_openai_params',
  },
  {
    clientCallName: 'client.utils.tokenCounter',
    fullyQualifiedName: 'utils.tokenCounter',
    httpMethod: 'post',
    httpPath: '/utils/token_counter',
  },
  {
    clientCallName: 'client.utils.transformRequest',
    fullyQualifiedName: 'utils.transformRequest',
    httpMethod: 'post',
    httpPath: '/utils/transform_request',
  },
  {
    clientCallName: 'client.model.create',
    fullyQualifiedName: 'model.create',
    httpMethod: 'post',
    httpPath: '/model/new',
  },
  {
    clientCallName: 'client.model.delete',
    fullyQualifiedName: 'model.delete',
    httpMethod: 'post',
    httpPath: '/model/delete',
  },
  {
    clientCallName: 'client.model.info.list',
    fullyQualifiedName: 'model.info.list',
    httpMethod: 'get',
    httpPath: '/model/info',
  },
  {
    clientCallName: 'client.model.update.full',
    fullyQualifiedName: 'model.update.full',
    httpMethod: 'post',
    httpPath: '/model/update',
  },
  {
    clientCallName: 'client.model.update.partial',
    fullyQualifiedName: 'model.update.partial',
    httpMethod: 'patch',
    httpPath: '/model/{model_id}/update',
  },
  {
    clientCallName: 'client.modelGroup.retrieveInfo',
    fullyQualifiedName: 'modelGroup.retrieveInfo',
    httpMethod: 'get',
    httpPath: '/model_group/info',
  },
  {
    clientCallName: 'client.routes.list',
    fullyQualifiedName: 'routes.list',
    httpMethod: 'get',
    httpPath: '/routes',
  },
  {
    clientCallName: 'client.responses.create',
    fullyQualifiedName: 'responses.create',
    httpMethod: 'post',
    httpPath: '/v1/responses',
  },
  {
    clientCallName: 'client.responses.retrieve',
    fullyQualifiedName: 'responses.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/responses/{response_id}',
  },
  {
    clientCallName: 'client.responses.delete',
    fullyQualifiedName: 'responses.delete',
    httpMethod: 'delete',
    httpPath: '/v1/responses/{response_id}',
  },
  {
    clientCallName: 'client.responses.inputItems.list',
    fullyQualifiedName: 'responses.inputItems.list',
    httpMethod: 'get',
    httpPath: '/v1/responses/{response_id}/input_items',
  },
  {
    clientCallName: 'client.batches.create',
    fullyQualifiedName: 'batches.create',
    httpMethod: 'post',
    httpPath: '/v1/batches',
  },
  {
    clientCallName: 'client.batches.retrieve',
    fullyQualifiedName: 'batches.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/batches/{batch_id}',
  },
  {
    clientCallName: 'client.batches.list',
    fullyQualifiedName: 'batches.list',
    httpMethod: 'get',
    httpPath: '/v1/batches',
  },
  {
    clientCallName: 'client.batches.cancelWithProvider',
    fullyQualifiedName: 'batches.cancelWithProvider',
    httpMethod: 'post',
    httpPath: '/{provider}/v1/batches/{batch_id}/cancel',
  },
  {
    clientCallName: 'client.batches.createWithProvider',
    fullyQualifiedName: 'batches.createWithProvider',
    httpMethod: 'post',
    httpPath: '/{provider}/v1/batches',
  },
  {
    clientCallName: 'client.batches.listWithProvider',
    fullyQualifiedName: 'batches.listWithProvider',
    httpMethod: 'get',
    httpPath: '/{provider}/v1/batches',
  },
  {
    clientCallName: 'client.batches.retrieveWithProvider',
    fullyQualifiedName: 'batches.retrieveWithProvider',
    httpMethod: 'get',
    httpPath: '/{provider}/v1/batches/{batch_id}',
  },
  {
    clientCallName: 'client.batches.cancel.cancel',
    fullyQualifiedName: 'batches.cancel.cancel',
    httpMethod: 'post',
    httpPath: '/batches/{batch_id}/cancel',
  },
  {
    clientCallName: 'client.rerank.create',
    fullyQualifiedName: 'rerank.create',
    httpMethod: 'post',
    httpPath: '/rerank',
  },
  {
    clientCallName: 'client.rerank.createV1',
    fullyQualifiedName: 'rerank.createV1',
    httpMethod: 'post',
    httpPath: '/v1/rerank',
  },
  {
    clientCallName: 'client.rerank.createV2',
    fullyQualifiedName: 'rerank.createV2',
    httpMethod: 'post',
    httpPath: '/v2/rerank',
  },
  {
    clientCallName: 'client.fineTuning.jobs.create',
    fullyQualifiedName: 'fineTuning.jobs.create',
    httpMethod: 'post',
    httpPath: '/v1/fine_tuning/jobs',
  },
  {
    clientCallName: 'client.fineTuning.jobs.retrieve',
    fullyQualifiedName: 'fineTuning.jobs.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/fine_tuning/jobs/{fine_tuning_job_id}',
  },
  {
    clientCallName: 'client.fineTuning.jobs.list',
    fullyQualifiedName: 'fineTuning.jobs.list',
    httpMethod: 'get',
    httpPath: '/v1/fine_tuning/jobs',
  },
  {
    clientCallName: 'client.fineTuning.jobs.cancel.create',
    fullyQualifiedName: 'fineTuning.jobs.cancel.create',
    httpMethod: 'post',
    httpPath: '/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel',
  },
  {
    clientCallName: 'client.credentials.create',
    fullyQualifiedName: 'credentials.create',
    httpMethod: 'post',
    httpPath: '/credentials',
  },
  {
    clientCallName: 'client.credentials.list',
    fullyQualifiedName: 'credentials.list',
    httpMethod: 'get',
    httpPath: '/credentials',
  },
  {
    clientCallName: 'client.credentials.delete',
    fullyQualifiedName: 'credentials.delete',
    httpMethod: 'delete',
    httpPath: '/credentials/{credential_name}',
  },
  {
    clientCallName: 'client.vertexAI.create',
    fullyQualifiedName: 'vertexAI.create',
    httpMethod: 'post',
    httpPath: '/vertex_ai/{endpoint}',
  },
  {
    clientCallName: 'client.vertexAI.retrieve',
    fullyQualifiedName: 'vertexAI.retrieve',
    httpMethod: 'get',
    httpPath: '/vertex_ai/{endpoint}',
  },
  {
    clientCallName: 'client.vertexAI.update',
    fullyQualifiedName: 'vertexAI.update',
    httpMethod: 'put',
    httpPath: '/vertex_ai/{endpoint}',
  },
  {
    clientCallName: 'client.vertexAI.delete',
    fullyQualifiedName: 'vertexAI.delete',
    httpMethod: 'delete',
    httpPath: '/vertex_ai/{endpoint}',
  },
  {
    clientCallName: 'client.vertexAI.patch',
    fullyQualifiedName: 'vertexAI.patch',
    httpMethod: 'patch',
    httpPath: '/vertex_ai/{endpoint}',
  },
  {
    clientCallName: 'client.gemini.create',
    fullyQualifiedName: 'gemini.create',
    httpMethod: 'post',
    httpPath: '/gemini/{endpoint}',
  },
  {
    clientCallName: 'client.gemini.retrieve',
    fullyQualifiedName: 'gemini.retrieve',
    httpMethod: 'get',
    httpPath: '/gemini/{endpoint}',
  },
  {
    clientCallName: 'client.gemini.update',
    fullyQualifiedName: 'gemini.update',
    httpMethod: 'put',
    httpPath: '/gemini/{endpoint}',
  },
  {
    clientCallName: 'client.gemini.delete',
    fullyQualifiedName: 'gemini.delete',
    httpMethod: 'delete',
    httpPath: '/gemini/{endpoint}',
  },
  {
    clientCallName: 'client.gemini.patch',
    fullyQualifiedName: 'gemini.patch',
    httpMethod: 'patch',
    httpPath: '/gemini/{endpoint}',
  },
  {
    clientCallName: 'client.cohere.create',
    fullyQualifiedName: 'cohere.create',
    httpMethod: 'post',
    httpPath: '/cohere/{endpoint}',
  },
  {
    clientCallName: 'client.cohere.retrieve',
    fullyQualifiedName: 'cohere.retrieve',
    httpMethod: 'get',
    httpPath: '/cohere/{endpoint}',
  },
  {
    clientCallName: 'client.cohere.update',
    fullyQualifiedName: 'cohere.update',
    httpMethod: 'put',
    httpPath: '/cohere/{endpoint}',
  },
  {
    clientCallName: 'client.cohere.delete',
    fullyQualifiedName: 'cohere.delete',
    httpMethod: 'delete',
    httpPath: '/cohere/{endpoint}',
  },
  {
    clientCallName: 'client.cohere.modify',
    fullyQualifiedName: 'cohere.modify',
    httpMethod: 'patch',
    httpPath: '/cohere/{endpoint}',
  },
  {
    clientCallName: 'client.anthropic.create',
    fullyQualifiedName: 'anthropic.create',
    httpMethod: 'post',
    httpPath: '/anthropic/{endpoint}',
  },
  {
    clientCallName: 'client.anthropic.retrieve',
    fullyQualifiedName: 'anthropic.retrieve',
    httpMethod: 'get',
    httpPath: '/anthropic/{endpoint}',
  },
  {
    clientCallName: 'client.anthropic.update',
    fullyQualifiedName: 'anthropic.update',
    httpMethod: 'put',
    httpPath: '/anthropic/{endpoint}',
  },
  {
    clientCallName: 'client.anthropic.delete',
    fullyQualifiedName: 'anthropic.delete',
    httpMethod: 'delete',
    httpPath: '/anthropic/{endpoint}',
  },
  {
    clientCallName: 'client.anthropic.modify',
    fullyQualifiedName: 'anthropic.modify',
    httpMethod: 'patch',
    httpPath: '/anthropic/{endpoint}',
  },
  {
    clientCallName: 'client.bedrock.create',
    fullyQualifiedName: 'bedrock.create',
    httpMethod: 'post',
    httpPath: '/bedrock/{endpoint}',
  },
  {
    clientCallName: 'client.bedrock.retrieve',
    fullyQualifiedName: 'bedrock.retrieve',
    httpMethod: 'get',
    httpPath: '/bedrock/{endpoint}',
  },
  {
    clientCallName: 'client.bedrock.update',
    fullyQualifiedName: 'bedrock.update',
    httpMethod: 'put',
    httpPath: '/bedrock/{endpoint}',
  },
  {
    clientCallName: 'client.bedrock.delete',
    fullyQualifiedName: 'bedrock.delete',
    httpMethod: 'delete',
    httpPath: '/bedrock/{endpoint}',
  },
  {
    clientCallName: 'client.bedrock.patch',
    fullyQualifiedName: 'bedrock.patch',
    httpMethod: 'patch',
    httpPath: '/bedrock/{endpoint}',
  },
  {
    clientCallName: 'client.euAssemblyai.create',
    fullyQualifiedName: 'euAssemblyai.create',
    httpMethod: 'post',
    httpPath: '/eu.assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.euAssemblyai.retrieve',
    fullyQualifiedName: 'euAssemblyai.retrieve',
    httpMethod: 'get',
    httpPath: '/eu.assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.euAssemblyai.update',
    fullyQualifiedName: 'euAssemblyai.update',
    httpMethod: 'put',
    httpPath: '/eu.assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.euAssemblyai.delete',
    fullyQualifiedName: 'euAssemblyai.delete',
    httpMethod: 'delete',
    httpPath: '/eu.assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.euAssemblyai.patch',
    fullyQualifiedName: 'euAssemblyai.patch',
    httpMethod: 'patch',
    httpPath: '/eu.assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.assemblyai.create',
    fullyQualifiedName: 'assemblyai.create',
    httpMethod: 'post',
    httpPath: '/assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.assemblyai.retrieve',
    fullyQualifiedName: 'assemblyai.retrieve',
    httpMethod: 'get',
    httpPath: '/assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.assemblyai.update',
    fullyQualifiedName: 'assemblyai.update',
    httpMethod: 'put',
    httpPath: '/assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.assemblyai.delete',
    fullyQualifiedName: 'assemblyai.delete',
    httpMethod: 'delete',
    httpPath: '/assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.assemblyai.patch',
    fullyQualifiedName: 'assemblyai.patch',
    httpMethod: 'patch',
    httpPath: '/assemblyai/{endpoint}',
  },
  {
    clientCallName: 'client.azure.create',
    fullyQualifiedName: 'azure.create',
    httpMethod: 'post',
    httpPath: '/azure/{endpoint}',
  },
  {
    clientCallName: 'client.azure.update',
    fullyQualifiedName: 'azure.update',
    httpMethod: 'put',
    httpPath: '/azure/{endpoint}',
  },
  {
    clientCallName: 'client.azure.delete',
    fullyQualifiedName: 'azure.delete',
    httpMethod: 'delete',
    httpPath: '/azure/{endpoint}',
  },
  {
    clientCallName: 'client.azure.call',
    fullyQualifiedName: 'azure.call',
    httpMethod: 'get',
    httpPath: '/azure/{endpoint}',
  },
  {
    clientCallName: 'client.azure.patch',
    fullyQualifiedName: 'azure.patch',
    httpMethod: 'patch',
    httpPath: '/azure/{endpoint}',
  },
  {
    clientCallName: 'client.langfuse.create',
    fullyQualifiedName: 'langfuse.create',
    httpMethod: 'post',
    httpPath: '/langfuse/{endpoint}',
  },
  {
    clientCallName: 'client.langfuse.retrieve',
    fullyQualifiedName: 'langfuse.retrieve',
    httpMethod: 'get',
    httpPath: '/langfuse/{endpoint}',
  },
  {
    clientCallName: 'client.langfuse.update',
    fullyQualifiedName: 'langfuse.update',
    httpMethod: 'put',
    httpPath: '/langfuse/{endpoint}',
  },
  {
    clientCallName: 'client.langfuse.delete',
    fullyQualifiedName: 'langfuse.delete',
    httpMethod: 'delete',
    httpPath: '/langfuse/{endpoint}',
  },
  {
    clientCallName: 'client.langfuse.patch',
    fullyQualifiedName: 'langfuse.patch',
    httpMethod: 'patch',
    httpPath: '/langfuse/{endpoint}',
  },
  {
    clientCallName: 'client.config.passThroughEndpoint.create',
    fullyQualifiedName: 'config.passThroughEndpoint.create',
    httpMethod: 'post',
    httpPath: '/config/pass_through_endpoint',
  },
  {
    clientCallName: 'client.config.passThroughEndpoint.update',
    fullyQualifiedName: 'config.passThroughEndpoint.update',
    httpMethod: 'post',
    httpPath: '/config/pass_through_endpoint/{endpoint_id}',
  },
  {
    clientCallName: 'client.config.passThroughEndpoint.list',
    fullyQualifiedName: 'config.passThroughEndpoint.list',
    httpMethod: 'get',
    httpPath: '/config/pass_through_endpoint',
  },
  {
    clientCallName: 'client.config.passThroughEndpoint.delete',
    fullyQualifiedName: 'config.passThroughEndpoint.delete',
    httpMethod: 'delete',
    httpPath: '/config/pass_through_endpoint',
  },
  {
    clientCallName: 'client.test.ping',
    fullyQualifiedName: 'test.ping',
    httpMethod: 'get',
    httpPath: '/test',
  },
  {
    clientCallName: 'client.health.checkAll',
    fullyQualifiedName: 'health.checkAll',
    httpMethod: 'get',
    httpPath: '/health',
  },
  {
    clientCallName: 'client.health.checkLiveliness',
    fullyQualifiedName: 'health.checkLiveliness',
    httpMethod: 'get',
    httpPath: '/health/liveliness',
  },
  {
    clientCallName: 'client.health.checkLiveness',
    fullyQualifiedName: 'health.checkLiveness',
    httpMethod: 'get',
    httpPath: '/health/liveness',
  },
  {
    clientCallName: 'client.health.checkReadiness',
    fullyQualifiedName: 'health.checkReadiness',
    httpMethod: 'get',
    httpPath: '/health/readiness',
  },
  {
    clientCallName: 'client.health.checkServices',
    fullyQualifiedName: 'health.checkServices',
    httpMethod: 'get',
    httpPath: '/health/services',
  },
  {
    clientCallName: 'client.active.listCallbacks',
    fullyQualifiedName: 'active.listCallbacks',
    httpMethod: 'get',
    httpPath: '/active/callbacks',
  },
  {
    clientCallName: 'client.settings.retrieve',
    fullyQualifiedName: 'settings.retrieve',
    httpMethod: 'get',
    httpPath: '/settings',
  },
  {
    clientCallName: 'client.key.update',
    fullyQualifiedName: 'key.update',
    httpMethod: 'post',
    httpPath: '/key/update',
  },
  {
    clientCallName: 'client.key.list',
    fullyQualifiedName: 'key.list',
    httpMethod: 'get',
    httpPath: '/key/list',
  },
  {
    clientCallName: 'client.key.delete',
    fullyQualifiedName: 'key.delete',
    httpMethod: 'post',
    httpPath: '/key/delete',
  },
  {
    clientCallName: 'client.key.block',
    fullyQualifiedName: 'key.block',
    httpMethod: 'post',
    httpPath: '/key/block',
  },
  {
    clientCallName: 'client.key.checkHealth',
    fullyQualifiedName: 'key.checkHealth',
    httpMethod: 'post',
    httpPath: '/key/health',
  },
  {
    clientCallName: 'client.key.generate',
    fullyQualifiedName: 'key.generate',
    httpMethod: 'post',
    httpPath: '/key/generate',
  },
  {
    clientCallName: 'client.key.regenerateByKey',
    fullyQualifiedName: 'key.regenerateByKey',
    httpMethod: 'post',
    httpPath: '/key/{key}/regenerate',
  },
  {
    clientCallName: 'client.key.retrieveInfo',
    fullyQualifiedName: 'key.retrieveInfo',
    httpMethod: 'get',
    httpPath: '/key/info',
  },
  {
    clientCallName: 'client.key.unblock',
    fullyQualifiedName: 'key.unblock',
    httpMethod: 'post',
    httpPath: '/key/unblock',
  },
  {
    clientCallName: 'client.user.create',
    fullyQualifiedName: 'user.create',
    httpMethod: 'post',
    httpPath: '/user/new',
  },
  {
    clientCallName: 'client.user.update',
    fullyQualifiedName: 'user.update',
    httpMethod: 'post',
    httpPath: '/user/update',
  },
  {
    clientCallName: 'client.user.list',
    fullyQualifiedName: 'user.list',
    httpMethod: 'get',
    httpPath: '/user/get_users',
  },
  {
    clientCallName: 'client.user.delete',
    fullyQualifiedName: 'user.delete',
    httpMethod: 'post',
    httpPath: '/user/delete',
  },
  {
    clientCallName: 'client.user.retrieveInfo',
    fullyQualifiedName: 'user.retrieveInfo',
    httpMethod: 'get',
    httpPath: '/user/info',
  },
  {
    clientCallName: 'client.team.create',
    fullyQualifiedName: 'team.create',
    httpMethod: 'post',
    httpPath: '/team/new',
  },
  {
    clientCallName: 'client.team.update',
    fullyQualifiedName: 'team.update',
    httpMethod: 'post',
    httpPath: '/team/update',
  },
  {
    clientCallName: 'client.team.list',
    fullyQualifiedName: 'team.list',
    httpMethod: 'get',
    httpPath: '/team/list',
  },
  {
    clientCallName: 'client.team.delete',
    fullyQualifiedName: 'team.delete',
    httpMethod: 'post',
    httpPath: '/team/delete',
  },
  {
    clientCallName: 'client.team.addMember',
    fullyQualifiedName: 'team.addMember',
    httpMethod: 'post',
    httpPath: '/team/member_add',
  },
  {
    clientCallName: 'client.team.block',
    fullyQualifiedName: 'team.block',
    httpMethod: 'post',
    httpPath: '/team/block',
  },
  {
    clientCallName: 'client.team.disableLogging',
    fullyQualifiedName: 'team.disableLogging',
    httpMethod: 'post',
    httpPath: '/team/{team_id}/disable_logging',
  },
  {
    clientCallName: 'client.team.listAvailable',
    fullyQualifiedName: 'team.listAvailable',
    httpMethod: 'get',
    httpPath: '/team/available',
  },
  {
    clientCallName: 'client.team.removeMember',
    fullyQualifiedName: 'team.removeMember',
    httpMethod: 'post',
    httpPath: '/team/member_delete',
  },
  {
    clientCallName: 'client.team.retrieveInfo',
    fullyQualifiedName: 'team.retrieveInfo',
    httpMethod: 'get',
    httpPath: '/team/info',
  },
  {
    clientCallName: 'client.team.unblock',
    fullyQualifiedName: 'team.unblock',
    httpMethod: 'post',
    httpPath: '/team/unblock',
  },
  {
    clientCallName: 'client.team.updateMember',
    fullyQualifiedName: 'team.updateMember',
    httpMethod: 'post',
    httpPath: '/team/member_update',
  },
  {
    clientCallName: 'client.team.model.add',
    fullyQualifiedName: 'team.model.add',
    httpMethod: 'post',
    httpPath: '/team/model/add',
  },
  {
    clientCallName: 'client.team.model.remove',
    fullyQualifiedName: 'team.model.remove',
    httpMethod: 'post',
    httpPath: '/team/model/delete',
  },
  {
    clientCallName: 'client.team.callback.retrieve',
    fullyQualifiedName: 'team.callback.retrieve',
    httpMethod: 'get',
    httpPath: '/team/{team_id}/callback',
  },
  {
    clientCallName: 'client.team.callback.add',
    fullyQualifiedName: 'team.callback.add',
    httpMethod: 'post',
    httpPath: '/team/{team_id}/callback',
  },
  {
    clientCallName: 'client.organization.create',
    fullyQualifiedName: 'organization.create',
    httpMethod: 'post',
    httpPath: '/organization/new',
  },
  {
    clientCallName: 'client.organization.update',
    fullyQualifiedName: 'organization.update',
    httpMethod: 'patch',
    httpPath: '/organization/update',
  },
  {
    clientCallName: 'client.organization.list',
    fullyQualifiedName: 'organization.list',
    httpMethod: 'get',
    httpPath: '/organization/list',
  },
  {
    clientCallName: 'client.organization.delete',
    fullyQualifiedName: 'organization.delete',
    httpMethod: 'delete',
    httpPath: '/organization/delete',
  },
  {
    clientCallName: 'client.organization.addMember',
    fullyQualifiedName: 'organization.addMember',
    httpMethod: 'post',
    httpPath: '/organization/member_add',
  },
  {
    clientCallName: 'client.organization.deleteMember',
    fullyQualifiedName: 'organization.deleteMember',
    httpMethod: 'delete',
    httpPath: '/organization/member_delete',
  },
  {
    clientCallName: 'client.organization.updateMember',
    fullyQualifiedName: 'organization.updateMember',
    httpMethod: 'patch',
    httpPath: '/organization/member_update',
  },
  {
    clientCallName: 'client.organization.info.retrieve',
    fullyQualifiedName: 'organization.info.retrieve',
    httpMethod: 'get',
    httpPath: '/organization/info',
  },
  {
    clientCallName: 'client.organization.info.deprecated',
    fullyQualifiedName: 'organization.info.deprecated',
    httpMethod: 'post',
    httpPath: '/organization/info',
  },
  {
    clientCallName: 'client.customer.create',
    fullyQualifiedName: 'customer.create',
    httpMethod: 'post',
    httpPath: '/customer/new',
  },
  {
    clientCallName: 'client.customer.update',
    fullyQualifiedName: 'customer.update',
    httpMethod: 'post',
    httpPath: '/customer/update',
  },
  {
    clientCallName: 'client.customer.list',
    fullyQualifiedName: 'customer.list',
    httpMethod: 'get',
    httpPath: '/customer/list',
  },
  {
    clientCallName: 'client.customer.delete',
    fullyQualifiedName: 'customer.delete',
    httpMethod: 'post',
    httpPath: '/customer/delete',
  },
  {
    clientCallName: 'client.customer.block',
    fullyQualifiedName: 'customer.block',
    httpMethod: 'post',
    httpPath: '/customer/block',
  },
  {
    clientCallName: 'client.customer.retrieveInfo',
    fullyQualifiedName: 'customer.retrieveInfo',
    httpMethod: 'get',
    httpPath: '/customer/info',
  },
  {
    clientCallName: 'client.customer.unblock',
    fullyQualifiedName: 'customer.unblock',
    httpMethod: 'post',
    httpPath: '/customer/unblock',
  },
  {
    clientCallName: 'client.spend.calculateSpend',
    fullyQualifiedName: 'spend.calculateSpend',
    httpMethod: 'post',
    httpPath: '/spend/calculate',
  },
  {
    clientCallName: 'client.spend.listLogs',
    fullyQualifiedName: 'spend.listLogs',
    httpMethod: 'get',
    httpPath: '/spend/logs',
  },
  {
    clientCallName: 'client.spend.listTags',
    fullyQualifiedName: 'spend.listTags',
    httpMethod: 'get',
    httpPath: '/spend/tags',
  },
  {
    clientCallName: 'client.global.spend.listTags',
    fullyQualifiedName: 'global.spend.listTags',
    httpMethod: 'get',
    httpPath: '/global/spend/tags',
  },
  {
    clientCallName: 'client.global.spend.reset',
    fullyQualifiedName: 'global.spend.reset',
    httpMethod: 'post',
    httpPath: '/global/spend/reset',
  },
  {
    clientCallName: 'client.global.spend.retrieveReport',
    fullyQualifiedName: 'global.spend.retrieveReport',
    httpMethod: 'get',
    httpPath: '/global/spend/report',
  },
  {
    clientCallName: 'client.provider.listBudgets',
    fullyQualifiedName: 'provider.listBudgets',
    httpMethod: 'get',
    httpPath: '/provider/budgets',
  },
  {
    clientCallName: 'client.cache.delete',
    fullyQualifiedName: 'cache.delete',
    httpMethod: 'post',
    httpPath: '/cache/delete',
  },
  {
    clientCallName: 'client.cache.flushAll',
    fullyQualifiedName: 'cache.flushAll',
    httpMethod: 'post',
    httpPath: '/cache/flushall',
  },
  {
    clientCallName: 'client.cache.ping',
    fullyQualifiedName: 'cache.ping',
    httpMethod: 'get',
    httpPath: '/cache/ping',
  },
  {
    clientCallName: 'client.cache.redis.retrieveInfo',
    fullyQualifiedName: 'cache.redis.retrieveInfo',
    httpMethod: 'get',
    httpPath: '/cache/redis/info',
  },
  {
    clientCallName: 'client.guardrails.list',
    fullyQualifiedName: 'guardrails.list',
    httpMethod: 'get',
    httpPath: '/guardrails/list',
  },
  {
    clientCallName: 'client.add.addAllowedIP',
    fullyQualifiedName: 'add.addAllowedIP',
    httpMethod: 'post',
    httpPath: '/add/allowed_ip',
  },
  {
    clientCallName: 'client.delete.createAllowedIP',
    fullyQualifiedName: 'delete.createAllowedIP',
    httpMethod: 'post',
    httpPath: '/delete/allowed_ip',
  },
  {
    clientCallName: 'client.files.create',
    fullyQualifiedName: 'files.create',
    httpMethod: 'post',
    httpPath: '/{provider}/v1/files',
  },
  {
    clientCallName: 'client.files.retrieve',
    fullyQualifiedName: 'files.retrieve',
    httpMethod: 'get',
    httpPath: '/{provider}/v1/files/{file_id}',
  },
  {
    clientCallName: 'client.files.list',
    fullyQualifiedName: 'files.list',
    httpMethod: 'get',
    httpPath: '/{provider}/v1/files',
  },
  {
    clientCallName: 'client.files.delete',
    fullyQualifiedName: 'files.delete',
    httpMethod: 'delete',
    httpPath: '/{provider}/v1/files/{file_id}',
  },
  {
    clientCallName: 'client.files.content.retrieve',
    fullyQualifiedName: 'files.content.retrieve',
    httpMethod: 'get',
    httpPath: '/{provider}/v1/files/{file_id}/content',
  },
  {
    clientCallName: 'client.budget.create',
    fullyQualifiedName: 'budget.create',
    httpMethod: 'post',
    httpPath: '/budget/new',
  },
  {
    clientCallName: 'client.budget.update',
    fullyQualifiedName: 'budget.update',
    httpMethod: 'post',
    httpPath: '/budget/update',
  },
  {
    clientCallName: 'client.budget.list',
    fullyQualifiedName: 'budget.list',
    httpMethod: 'get',
    httpPath: '/budget/list',
  },
  {
    clientCallName: 'client.budget.delete',
    fullyQualifiedName: 'budget.delete',
    httpMethod: 'post',
    httpPath: '/budget/delete',
  },
  {
    clientCallName: 'client.budget.info',
    fullyQualifiedName: 'budget.info',
    httpMethod: 'post',
    httpPath: '/budget/info',
  },
  {
    clientCallName: 'client.budget.settings',
    fullyQualifiedName: 'budget.settings',
    httpMethod: 'get',
    httpPath: '/budget/settings',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
