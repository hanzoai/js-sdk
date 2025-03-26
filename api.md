# Hanzo

Types:

- <code><a href="./src/resources/top-level.ts">GetHomeResponse</a></code>

Methods:

- <code title="get /">client.<a href="./src/index.ts">getHome</a>() -> unknown</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelListResponse</a></code>

Methods:

- <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> unknown</code>

# OpenAI

Types:

- <code><a href="./src/resources/openai/openai.ts">OpenAICreateResponse</a></code>
- <code><a href="./src/resources/openai/openai.ts">OpenAIRetrieveResponse</a></code>
- <code><a href="./src/resources/openai/openai.ts">OpenAIUpdateResponse</a></code>
- <code><a href="./src/resources/openai/openai.ts">OpenAIDeleteResponse</a></code>
- <code><a href="./src/resources/openai/openai.ts">OpenAIPatchResponse</a></code>

Methods:

- <code title="post /openai/{endpoint}">client.openai.<a href="./src/resources/openai/openai.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /openai/{endpoint}">client.openai.<a href="./src/resources/openai/openai.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /openai/{endpoint}">client.openai.<a href="./src/resources/openai/openai.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /openai/{endpoint}">client.openai.<a href="./src/resources/openai/openai.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /openai/{endpoint}">client.openai.<a href="./src/resources/openai/openai.ts">patch</a>(endpoint) -> unknown</code>

## Deployments

Types:

- <code><a href="./src/resources/openai/deployments/deployments.ts">DeploymentCompleteResponse</a></code>
- <code><a href="./src/resources/openai/deployments/deployments.ts">DeploymentEmbedResponse</a></code>

Methods:

- <code title="post /openai/deployments/{model}/completions">client.openai.deployments.<a href="./src/resources/openai/deployments/deployments.ts">complete</a>(model) -> unknown</code>
- <code title="post /openai/deployments/{model}/embeddings">client.openai.deployments.<a href="./src/resources/openai/deployments/deployments.ts">embed</a>(model) -> unknown</code>

### Chat

Types:

- <code><a href="./src/resources/openai/deployments/chat.ts">ChatCompleteResponse</a></code>

Methods:

- <code title="post /openai/deployments/{model}/chat/completions">client.openai.deployments.chat.<a href="./src/resources/openai/deployments/chat.ts">complete</a>(model) -> unknown</code>

# Engines

Types:

- <code><a href="./src/resources/engines/engines.ts">EngineCompleteResponse</a></code>
- <code><a href="./src/resources/engines/engines.ts">EngineEmbedResponse</a></code>

Methods:

- <code title="post /engines/{model}/completions">client.engines.<a href="./src/resources/engines/engines.ts">complete</a>(model) -> unknown</code>
- <code title="post /engines/{model}/embeddings">client.engines.<a href="./src/resources/engines/engines.ts">embed</a>(model) -> unknown</code>

## Chat

Types:

- <code><a href="./src/resources/engines/chat.ts">ChatCompleteResponse</a></code>

Methods:

- <code title="post /engines/{model}/chat/completions">client.engines.chat.<a href="./src/resources/engines/chat.ts">complete</a>(model) -> unknown</code>

# Chat

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> unknown</code>

# Completions

Types:

- <code><a href="./src/resources/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /completions">client.completions.<a href="./src/resources/completions.ts">create</a>({ ...params }) -> unknown</code>

# Embeddings

Types:

- <code><a href="./src/resources/embeddings.ts">EmbeddingCreateResponse</a></code>

Methods:

- <code title="post /embeddings">client.embeddings.<a href="./src/resources/embeddings.ts">create</a>({ ...params }) -> unknown</code>

# Images

## Generations

Types:

- <code><a href="./src/resources/images/generations.ts">GenerationCreateResponse</a></code>

Methods:

- <code title="post /v1/images/generations">client.images.generations.<a href="./src/resources/images/generations.ts">create</a>() -> unknown</code>

# Audio

## Speech

Types:

- <code><a href="./src/resources/audio/speech.ts">SpeechCreateResponse</a></code>

Methods:

- <code title="post /v1/audio/speech">client.audio.speech.<a href="./src/resources/audio/speech.ts">create</a>() -> unknown</code>

## Transcriptions

Types:

- <code><a href="./src/resources/audio/transcriptions.ts">TranscriptionCreateResponse</a></code>

Methods:

- <code title="post /v1/audio/transcriptions">client.audio.transcriptions.<a href="./src/resources/audio/transcriptions.ts">create</a>({ ...params }) -> unknown</code>

# Assistants

Types:

- <code><a href="./src/resources/assistants.ts">AssistantCreateResponse</a></code>
- <code><a href="./src/resources/assistants.ts">AssistantListResponse</a></code>
- <code><a href="./src/resources/assistants.ts">AssistantDeleteResponse</a></code>

Methods:

- <code title="post /v1/assistants">client.assistants.<a href="./src/resources/assistants.ts">create</a>() -> unknown</code>
- <code title="get /v1/assistants">client.assistants.<a href="./src/resources/assistants.ts">list</a>() -> unknown</code>
- <code title="delete /v1/assistants/{assistant_id}">client.assistants.<a href="./src/resources/assistants.ts">delete</a>(assistantID) -> unknown</code>

# Threads

Types:

- <code><a href="./src/resources/threads/threads.ts">ThreadCreateResponse</a></code>
- <code><a href="./src/resources/threads/threads.ts">ThreadRetrieveResponse</a></code>

Methods:

- <code title="post /v1/threads">client.threads.<a href="./src/resources/threads/threads.ts">create</a>() -> unknown</code>
- <code title="get /v1/threads/{thread_id}">client.threads.<a href="./src/resources/threads/threads.ts">retrieve</a>(threadID) -> unknown</code>

## Messages

Types:

- <code><a href="./src/resources/threads/messages.ts">MessageCreateResponse</a></code>
- <code><a href="./src/resources/threads/messages.ts">MessageListResponse</a></code>

Methods:

- <code title="post /v1/threads/{thread_id}/messages">client.threads.messages.<a href="./src/resources/threads/messages.ts">create</a>(threadID) -> unknown</code>
- <code title="get /v1/threads/{thread_id}/messages">client.threads.messages.<a href="./src/resources/threads/messages.ts">list</a>(threadID) -> unknown</code>

## Runs

Types:

- <code><a href="./src/resources/threads/runs.ts">RunCreateResponse</a></code>

Methods:

- <code title="post /v1/threads/{thread_id}/runs">client.threads.runs.<a href="./src/resources/threads/runs.ts">create</a>(threadID) -> unknown</code>

# Moderations

Types:

- <code><a href="./src/resources/moderations.ts">ModerationCreateResponse</a></code>

Methods:

- <code title="post /v1/moderations">client.moderations.<a href="./src/resources/moderations.ts">create</a>() -> unknown</code>

# Utils

Types:

- <code><a href="./src/resources/utils.ts">UtilGetSupportedOpenAIParamsResponse</a></code>
- <code><a href="./src/resources/utils.ts">UtilTokenCounterResponse</a></code>
- <code><a href="./src/resources/utils.ts">UtilTransformRequestResponse</a></code>

Methods:

- <code title="get /utils/supported_openai_params">client.utils.<a href="./src/resources/utils.ts">getSupportedOpenAIParams</a>({ ...params }) -> unknown</code>
- <code title="post /utils/token_counter">client.utils.<a href="./src/resources/utils.ts">tokenCounter</a>({ ...params }) -> UtilTokenCounterResponse</code>
- <code title="post /utils/transform_request">client.utils.<a href="./src/resources/utils.ts">transformRequest</a>({ ...params }) -> UtilTransformRequestResponse</code>

# Model

Types:

- <code><a href="./src/resources/model/model.ts">ConfigurableClientsideParamsCustomAuth</a></code>
- <code><a href="./src/resources/model/model.ts">ModelInfo</a></code>
- <code><a href="./src/resources/model/model.ts">ModelCreateResponse</a></code>
- <code><a href="./src/resources/model/model.ts">ModelDeleteResponse</a></code>

Methods:

- <code title="post /model/new">client.model.<a href="./src/resources/model/model.ts">create</a>({ ...params }) -> unknown</code>
- <code title="post /model/delete">client.model.<a href="./src/resources/model/model.ts">delete</a>({ ...params }) -> unknown</code>

## Info

Types:

- <code><a href="./src/resources/model/info.ts">InfoListResponse</a></code>

Methods:

- <code title="get /model/info">client.model.info.<a href="./src/resources/model/info.ts">list</a>({ ...params }) -> unknown</code>

## Update

Types:

- <code><a href="./src/resources/model/update.ts">UpdateDeployment</a></code>
- <code><a href="./src/resources/model/update.ts">UpdateFullResponse</a></code>
- <code><a href="./src/resources/model/update.ts">UpdatePartialResponse</a></code>

Methods:

- <code title="post /model/update">client.model.update.<a href="./src/resources/model/update.ts">full</a>({ ...params }) -> unknown</code>
- <code title="patch /model/{model_id}/update">client.model.update.<a href="./src/resources/model/update.ts">partial</a>(modelID, { ...params }) -> unknown</code>

# ModelGroup

Types:

- <code><a href="./src/resources/model-group.ts">ModelGroupRetrieveInfoResponse</a></code>

Methods:

- <code title="get /model_group/info">client.modelGroup.<a href="./src/resources/model-group.ts">retrieveInfo</a>({ ...params }) -> unknown</code>

# Routes

Types:

- <code><a href="./src/resources/routes.ts">RouteListResponse</a></code>

Methods:

- <code title="get /routes">client.routes.<a href="./src/resources/routes.ts">list</a>() -> unknown</code>

# Responses

Types:

- <code><a href="./src/resources/responses/responses.ts">ResponseCreateResponse</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseRetrieveResponse</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseDeleteResponse</a></code>

Methods:

- <code title="post /v1/responses">client.responses.<a href="./src/resources/responses/responses.ts">create</a>() -> unknown</code>
- <code title="get /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">retrieve</a>(responseID) -> unknown</code>
- <code title="delete /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">delete</a>(responseID) -> unknown</code>

## InputItems

Types:

- <code><a href="./src/resources/responses/input-items.ts">InputItemListResponse</a></code>

Methods:

- <code title="get /v1/responses/{response_id}/input_items">client.responses.inputItems.<a href="./src/resources/responses/input-items.ts">list</a>(responseID) -> unknown</code>

# Batches

Types:

- <code><a href="./src/resources/batches/batches.ts">BatchCreateResponse</a></code>
- <code><a href="./src/resources/batches/batches.ts">BatchRetrieveResponse</a></code>
- <code><a href="./src/resources/batches/batches.ts">BatchListResponse</a></code>
- <code><a href="./src/resources/batches/batches.ts">BatchCancelWithProviderResponse</a></code>
- <code><a href="./src/resources/batches/batches.ts">BatchCreateWithProviderResponse</a></code>
- <code><a href="./src/resources/batches/batches.ts">BatchListWithProviderResponse</a></code>
- <code><a href="./src/resources/batches/batches.ts">BatchRetrieveWithProviderResponse</a></code>

Methods:

- <code title="post /v1/batches">client.batches.<a href="./src/resources/batches/batches.ts">create</a>({ ...params }) -> unknown</code>
- <code title="get /v1/batches/{batch_id}">client.batches.<a href="./src/resources/batches/batches.ts">retrieve</a>(batchID, { ...params }) -> unknown</code>
- <code title="get /v1/batches">client.batches.<a href="./src/resources/batches/batches.ts">list</a>({ ...params }) -> unknown</code>
- <code title="post /{provider}/v1/batches/{batch_id}/cancel">client.batches.<a href="./src/resources/batches/batches.ts">cancelWithProvider</a>(batchID, { ...params }) -> unknown</code>
- <code title="post /{provider}/v1/batches">client.batches.<a href="./src/resources/batches/batches.ts">createWithProvider</a>(provider) -> unknown</code>
- <code title="get /{provider}/v1/batches">client.batches.<a href="./src/resources/batches/batches.ts">listWithProvider</a>(provider, { ...params }) -> unknown</code>
- <code title="get /{provider}/v1/batches/{batch_id}">client.batches.<a href="./src/resources/batches/batches.ts">retrieveWithProvider</a>(batchID, { ...params }) -> unknown</code>

## Cancel

Types:

- <code><a href="./src/resources/batches/cancel.ts">CancelCancelResponse</a></code>

Methods:

- <code title="post /batches/{batch_id}/cancel">client.batches.cancel.<a href="./src/resources/batches/cancel.ts">cancel</a>(batchID, { ...params }) -> unknown</code>

# Rerank

Types:

- <code><a href="./src/resources/rerank.ts">RerankCreateResponse</a></code>
- <code><a href="./src/resources/rerank.ts">RerankCreateV1Response</a></code>
- <code><a href="./src/resources/rerank.ts">RerankCreateV2Response</a></code>

Methods:

- <code title="post /rerank">client.rerank.<a href="./src/resources/rerank.ts">create</a>() -> unknown</code>
- <code title="post /v1/rerank">client.rerank.<a href="./src/resources/rerank.ts">createV1</a>() -> unknown</code>
- <code title="post /v2/rerank">client.rerank.<a href="./src/resources/rerank.ts">createV2</a>() -> unknown</code>

# FineTuning

## Jobs

Types:

- <code><a href="./src/resources/fine-tuning/jobs/jobs.ts">JobCreateResponse</a></code>
- <code><a href="./src/resources/fine-tuning/jobs/jobs.ts">JobRetrieveResponse</a></code>
- <code><a href="./src/resources/fine-tuning/jobs/jobs.ts">JobListResponse</a></code>

Methods:

- <code title="post /v1/fine_tuning/jobs">client.fineTuning.jobs.<a href="./src/resources/fine-tuning/jobs/jobs.ts">create</a>({ ...params }) -> unknown</code>
- <code title="get /v1/fine_tuning/jobs/{fine_tuning_job_id}">client.fineTuning.jobs.<a href="./src/resources/fine-tuning/jobs/jobs.ts">retrieve</a>(fineTuningJobID, { ...params }) -> unknown</code>
- <code title="get /v1/fine_tuning/jobs">client.fineTuning.jobs.<a href="./src/resources/fine-tuning/jobs/jobs.ts">list</a>({ ...params }) -> unknown</code>

### Cancel

Types:

- <code><a href="./src/resources/fine-tuning/jobs/cancel.ts">CancelCreateResponse</a></code>

Methods:

- <code title="post /v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel">client.fineTuning.jobs.cancel.<a href="./src/resources/fine-tuning/jobs/cancel.ts">create</a>(fineTuningJobID) -> unknown</code>

# Credentials

Types:

- <code><a href="./src/resources/credentials.ts">CredentialItem</a></code>
- <code><a href="./src/resources/credentials.ts">CredentialCreateResponse</a></code>
- <code><a href="./src/resources/credentials.ts">CredentialListResponse</a></code>
- <code><a href="./src/resources/credentials.ts">CredentialDeleteResponse</a></code>

Methods:

- <code title="post /credentials">client.credentials.<a href="./src/resources/credentials.ts">create</a>({ ...params }) -> unknown</code>
- <code title="get /credentials">client.credentials.<a href="./src/resources/credentials.ts">list</a>() -> unknown</code>
- <code title="delete /credentials/{credential_name}">client.credentials.<a href="./src/resources/credentials.ts">delete</a>(credentialName) -> unknown</code>

# VertexAI

Types:

- <code><a href="./src/resources/vertex-ai.ts">VertexAICreateResponse</a></code>
- <code><a href="./src/resources/vertex-ai.ts">VertexAIRetrieveResponse</a></code>
- <code><a href="./src/resources/vertex-ai.ts">VertexAIUpdateResponse</a></code>
- <code><a href="./src/resources/vertex-ai.ts">VertexAIDeleteResponse</a></code>
- <code><a href="./src/resources/vertex-ai.ts">VertexAIPatchResponse</a></code>

Methods:

- <code title="post /vertex_ai/{endpoint}">client.vertexAI.<a href="./src/resources/vertex-ai.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /vertex_ai/{endpoint}">client.vertexAI.<a href="./src/resources/vertex-ai.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /vertex_ai/{endpoint}">client.vertexAI.<a href="./src/resources/vertex-ai.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /vertex_ai/{endpoint}">client.vertexAI.<a href="./src/resources/vertex-ai.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /vertex_ai/{endpoint}">client.vertexAI.<a href="./src/resources/vertex-ai.ts">patch</a>(endpoint) -> unknown</code>

# Gemini

Types:

- <code><a href="./src/resources/gemini.ts">GeminiCreateResponse</a></code>
- <code><a href="./src/resources/gemini.ts">GeminiRetrieveResponse</a></code>
- <code><a href="./src/resources/gemini.ts">GeminiUpdateResponse</a></code>
- <code><a href="./src/resources/gemini.ts">GeminiDeleteResponse</a></code>
- <code><a href="./src/resources/gemini.ts">GeminiPatchResponse</a></code>

Methods:

- <code title="post /gemini/{endpoint}">client.gemini.<a href="./src/resources/gemini.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /gemini/{endpoint}">client.gemini.<a href="./src/resources/gemini.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /gemini/{endpoint}">client.gemini.<a href="./src/resources/gemini.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /gemini/{endpoint}">client.gemini.<a href="./src/resources/gemini.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /gemini/{endpoint}">client.gemini.<a href="./src/resources/gemini.ts">patch</a>(endpoint) -> unknown</code>

# Cohere

Types:

- <code><a href="./src/resources/cohere.ts">CohereCreateResponse</a></code>
- <code><a href="./src/resources/cohere.ts">CohereRetrieveResponse</a></code>
- <code><a href="./src/resources/cohere.ts">CohereUpdateResponse</a></code>
- <code><a href="./src/resources/cohere.ts">CohereDeleteResponse</a></code>
- <code><a href="./src/resources/cohere.ts">CohereModifyResponse</a></code>

Methods:

- <code title="post /cohere/{endpoint}">client.cohere.<a href="./src/resources/cohere.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /cohere/{endpoint}">client.cohere.<a href="./src/resources/cohere.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /cohere/{endpoint}">client.cohere.<a href="./src/resources/cohere.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /cohere/{endpoint}">client.cohere.<a href="./src/resources/cohere.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /cohere/{endpoint}">client.cohere.<a href="./src/resources/cohere.ts">modify</a>(endpoint) -> unknown</code>

# Anthropic

Types:

- <code><a href="./src/resources/anthropic.ts">AnthropicCreateResponse</a></code>
- <code><a href="./src/resources/anthropic.ts">AnthropicRetrieveResponse</a></code>
- <code><a href="./src/resources/anthropic.ts">AnthropicUpdateResponse</a></code>
- <code><a href="./src/resources/anthropic.ts">AnthropicDeleteResponse</a></code>
- <code><a href="./src/resources/anthropic.ts">AnthropicModifyResponse</a></code>

Methods:

- <code title="post /anthropic/{endpoint}">client.anthropic.<a href="./src/resources/anthropic.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /anthropic/{endpoint}">client.anthropic.<a href="./src/resources/anthropic.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /anthropic/{endpoint}">client.anthropic.<a href="./src/resources/anthropic.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /anthropic/{endpoint}">client.anthropic.<a href="./src/resources/anthropic.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /anthropic/{endpoint}">client.anthropic.<a href="./src/resources/anthropic.ts">modify</a>(endpoint) -> unknown</code>

# Bedrock

Types:

- <code><a href="./src/resources/bedrock.ts">BedrockCreateResponse</a></code>
- <code><a href="./src/resources/bedrock.ts">BedrockRetrieveResponse</a></code>
- <code><a href="./src/resources/bedrock.ts">BedrockUpdateResponse</a></code>
- <code><a href="./src/resources/bedrock.ts">BedrockDeleteResponse</a></code>
- <code><a href="./src/resources/bedrock.ts">BedrockPatchResponse</a></code>

Methods:

- <code title="post /bedrock/{endpoint}">client.bedrock.<a href="./src/resources/bedrock.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /bedrock/{endpoint}">client.bedrock.<a href="./src/resources/bedrock.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /bedrock/{endpoint}">client.bedrock.<a href="./src/resources/bedrock.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /bedrock/{endpoint}">client.bedrock.<a href="./src/resources/bedrock.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /bedrock/{endpoint}">client.bedrock.<a href="./src/resources/bedrock.ts">patch</a>(endpoint) -> unknown</code>

# EuAssemblyai

Types:

- <code><a href="./src/resources/eu-assemblyai.ts">EuAssemblyaiCreateResponse</a></code>
- <code><a href="./src/resources/eu-assemblyai.ts">EuAssemblyaiRetrieveResponse</a></code>
- <code><a href="./src/resources/eu-assemblyai.ts">EuAssemblyaiUpdateResponse</a></code>
- <code><a href="./src/resources/eu-assemblyai.ts">EuAssemblyaiDeleteResponse</a></code>
- <code><a href="./src/resources/eu-assemblyai.ts">EuAssemblyaiPatchResponse</a></code>

Methods:

- <code title="post /eu.assemblyai/{endpoint}">client.euAssemblyai.<a href="./src/resources/eu-assemblyai.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /eu.assemblyai/{endpoint}">client.euAssemblyai.<a href="./src/resources/eu-assemblyai.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /eu.assemblyai/{endpoint}">client.euAssemblyai.<a href="./src/resources/eu-assemblyai.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /eu.assemblyai/{endpoint}">client.euAssemblyai.<a href="./src/resources/eu-assemblyai.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /eu.assemblyai/{endpoint}">client.euAssemblyai.<a href="./src/resources/eu-assemblyai.ts">patch</a>(endpoint) -> unknown</code>

# Assemblyai

Types:

- <code><a href="./src/resources/assemblyai.ts">AssemblyaiCreateResponse</a></code>
- <code><a href="./src/resources/assemblyai.ts">AssemblyaiRetrieveResponse</a></code>
- <code><a href="./src/resources/assemblyai.ts">AssemblyaiUpdateResponse</a></code>
- <code><a href="./src/resources/assemblyai.ts">AssemblyaiDeleteResponse</a></code>
- <code><a href="./src/resources/assemblyai.ts">AssemblyaiPatchResponse</a></code>

Methods:

- <code title="post /assemblyai/{endpoint}">client.assemblyai.<a href="./src/resources/assemblyai.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /assemblyai/{endpoint}">client.assemblyai.<a href="./src/resources/assemblyai.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /assemblyai/{endpoint}">client.assemblyai.<a href="./src/resources/assemblyai.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /assemblyai/{endpoint}">client.assemblyai.<a href="./src/resources/assemblyai.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /assemblyai/{endpoint}">client.assemblyai.<a href="./src/resources/assemblyai.ts">patch</a>(endpoint) -> unknown</code>

# Azure

Types:

- <code><a href="./src/resources/azure.ts">AzureCreateResponse</a></code>
- <code><a href="./src/resources/azure.ts">AzureUpdateResponse</a></code>
- <code><a href="./src/resources/azure.ts">AzureDeleteResponse</a></code>
- <code><a href="./src/resources/azure.ts">AzureCallResponse</a></code>
- <code><a href="./src/resources/azure.ts">AzurePatchResponse</a></code>

Methods:

- <code title="post /azure/{endpoint}">client.azure.<a href="./src/resources/azure.ts">create</a>(endpoint) -> unknown</code>
- <code title="put /azure/{endpoint}">client.azure.<a href="./src/resources/azure.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /azure/{endpoint}">client.azure.<a href="./src/resources/azure.ts">delete</a>(endpoint) -> unknown</code>
- <code title="get /azure/{endpoint}">client.azure.<a href="./src/resources/azure.ts">call</a>(endpoint) -> unknown</code>
- <code title="patch /azure/{endpoint}">client.azure.<a href="./src/resources/azure.ts">patch</a>(endpoint) -> unknown</code>

# Langfuse

Types:

- <code><a href="./src/resources/langfuse.ts">LangfuseCreateResponse</a></code>
- <code><a href="./src/resources/langfuse.ts">LangfuseRetrieveResponse</a></code>
- <code><a href="./src/resources/langfuse.ts">LangfuseUpdateResponse</a></code>
- <code><a href="./src/resources/langfuse.ts">LangfuseDeleteResponse</a></code>
- <code><a href="./src/resources/langfuse.ts">LangfusePatchResponse</a></code>

Methods:

- <code title="post /langfuse/{endpoint}">client.langfuse.<a href="./src/resources/langfuse.ts">create</a>(endpoint) -> unknown</code>
- <code title="get /langfuse/{endpoint}">client.langfuse.<a href="./src/resources/langfuse.ts">retrieve</a>(endpoint) -> unknown</code>
- <code title="put /langfuse/{endpoint}">client.langfuse.<a href="./src/resources/langfuse.ts">update</a>(endpoint) -> unknown</code>
- <code title="delete /langfuse/{endpoint}">client.langfuse.<a href="./src/resources/langfuse.ts">delete</a>(endpoint) -> unknown</code>
- <code title="patch /langfuse/{endpoint}">client.langfuse.<a href="./src/resources/langfuse.ts">patch</a>(endpoint) -> unknown</code>

# Config

## PassThroughEndpoint

Types:

- <code><a href="./src/resources/config/pass-through-endpoint.ts">PassThroughEndpointResponse</a></code>
- <code><a href="./src/resources/config/pass-through-endpoint.ts">PassThroughGenericEndpoint</a></code>
- <code><a href="./src/resources/config/pass-through-endpoint.ts">PassThroughEndpointCreateResponse</a></code>
- <code><a href="./src/resources/config/pass-through-endpoint.ts">PassThroughEndpointUpdateResponse</a></code>

Methods:

- <code title="post /config/pass_through_endpoint">client.config.passThroughEndpoint.<a href="./src/resources/config/pass-through-endpoint.ts">create</a>({ ...params }) -> unknown</code>
- <code title="post /config/pass_through_endpoint/{endpoint_id}">client.config.passThroughEndpoint.<a href="./src/resources/config/pass-through-endpoint.ts">update</a>(endpointID) -> unknown</code>
- <code title="get /config/pass_through_endpoint">client.config.passThroughEndpoint.<a href="./src/resources/config/pass-through-endpoint.ts">list</a>({ ...params }) -> PassThroughEndpointResponse</code>
- <code title="delete /config/pass_through_endpoint">client.config.passThroughEndpoint.<a href="./src/resources/config/pass-through-endpoint.ts">delete</a>({ ...params }) -> PassThroughEndpointResponse</code>

# Test

Types:

- <code><a href="./src/resources/test.ts">TestPingResponse</a></code>

Methods:

- <code title="get /test">client.test.<a href="./src/resources/test.ts">ping</a>() -> unknown</code>

# Health

Types:

- <code><a href="./src/resources/health.ts">HealthCheckAllResponse</a></code>
- <code><a href="./src/resources/health.ts">HealthCheckLivelinessResponse</a></code>
- <code><a href="./src/resources/health.ts">HealthCheckLivenessResponse</a></code>
- <code><a href="./src/resources/health.ts">HealthCheckReadinessResponse</a></code>
- <code><a href="./src/resources/health.ts">HealthCheckServicesResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">checkAll</a>({ ...params }) -> unknown</code>
- <code title="get /health/liveliness">client.health.<a href="./src/resources/health.ts">checkLiveliness</a>() -> unknown</code>
- <code title="get /health/liveness">client.health.<a href="./src/resources/health.ts">checkLiveness</a>() -> unknown</code>
- <code title="get /health/readiness">client.health.<a href="./src/resources/health.ts">checkReadiness</a>() -> unknown</code>
- <code title="get /health/services">client.health.<a href="./src/resources/health.ts">checkServices</a>({ ...params }) -> unknown</code>

# Active

Types:

- <code><a href="./src/resources/active.ts">ActiveListCallbacksResponse</a></code>

Methods:

- <code title="get /active/callbacks">client.active.<a href="./src/resources/active.ts">listCallbacks</a>() -> unknown</code>

# Settings

Types:

- <code><a href="./src/resources/settings.ts">SettingRetrieveResponse</a></code>

Methods:

- <code title="get /settings">client.settings.<a href="./src/resources/settings.ts">retrieve</a>() -> unknown</code>

# Key

Types:

- <code><a href="./src/resources/key/key.ts">BlockKeyRequest</a></code>
- <code><a href="./src/resources/key/key.ts">GenerateKeyResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyUpdateResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyListResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyDeleteResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyBlockResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyCheckHealthResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyRetrieveInfoResponse</a></code>
- <code><a href="./src/resources/key/key.ts">KeyUnblockResponse</a></code>

Methods:

- <code title="post /key/update">client.key.<a href="./src/resources/key/key.ts">update</a>({ ...params }) -> unknown</code>
- <code title="get /key/list">client.key.<a href="./src/resources/key/key.ts">list</a>({ ...params }) -> KeyListResponse</code>
- <code title="post /key/delete">client.key.<a href="./src/resources/key/key.ts">delete</a>({ ...params }) -> unknown</code>
- <code title="post /key/block">client.key.<a href="./src/resources/key/key.ts">block</a>({ ...params }) -> KeyBlockResponse | null</code>
- <code title="post /key/health">client.key.<a href="./src/resources/key/key.ts">checkHealth</a>() -> KeyCheckHealthResponse</code>
- <code title="post /key/generate">client.key.<a href="./src/resources/key/key.ts">generate</a>({ ...params }) -> GenerateKeyResponse</code>
- <code title="post /key/{key}/regenerate">client.key.<a href="./src/resources/key/key.ts">regenerateByKey</a>(pathKey, { ...params }) -> GenerateKeyResponse | null</code>
- <code title="get /key/info">client.key.<a href="./src/resources/key/key.ts">retrieveInfo</a>({ ...params }) -> unknown</code>
- <code title="post /key/unblock">client.key.<a href="./src/resources/key/key.ts">unblock</a>({ ...params }) -> unknown</code>

## Regenerate

Types:

- <code><a href="./src/resources/key/regenerate.ts">RegenerateKeyRequest</a></code>

# User

Types:

- <code><a href="./src/resources/user.ts">UserCreateResponse</a></code>
- <code><a href="./src/resources/user.ts">UserUpdateResponse</a></code>
- <code><a href="./src/resources/user.ts">UserListResponse</a></code>
- <code><a href="./src/resources/user.ts">UserDeleteResponse</a></code>
- <code><a href="./src/resources/user.ts">UserRetrieveInfoResponse</a></code>

Methods:

- <code title="post /user/new">client.user.<a href="./src/resources/user.ts">create</a>({ ...params }) -> UserCreateResponse</code>
- <code title="post /user/update">client.user.<a href="./src/resources/user.ts">update</a>({ ...params }) -> unknown</code>
- <code title="get /user/get_users">client.user.<a href="./src/resources/user.ts">list</a>({ ...params }) -> unknown</code>
- <code title="post /user/delete">client.user.<a href="./src/resources/user.ts">delete</a>({ ...params }) -> unknown</code>
- <code title="get /user/info">client.user.<a href="./src/resources/user.ts">retrieveInfo</a>({ ...params }) -> unknown</code>

# Team

Types:

- <code><a href="./src/resources/team/team.ts">BlockTeamRequest</a></code>
- <code><a href="./src/resources/team/team.ts">Member</a></code>
- <code><a href="./src/resources/team/team.ts">TeamCreateResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamUpdateResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamListResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamDeleteResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamAddMemberResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamBlockResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamDisableLoggingResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamListAvailableResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamRemoveMemberResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamRetrieveInfoResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamUnblockResponse</a></code>
- <code><a href="./src/resources/team/team.ts">TeamUpdateMemberResponse</a></code>

Methods:

- <code title="post /team/new">client.team.<a href="./src/resources/team/team.ts">create</a>({ ...params }) -> TeamCreateResponse</code>
- <code title="post /team/update">client.team.<a href="./src/resources/team/team.ts">update</a>({ ...params }) -> unknown</code>
- <code title="get /team/list">client.team.<a href="./src/resources/team/team.ts">list</a>({ ...params }) -> unknown</code>
- <code title="post /team/delete">client.team.<a href="./src/resources/team/team.ts">delete</a>({ ...params }) -> unknown</code>
- <code title="post /team/member_add">client.team.<a href="./src/resources/team/team.ts">addMember</a>({ ...params }) -> TeamAddMemberResponse</code>
- <code title="post /team/block">client.team.<a href="./src/resources/team/team.ts">block</a>({ ...params }) -> unknown</code>
- <code title="post /team/{team_id}/disable_logging">client.team.<a href="./src/resources/team/team.ts">disableLogging</a>(teamID) -> unknown</code>
- <code title="get /team/available">client.team.<a href="./src/resources/team/team.ts">listAvailable</a>({ ...params }) -> unknown</code>
- <code title="post /team/member_delete">client.team.<a href="./src/resources/team/team.ts">removeMember</a>({ ...params }) -> unknown</code>
- <code title="get /team/info">client.team.<a href="./src/resources/team/team.ts">retrieveInfo</a>({ ...params }) -> unknown</code>
- <code title="post /team/unblock">client.team.<a href="./src/resources/team/team.ts">unblock</a>({ ...params }) -> unknown</code>
- <code title="post /team/member_update">client.team.<a href="./src/resources/team/team.ts">updateMember</a>({ ...params }) -> TeamUpdateMemberResponse</code>

## Model

Types:

- <code><a href="./src/resources/team/model.ts">ModelAddResponse</a></code>
- <code><a href="./src/resources/team/model.ts">ModelRemoveResponse</a></code>

Methods:

- <code title="post /team/model/add">client.team.model.<a href="./src/resources/team/model.ts">add</a>({ ...params }) -> unknown</code>
- <code title="post /team/model/delete">client.team.model.<a href="./src/resources/team/model.ts">remove</a>({ ...params }) -> unknown</code>

## Callback

Types:

- <code><a href="./src/resources/team/callback.ts">CallbackRetrieveResponse</a></code>
- <code><a href="./src/resources/team/callback.ts">CallbackAddResponse</a></code>

Methods:

- <code title="get /team/{team_id}/callback">client.team.callback.<a href="./src/resources/team/callback.ts">retrieve</a>(teamID) -> unknown</code>
- <code title="post /team/{team_id}/callback">client.team.callback.<a href="./src/resources/team/callback.ts">add</a>(teamID, { ...params }) -> unknown</code>

# Organization

Types:

- <code><a href="./src/resources/organization/organization.ts">OrgMember</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationCreateResponse</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationUpdateResponse</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationListResponse</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationDeleteResponse</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationAddMemberResponse</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationDeleteMemberResponse</a></code>
- <code><a href="./src/resources/organization/organization.ts">OrganizationUpdateMemberResponse</a></code>

Methods:

- <code title="post /organization/new">client.organization.<a href="./src/resources/organization/organization.ts">create</a>({ ...params }) -> OrganizationCreateResponse</code>
- <code title="patch /organization/update">client.organization.<a href="./src/resources/organization/organization.ts">update</a>({ ...params }) -> OrganizationUpdateResponse</code>
- <code title="get /organization/list">client.organization.<a href="./src/resources/organization/organization.ts">list</a>() -> OrganizationListResponse</code>
- <code title="delete /organization/delete">client.organization.<a href="./src/resources/organization/organization.ts">delete</a>({ ...params }) -> OrganizationDeleteResponse</code>
- <code title="post /organization/member_add">client.organization.<a href="./src/resources/organization/organization.ts">addMember</a>({ ...params }) -> OrganizationAddMemberResponse</code>
- <code title="delete /organization/member_delete">client.organization.<a href="./src/resources/organization/organization.ts">deleteMember</a>({ ...params }) -> unknown</code>
- <code title="patch /organization/member_update">client.organization.<a href="./src/resources/organization/organization.ts">updateMember</a>({ ...params }) -> OrganizationUpdateMemberResponse</code>

## Info

Types:

- <code><a href="./src/resources/organization/info.ts">InfoRetrieveResponse</a></code>
- <code><a href="./src/resources/organization/info.ts">InfoDeprecatedResponse</a></code>

Methods:

- <code title="get /organization/info">client.organization.info.<a href="./src/resources/organization/info.ts">retrieve</a>({ ...params }) -> InfoRetrieveResponse</code>
- <code title="post /organization/info">client.organization.info.<a href="./src/resources/organization/info.ts">deprecated</a>({ ...params }) -> unknown</code>

# Customer

Types:

- <code><a href="./src/resources/customer.ts">BlockUsers</a></code>
- <code><a href="./src/resources/customer.ts">CustomerCreateResponse</a></code>
- <code><a href="./src/resources/customer.ts">CustomerUpdateResponse</a></code>
- <code><a href="./src/resources/customer.ts">CustomerListResponse</a></code>
- <code><a href="./src/resources/customer.ts">CustomerDeleteResponse</a></code>
- <code><a href="./src/resources/customer.ts">CustomerBlockResponse</a></code>
- <code><a href="./src/resources/customer.ts">CustomerRetrieveInfoResponse</a></code>
- <code><a href="./src/resources/customer.ts">CustomerUnblockResponse</a></code>

Methods:

- <code title="post /customer/new">client.customer.<a href="./src/resources/customer.ts">create</a>({ ...params }) -> unknown</code>
- <code title="post /customer/update">client.customer.<a href="./src/resources/customer.ts">update</a>({ ...params }) -> unknown</code>
- <code title="get /customer/list">client.customer.<a href="./src/resources/customer.ts">list</a>() -> CustomerListResponse</code>
- <code title="post /customer/delete">client.customer.<a href="./src/resources/customer.ts">delete</a>({ ...params }) -> unknown</code>
- <code title="post /customer/block">client.customer.<a href="./src/resources/customer.ts">block</a>({ ...params }) -> unknown</code>
- <code title="get /customer/info">client.customer.<a href="./src/resources/customer.ts">retrieveInfo</a>({ ...params }) -> CustomerRetrieveInfoResponse</code>
- <code title="post /customer/unblock">client.customer.<a href="./src/resources/customer.ts">unblock</a>({ ...params }) -> unknown</code>

# Spend

Types:

- <code><a href="./src/resources/spend.ts">SpendCalculateSpendResponse</a></code>
- <code><a href="./src/resources/spend.ts">SpendListLogsResponse</a></code>
- <code><a href="./src/resources/spend.ts">SpendListTagsResponse</a></code>

Methods:

- <code title="post /spend/calculate">client.spend.<a href="./src/resources/spend.ts">calculateSpend</a>({ ...params }) -> unknown</code>
- <code title="get /spend/logs">client.spend.<a href="./src/resources/spend.ts">listLogs</a>({ ...params }) -> SpendListLogsResponse</code>
- <code title="get /spend/tags">client.spend.<a href="./src/resources/spend.ts">listTags</a>({ ...params }) -> SpendListTagsResponse</code>

# Global

## Spend

Types:

- <code><a href="./src/resources/global/spend.ts">SpendListTagsResponse</a></code>
- <code><a href="./src/resources/global/spend.ts">SpendResetResponse</a></code>
- <code><a href="./src/resources/global/spend.ts">SpendRetrieveReportResponse</a></code>

Methods:

- <code title="get /global/spend/tags">client.global.spend.<a href="./src/resources/global/spend.ts">listTags</a>({ ...params }) -> SpendListTagsResponse</code>
- <code title="post /global/spend/reset">client.global.spend.<a href="./src/resources/global/spend.ts">reset</a>() -> unknown</code>
- <code title="get /global/spend/report">client.global.spend.<a href="./src/resources/global/spend.ts">retrieveReport</a>({ ...params }) -> SpendRetrieveReportResponse</code>

# Provider

Types:

- <code><a href="./src/resources/provider.ts">ProviderListBudgetsResponse</a></code>

Methods:

- <code title="get /provider/budgets">client.provider.<a href="./src/resources/provider.ts">listBudgets</a>() -> ProviderListBudgetsResponse</code>

# Cache

Types:

- <code><a href="./src/resources/cache/cache.ts">CacheDeleteResponse</a></code>
- <code><a href="./src/resources/cache/cache.ts">CacheFlushAllResponse</a></code>
- <code><a href="./src/resources/cache/cache.ts">CachePingResponse</a></code>

Methods:

- <code title="post /cache/delete">client.cache.<a href="./src/resources/cache/cache.ts">delete</a>() -> unknown</code>
- <code title="post /cache/flushall">client.cache.<a href="./src/resources/cache/cache.ts">flushAll</a>() -> unknown</code>
- <code title="get /cache/ping">client.cache.<a href="./src/resources/cache/cache.ts">ping</a>() -> CachePingResponse</code>

## Redis

Types:

- <code><a href="./src/resources/cache/redis.ts">RediRetrieveInfoResponse</a></code>

Methods:

- <code title="get /cache/redis/info">client.cache.redis.<a href="./src/resources/cache/redis.ts">retrieveInfo</a>() -> unknown</code>

# Guardrails

Types:

- <code><a href="./src/resources/guardrails.ts">GuardrailListResponse</a></code>

Methods:

- <code title="get /guardrails/list">client.guardrails.<a href="./src/resources/guardrails.ts">list</a>() -> GuardrailListResponse</code>

# Add

Types:

- <code><a href="./src/resources/add.ts">IPAddress</a></code>
- <code><a href="./src/resources/add.ts">AddAddAllowedIPResponse</a></code>

Methods:

- <code title="post /add/allowed_ip">client.add.<a href="./src/resources/add.ts">addAllowedIP</a>({ ...params }) -> unknown</code>

# Delete

Types:

- <code><a href="./src/resources/delete.ts">DeleteCreateAllowedIPResponse</a></code>

Methods:

- <code title="post /delete/allowed_ip">client.delete.<a href="./src/resources/delete.ts">createAllowedIP</a>({ ...params }) -> unknown</code>

# Files

Types:

- <code><a href="./src/resources/files/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileRetrieveResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileDeleteResponse</a></code>

Methods:

- <code title="post /{provider}/v1/files">client.files.<a href="./src/resources/files/files.ts">create</a>(provider, { ...params }) -> unknown</code>
- <code title="get /{provider}/v1/files/{file_id}">client.files.<a href="./src/resources/files/files.ts">retrieve</a>(fileID, { ...params }) -> unknown</code>
- <code title="get /{provider}/v1/files">client.files.<a href="./src/resources/files/files.ts">list</a>(provider, { ...params }) -> unknown</code>
- <code title="delete /{provider}/v1/files/{file_id}">client.files.<a href="./src/resources/files/files.ts">delete</a>(fileID, { ...params }) -> unknown</code>

## Content

Types:

- <code><a href="./src/resources/files/content.ts">ContentRetrieveResponse</a></code>

Methods:

- <code title="get /{provider}/v1/files/{file_id}/content">client.files.content.<a href="./src/resources/files/content.ts">retrieve</a>(fileID, { ...params }) -> unknown</code>

# Budget

Types:

- <code><a href="./src/resources/budget.ts">BudgetNew</a></code>
- <code><a href="./src/resources/budget.ts">BudgetCreateResponse</a></code>
- <code><a href="./src/resources/budget.ts">BudgetUpdateResponse</a></code>
- <code><a href="./src/resources/budget.ts">BudgetListResponse</a></code>
- <code><a href="./src/resources/budget.ts">BudgetDeleteResponse</a></code>
- <code><a href="./src/resources/budget.ts">BudgetInfoResponse</a></code>
- <code><a href="./src/resources/budget.ts">BudgetSettingsResponse</a></code>

Methods:

- <code title="post /budget/new">client.budget.<a href="./src/resources/budget.ts">create</a>({ ...params }) -> unknown</code>
- <code title="post /budget/update">client.budget.<a href="./src/resources/budget.ts">update</a>({ ...params }) -> unknown</code>
- <code title="get /budget/list">client.budget.<a href="./src/resources/budget.ts">list</a>() -> unknown</code>
- <code title="post /budget/delete">client.budget.<a href="./src/resources/budget.ts">delete</a>({ ...params }) -> unknown</code>
- <code title="post /budget/info">client.budget.<a href="./src/resources/budget.ts">info</a>({ ...params }) -> unknown</code>
- <code title="get /budget/settings">client.budget.<a href="./src/resources/budget.ts">settings</a>({ ...params }) -> unknown</code>
