// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import * as qs from './internal/qs';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import { Active, ActiveListCallbacksResponse } from './resources/active';
import { Add, AddAddAllowedIPParams, AddAddAllowedIPResponse, IPAddress } from './resources/add';
import {
  Anthropic,
  AnthropicCreateResponse,
  AnthropicDeleteResponse,
  AnthropicModifyResponse,
  AnthropicRetrieveResponse,
  AnthropicUpdateResponse,
} from './resources/anthropic';
import {
  Assemblyai,
  AssemblyaiCreateResponse,
  AssemblyaiDeleteResponse,
  AssemblyaiPatchResponse,
  AssemblyaiRetrieveResponse,
  AssemblyaiUpdateResponse,
} from './resources/assemblyai';
import {
  AssistantCreateResponse,
  AssistantDeleteResponse,
  AssistantListResponse,
  Assistants,
} from './resources/assistants';
import {
  Azure,
  AzureCallResponse,
  AzureCreateResponse,
  AzureDeleteResponse,
  AzurePatchResponse,
  AzureUpdateResponse,
} from './resources/azure';
import {
  Bedrock,
  BedrockCreateResponse,
  BedrockDeleteResponse,
  BedrockPatchResponse,
  BedrockRetrieveResponse,
  BedrockUpdateResponse,
} from './resources/bedrock';
import {
  Budget,
  BudgetCreateParams,
  BudgetCreateResponse,
  BudgetDeleteParams,
  BudgetDeleteResponse,
  BudgetInfoParams,
  BudgetInfoResponse,
  BudgetListResponse,
  BudgetNew,
  BudgetSettingsParams,
  BudgetSettingsResponse,
  BudgetUpdateParams,
  BudgetUpdateResponse,
} from './resources/budget';
import {
  Cohere,
  CohereCreateResponse,
  CohereDeleteResponse,
  CohereModifyResponse,
  CohereRetrieveResponse,
  CohereUpdateResponse,
} from './resources/cohere';
import { CompletionCreateParams, CompletionCreateResponse, Completions } from './resources/completions';
import {
  CredentialCreateParams,
  CredentialCreateResponse,
  CredentialDeleteResponse,
  CredentialItem,
  CredentialListResponse,
  Credentials,
} from './resources/credentials';
import {
  BlockUsers,
  Customer,
  CustomerBlockParams,
  CustomerBlockResponse,
  CustomerCreateParams,
  CustomerCreateResponse,
  CustomerDeleteParams,
  CustomerDeleteResponse,
  CustomerListResponse,
  CustomerRetrieveInfoParams,
  CustomerUnblockParams,
  CustomerUnblockResponse,
  CustomerUpdateParams,
  CustomerUpdateResponse,
  LiteLlmEndUserTable,
} from './resources/customer';
import { Delete, DeleteCreateAllowedIPParams, DeleteCreateAllowedIPResponse } from './resources/delete';
import { EmbeddingCreateParams, EmbeddingCreateResponse, Embeddings } from './resources/embeddings';
import {
  EuAssemblyai,
  EuAssemblyaiCreateResponse,
  EuAssemblyaiDeleteResponse,
  EuAssemblyaiPatchResponse,
  EuAssemblyaiRetrieveResponse,
  EuAssemblyaiUpdateResponse,
} from './resources/eu-assemblyai';
import {
  Gemini,
  GeminiCreateResponse,
  GeminiDeleteResponse,
  GeminiPatchResponse,
  GeminiRetrieveResponse,
  GeminiUpdateResponse,
} from './resources/gemini';
import { GuardrailListResponse, Guardrails } from './resources/guardrails';
import {
  Health,
  HealthCheckAllParams,
  HealthCheckAllResponse,
  HealthCheckLivelinessResponse,
  HealthCheckLivenessResponse,
  HealthCheckReadinessResponse,
  HealthCheckServicesParams,
  HealthCheckServicesResponse,
} from './resources/health';
import {
  Langfuse,
  LangfuseCreateResponse,
  LangfuseDeleteResponse,
  LangfusePatchResponse,
  LangfuseRetrieveResponse,
  LangfuseUpdateResponse,
} from './resources/langfuse';
import {
  ModelGroup,
  ModelGroupRetrieveInfoParams,
  ModelGroupRetrieveInfoResponse,
} from './resources/model-group';
import { ModelListParams, ModelListResponse, Models } from './resources/models';
import { ModerationCreateResponse, Moderations } from './resources/moderations';
import { Provider, ProviderListBudgetsResponse } from './resources/provider';
import {
  Rerank,
  RerankCreateResponse,
  RerankCreateV1Response,
  RerankCreateV2Response,
} from './resources/rerank';
import { RouteListResponse, Routes } from './resources/routes';
import { SettingRetrieveResponse, Settings } from './resources/settings';
import {
  Spend,
  SpendCalculateSpendParams,
  SpendCalculateSpendResponse,
  SpendListLogsParams,
  SpendListLogsResponse,
  SpendListTagsParams,
  SpendListTagsResponse,
} from './resources/spend';
import { Test, TestPingResponse } from './resources/test';
import { GetHomeResponse } from './resources/top-level';
import {
  User,
  UserCreateParams,
  UserCreateResponse,
  UserDeleteParams,
  UserDeleteResponse,
  UserRetrieveInfoParams,
  UserRetrieveInfoResponse,
  UserUpdateParams,
  UserUpdateResponse,
} from './resources/user';
import {
  UtilGetSupportedOpenAIParamsParams,
  UtilGetSupportedOpenAIParamsResponse,
  UtilTokenCounterParams,
  UtilTokenCounterResponse,
  UtilTransformRequestParams,
  UtilTransformRequestResponse,
  Utils,
} from './resources/utils';
import {
  VertexAI,
  VertexAICreateResponse,
  VertexAIDeleteResponse,
  VertexAIPatchResponse,
  VertexAIRetrieveResponse,
  VertexAIUpdateResponse,
} from './resources/vertex-ai';
import { Audio } from './resources/audio/audio';
import {
  BatchCancelWithProviderParams,
  BatchCancelWithProviderResponse,
  BatchCreateParams,
  BatchCreateResponse,
  BatchCreateWithProviderResponse,
  BatchListParams,
  BatchListResponse,
  BatchListWithProviderParams,
  BatchListWithProviderResponse,
  BatchRetrieveParams,
  BatchRetrieveResponse,
  BatchRetrieveWithProviderParams,
  BatchRetrieveWithProviderResponse,
  Batches,
} from './resources/batches/batches';
import {
  Cache,
  CacheDeleteResponse,
  CacheFlushAllResponse,
  CachePingResponse,
} from './resources/cache/cache';
import { Chat } from './resources/chat/chat';
import { Config } from './resources/config/config';
import {
  EngineCompleteResponse,
  EngineEmbedParams,
  EngineEmbedResponse,
  Engines,
} from './resources/engines/engines';
import {
  FileCreateParams,
  FileCreateResponse,
  FileDeleteParams,
  FileDeleteResponse,
  FileListParams,
  FileListResponse,
  FileRetrieveParams,
  FileRetrieveResponse,
  Files,
} from './resources/files/files';
import { FineTuning } from './resources/fine-tuning/fine-tuning';
import { Global } from './resources/global/global';
import { Images } from './resources/images/images';
import {
  BlockKeyRequest,
  GenerateKeyResponse,
  Key,
  KeyBlockParams,
  KeyBlockResponse,
  KeyCheckHealthResponse,
  KeyDeleteParams,
  KeyDeleteResponse,
  KeyGenerateParams,
  KeyListParams,
  KeyListResponse,
  KeyRegenerateByKeyParams,
  KeyRetrieveInfoParams,
  KeyRetrieveInfoResponse,
  KeyUnblockParams,
  KeyUnblockResponse,
  KeyUpdateParams,
  KeyUpdateResponse,
} from './resources/key/key';
import {
  Model,
  ModelCreateParams,
  ModelCreateResponse,
  ModelDeleteParams,
  ModelDeleteResponse,
  ModelInfo,
} from './resources/model/model';
import {
  OpenAI,
  OpenAICreateResponse,
  OpenAIDeleteResponse,
  OpenAIPatchResponse,
  OpenAIRetrieveResponse,
  OpenAIUpdateResponse,
} from './resources/openai/openai';
import {
  BudgetTable,
  OrgMember,
  Organization,
  OrganizationAddMemberParams,
  OrganizationAddMemberResponse,
  OrganizationCreateParams,
  OrganizationCreateResponse,
  OrganizationDeleteMemberParams,
  OrganizationDeleteMemberResponse,
  OrganizationDeleteParams,
  OrganizationDeleteResponse,
  OrganizationListParams,
  OrganizationListResponse,
  OrganizationMembershipTable,
  OrganizationTableWithMembers,
  OrganizationUpdateMemberParams,
  UserRoles,
} from './resources/organization/organization';
import {
  ResponseCreateResponse,
  ResponseDeleteResponse,
  ResponseRetrieveResponse,
  Responses,
} from './resources/responses/responses';
import {
  BlockTeamRequest,
  Member,
  Team,
  TeamAddMemberParams,
  TeamAddMemberResponse,
  TeamBlockParams,
  TeamBlockResponse,
  TeamCreateParams,
  TeamCreateResponse,
  TeamDeleteParams,
  TeamDeleteResponse,
  TeamDisableLoggingResponse,
  TeamListAvailableParams,
  TeamListAvailableResponse,
  TeamListParams,
  TeamListResponse,
  TeamRemoveMemberParams,
  TeamRemoveMemberResponse,
  TeamRetrieveInfoParams,
  TeamRetrieveInfoResponse,
  TeamUnblockParams,
  TeamUnblockResponse,
  TeamUpdateMemberParams,
  TeamUpdateMemberResponse,
  TeamUpdateParams,
  TeamUpdateResponse,
} from './resources/team/team';
import { ThreadCreateResponse, ThreadRetrieveResponse, Threads } from './resources/threads/threads';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

const environments = {
  production: 'https://api.hanzo.ai',
  sandbox: 'https://api.sandbox.hanzo.ai',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * The default name of the subscription key header of Azure
   */
  apiKey?: string | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://api.hanzo.ai`
   * - `sandbox` corresponds to `https://api.sandbox.hanzo.ai`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['HANZO_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['HANZO_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Hanzo API.
 */
export class Hanzo {
  apiKey: string;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Hanzo API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['HANZO_API_KEY'] ?? undefined]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['HANZO_BASE_URL'] ?? https://api.hanzo.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('HANZO_BASE_URL'),
    apiKey = readEnv('HANZO_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.HanzoError(
        "The HANZO_API_KEY environment variable is missing or empty; either provide it, or instantiate the Hanzo client with an apiKey option, like new Hanzo({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (baseURL && opts.environment) {
      throw new Errors.HanzoError(
        'Ambiguous URL; The `baseURL` option (or HANZO_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    this.baseURL = options.baseURL || environments[options.environment || 'production'];
    this.timeout = options.timeout ?? Hanzo.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('HANZO_LOG'), "process.env['HANZO_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      environment: options.environment ? options.environment : undefined,
      baseURL: options.environment ? undefined : this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

  /**
   * Home
   */
  getHome(options?: RequestOptions): APIPromise<unknown> {
    return this.get('/', options);
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ 'x-litellm-api-key': this.apiKey }]);
  }

  protected stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    const abort = controller.abort.bind(controller);
    if (signal) signal.addEventListener('abort', abort, { once: true });

    const timeout = setTimeout(abort, ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Hanzo = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static HanzoError = Errors.HanzoError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  models: API.Models = new API.Models(this);
  openai: API.OpenAI = new API.OpenAI(this);
  engines: API.Engines = new API.Engines(this);
  chat: API.Chat = new API.Chat(this);
  completions: API.Completions = new API.Completions(this);
  embeddings: API.Embeddings = new API.Embeddings(this);
  images: API.Images = new API.Images(this);
  audio: API.Audio = new API.Audio(this);
  assistants: API.Assistants = new API.Assistants(this);
  threads: API.Threads = new API.Threads(this);
  moderations: API.Moderations = new API.Moderations(this);
  utils: API.Utils = new API.Utils(this);
  model: API.Model = new API.Model(this);
  modelGroup: API.ModelGroup = new API.ModelGroup(this);
  routes: API.Routes = new API.Routes(this);
  responses: API.Responses = new API.Responses(this);
  batches: API.Batches = new API.Batches(this);
  rerank: API.Rerank = new API.Rerank(this);
  fineTuning: API.FineTuning = new API.FineTuning(this);
  credentials: API.Credentials = new API.Credentials(this);
  vertexAI: API.VertexAI = new API.VertexAI(this);
  gemini: API.Gemini = new API.Gemini(this);
  cohere: API.Cohere = new API.Cohere(this);
  anthropic: API.Anthropic = new API.Anthropic(this);
  bedrock: API.Bedrock = new API.Bedrock(this);
  euAssemblyai: API.EuAssemblyai = new API.EuAssemblyai(this);
  assemblyai: API.Assemblyai = new API.Assemblyai(this);
  azure: API.Azure = new API.Azure(this);
  langfuse: API.Langfuse = new API.Langfuse(this);
  config: API.Config = new API.Config(this);
  test: API.Test = new API.Test(this);
  health: API.Health = new API.Health(this);
  active: API.Active = new API.Active(this);
  settings: API.Settings = new API.Settings(this);
  key: API.Key = new API.Key(this);
  user: API.User = new API.User(this);
  team: API.Team = new API.Team(this);
  organization: API.Organization = new API.Organization(this);
  customer: API.Customer = new API.Customer(this);
  spend: API.Spend = new API.Spend(this);
  global: API.Global = new API.Global(this);
  provider: API.Provider = new API.Provider(this);
  cache: API.Cache = new API.Cache(this);
  guardrails: API.Guardrails = new API.Guardrails(this);
  add: API.Add = new API.Add(this);
  delete: API.Delete = new API.Delete(this);
  files: API.Files = new API.Files(this);
  budget: API.Budget = new API.Budget(this);
}

Hanzo.Models = Models;
Hanzo.OpenAI = OpenAI;
Hanzo.Engines = Engines;
Hanzo.Chat = Chat;
Hanzo.Completions = Completions;
Hanzo.Embeddings = Embeddings;
Hanzo.Images = Images;
Hanzo.Audio = Audio;
Hanzo.Assistants = Assistants;
Hanzo.Threads = Threads;
Hanzo.Moderations = Moderations;
Hanzo.Utils = Utils;
Hanzo.Model = Model;
Hanzo.ModelGroup = ModelGroup;
Hanzo.Routes = Routes;
Hanzo.Responses = Responses;
Hanzo.Batches = Batches;
Hanzo.Rerank = Rerank;
Hanzo.FineTuning = FineTuning;
Hanzo.Credentials = Credentials;
Hanzo.VertexAI = VertexAI;
Hanzo.Gemini = Gemini;
Hanzo.Cohere = Cohere;
Hanzo.Anthropic = Anthropic;
Hanzo.Bedrock = Bedrock;
Hanzo.EuAssemblyai = EuAssemblyai;
Hanzo.Assemblyai = Assemblyai;
Hanzo.Azure = Azure;
Hanzo.Langfuse = Langfuse;
Hanzo.Config = Config;
Hanzo.Test = Test;
Hanzo.Health = Health;
Hanzo.Active = Active;
Hanzo.Settings = Settings;
Hanzo.Key = Key;
Hanzo.User = User;
Hanzo.Team = Team;
Hanzo.Organization = Organization;
Hanzo.Customer = Customer;
Hanzo.Spend = Spend;
Hanzo.Global = Global;
Hanzo.Provider = Provider;
Hanzo.Cache = Cache;
Hanzo.Guardrails = Guardrails;
Hanzo.Add = Add;
Hanzo.Delete = Delete;
Hanzo.Files = Files;
Hanzo.Budget = Budget;

export declare namespace Hanzo {
  export type RequestOptions = Opts.RequestOptions;

  export { type GetHomeResponse as GetHomeResponse };

  export {
    Models as Models,
    type ModelListResponse as ModelListResponse,
    type ModelListParams as ModelListParams,
  };

  export {
    OpenAI as OpenAI,
    type OpenAICreateResponse as OpenAICreateResponse,
    type OpenAIRetrieveResponse as OpenAIRetrieveResponse,
    type OpenAIUpdateResponse as OpenAIUpdateResponse,
    type OpenAIDeleteResponse as OpenAIDeleteResponse,
    type OpenAIPatchResponse as OpenAIPatchResponse,
  };

  export {
    Engines as Engines,
    type EngineCompleteResponse as EngineCompleteResponse,
    type EngineEmbedResponse as EngineEmbedResponse,
    type EngineEmbedParams as EngineEmbedParams,
  };

  export { Chat as Chat };

  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
  };

  export {
    Embeddings as Embeddings,
    type EmbeddingCreateResponse as EmbeddingCreateResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };

  export { Images as Images };

  export { Audio as Audio };

  export {
    Assistants as Assistants,
    type AssistantCreateResponse as AssistantCreateResponse,
    type AssistantListResponse as AssistantListResponse,
    type AssistantDeleteResponse as AssistantDeleteResponse,
  };

  export {
    Threads as Threads,
    type ThreadCreateResponse as ThreadCreateResponse,
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
  };

  export { Moderations as Moderations, type ModerationCreateResponse as ModerationCreateResponse };

  export {
    Utils as Utils,
    type UtilGetSupportedOpenAIParamsResponse as UtilGetSupportedOpenAIParamsResponse,
    type UtilTokenCounterResponse as UtilTokenCounterResponse,
    type UtilTransformRequestResponse as UtilTransformRequestResponse,
    type UtilGetSupportedOpenAIParamsParams as UtilGetSupportedOpenAIParamsParams,
    type UtilTokenCounterParams as UtilTokenCounterParams,
    type UtilTransformRequestParams as UtilTransformRequestParams,
  };

  export {
    Model as Model,
    type ModelInfo as ModelInfo,
    type ModelCreateResponse as ModelCreateResponse,
    type ModelDeleteResponse as ModelDeleteResponse,
    type ModelCreateParams as ModelCreateParams,
    type ModelDeleteParams as ModelDeleteParams,
  };

  export {
    ModelGroup as ModelGroup,
    type ModelGroupRetrieveInfoResponse as ModelGroupRetrieveInfoResponse,
    type ModelGroupRetrieveInfoParams as ModelGroupRetrieveInfoParams,
  };

  export { Routes as Routes, type RouteListResponse as RouteListResponse };

  export {
    Responses as Responses,
    type ResponseCreateResponse as ResponseCreateResponse,
    type ResponseRetrieveResponse as ResponseRetrieveResponse,
    type ResponseDeleteResponse as ResponseDeleteResponse,
  };

  export {
    Batches as Batches,
    type BatchCreateResponse as BatchCreateResponse,
    type BatchRetrieveResponse as BatchRetrieveResponse,
    type BatchListResponse as BatchListResponse,
    type BatchCancelWithProviderResponse as BatchCancelWithProviderResponse,
    type BatchCreateWithProviderResponse as BatchCreateWithProviderResponse,
    type BatchListWithProviderResponse as BatchListWithProviderResponse,
    type BatchRetrieveWithProviderResponse as BatchRetrieveWithProviderResponse,
    type BatchCreateParams as BatchCreateParams,
    type BatchRetrieveParams as BatchRetrieveParams,
    type BatchListParams as BatchListParams,
    type BatchCancelWithProviderParams as BatchCancelWithProviderParams,
    type BatchListWithProviderParams as BatchListWithProviderParams,
    type BatchRetrieveWithProviderParams as BatchRetrieveWithProviderParams,
  };

  export {
    Rerank as Rerank,
    type RerankCreateResponse as RerankCreateResponse,
    type RerankCreateV1Response as RerankCreateV1Response,
    type RerankCreateV2Response as RerankCreateV2Response,
  };

  export { FineTuning as FineTuning };

  export {
    Credentials as Credentials,
    type CredentialItem as CredentialItem,
    type CredentialCreateResponse as CredentialCreateResponse,
    type CredentialListResponse as CredentialListResponse,
    type CredentialDeleteResponse as CredentialDeleteResponse,
    type CredentialCreateParams as CredentialCreateParams,
  };

  export {
    VertexAI as VertexAI,
    type VertexAICreateResponse as VertexAICreateResponse,
    type VertexAIRetrieveResponse as VertexAIRetrieveResponse,
    type VertexAIUpdateResponse as VertexAIUpdateResponse,
    type VertexAIDeleteResponse as VertexAIDeleteResponse,
    type VertexAIPatchResponse as VertexAIPatchResponse,
  };

  export {
    Gemini as Gemini,
    type GeminiCreateResponse as GeminiCreateResponse,
    type GeminiRetrieveResponse as GeminiRetrieveResponse,
    type GeminiUpdateResponse as GeminiUpdateResponse,
    type GeminiDeleteResponse as GeminiDeleteResponse,
    type GeminiPatchResponse as GeminiPatchResponse,
  };

  export {
    Cohere as Cohere,
    type CohereCreateResponse as CohereCreateResponse,
    type CohereRetrieveResponse as CohereRetrieveResponse,
    type CohereUpdateResponse as CohereUpdateResponse,
    type CohereDeleteResponse as CohereDeleteResponse,
    type CohereModifyResponse as CohereModifyResponse,
  };

  export {
    Anthropic as Anthropic,
    type AnthropicCreateResponse as AnthropicCreateResponse,
    type AnthropicRetrieveResponse as AnthropicRetrieveResponse,
    type AnthropicUpdateResponse as AnthropicUpdateResponse,
    type AnthropicDeleteResponse as AnthropicDeleteResponse,
    type AnthropicModifyResponse as AnthropicModifyResponse,
  };

  export {
    Bedrock as Bedrock,
    type BedrockCreateResponse as BedrockCreateResponse,
    type BedrockRetrieveResponse as BedrockRetrieveResponse,
    type BedrockUpdateResponse as BedrockUpdateResponse,
    type BedrockDeleteResponse as BedrockDeleteResponse,
    type BedrockPatchResponse as BedrockPatchResponse,
  };

  export {
    EuAssemblyai as EuAssemblyai,
    type EuAssemblyaiCreateResponse as EuAssemblyaiCreateResponse,
    type EuAssemblyaiRetrieveResponse as EuAssemblyaiRetrieveResponse,
    type EuAssemblyaiUpdateResponse as EuAssemblyaiUpdateResponse,
    type EuAssemblyaiDeleteResponse as EuAssemblyaiDeleteResponse,
    type EuAssemblyaiPatchResponse as EuAssemblyaiPatchResponse,
  };

  export {
    Assemblyai as Assemblyai,
    type AssemblyaiCreateResponse as AssemblyaiCreateResponse,
    type AssemblyaiRetrieveResponse as AssemblyaiRetrieveResponse,
    type AssemblyaiUpdateResponse as AssemblyaiUpdateResponse,
    type AssemblyaiDeleteResponse as AssemblyaiDeleteResponse,
    type AssemblyaiPatchResponse as AssemblyaiPatchResponse,
  };

  export {
    Azure as Azure,
    type AzureCreateResponse as AzureCreateResponse,
    type AzureUpdateResponse as AzureUpdateResponse,
    type AzureDeleteResponse as AzureDeleteResponse,
    type AzureCallResponse as AzureCallResponse,
    type AzurePatchResponse as AzurePatchResponse,
  };

  export {
    Langfuse as Langfuse,
    type LangfuseCreateResponse as LangfuseCreateResponse,
    type LangfuseRetrieveResponse as LangfuseRetrieveResponse,
    type LangfuseUpdateResponse as LangfuseUpdateResponse,
    type LangfuseDeleteResponse as LangfuseDeleteResponse,
    type LangfusePatchResponse as LangfusePatchResponse,
  };

  export { Config as Config };

  export { Test as Test, type TestPingResponse as TestPingResponse };

  export {
    Health as Health,
    type HealthCheckAllResponse as HealthCheckAllResponse,
    type HealthCheckLivelinessResponse as HealthCheckLivelinessResponse,
    type HealthCheckLivenessResponse as HealthCheckLivenessResponse,
    type HealthCheckReadinessResponse as HealthCheckReadinessResponse,
    type HealthCheckServicesResponse as HealthCheckServicesResponse,
    type HealthCheckAllParams as HealthCheckAllParams,
    type HealthCheckServicesParams as HealthCheckServicesParams,
  };

  export { Active as Active, type ActiveListCallbacksResponse as ActiveListCallbacksResponse };

  export { Settings as Settings, type SettingRetrieveResponse as SettingRetrieveResponse };

  export {
    Key as Key,
    type BlockKeyRequest as BlockKeyRequest,
    type GenerateKeyResponse as GenerateKeyResponse,
    type KeyUpdateResponse as KeyUpdateResponse,
    type KeyListResponse as KeyListResponse,
    type KeyDeleteResponse as KeyDeleteResponse,
    type KeyBlockResponse as KeyBlockResponse,
    type KeyCheckHealthResponse as KeyCheckHealthResponse,
    type KeyRetrieveInfoResponse as KeyRetrieveInfoResponse,
    type KeyUnblockResponse as KeyUnblockResponse,
    type KeyUpdateParams as KeyUpdateParams,
    type KeyListParams as KeyListParams,
    type KeyDeleteParams as KeyDeleteParams,
    type KeyBlockParams as KeyBlockParams,
    type KeyGenerateParams as KeyGenerateParams,
    type KeyRegenerateByKeyParams as KeyRegenerateByKeyParams,
    type KeyRetrieveInfoParams as KeyRetrieveInfoParams,
    type KeyUnblockParams as KeyUnblockParams,
  };

  export {
    User as User,
    type UserCreateResponse as UserCreateResponse,
    type UserUpdateResponse as UserUpdateResponse,
    type UserDeleteResponse as UserDeleteResponse,
    type UserRetrieveInfoResponse as UserRetrieveInfoResponse,
    type UserCreateParams as UserCreateParams,
    type UserUpdateParams as UserUpdateParams,
    type UserDeleteParams as UserDeleteParams,
    type UserRetrieveInfoParams as UserRetrieveInfoParams,
  };

  export {
    Team as Team,
    type BlockTeamRequest as BlockTeamRequest,
    type Member as Member,
    type TeamCreateResponse as TeamCreateResponse,
    type TeamUpdateResponse as TeamUpdateResponse,
    type TeamListResponse as TeamListResponse,
    type TeamDeleteResponse as TeamDeleteResponse,
    type TeamAddMemberResponse as TeamAddMemberResponse,
    type TeamBlockResponse as TeamBlockResponse,
    type TeamDisableLoggingResponse as TeamDisableLoggingResponse,
    type TeamListAvailableResponse as TeamListAvailableResponse,
    type TeamRemoveMemberResponse as TeamRemoveMemberResponse,
    type TeamRetrieveInfoResponse as TeamRetrieveInfoResponse,
    type TeamUnblockResponse as TeamUnblockResponse,
    type TeamUpdateMemberResponse as TeamUpdateMemberResponse,
    type TeamCreateParams as TeamCreateParams,
    type TeamUpdateParams as TeamUpdateParams,
    type TeamListParams as TeamListParams,
    type TeamDeleteParams as TeamDeleteParams,
    type TeamAddMemberParams as TeamAddMemberParams,
    type TeamBlockParams as TeamBlockParams,
    type TeamListAvailableParams as TeamListAvailableParams,
    type TeamRemoveMemberParams as TeamRemoveMemberParams,
    type TeamRetrieveInfoParams as TeamRetrieveInfoParams,
    type TeamUnblockParams as TeamUnblockParams,
    type TeamUpdateMemberParams as TeamUpdateMemberParams,
  };

  export {
    Organization as Organization,
    type BudgetTable as BudgetTable,
    type OrgMember as OrgMember,
    type OrganizationMembershipTable as OrganizationMembershipTable,
    type OrganizationTableWithMembers as OrganizationTableWithMembers,
    type UserRoles as UserRoles,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationDeleteResponse as OrganizationDeleteResponse,
    type OrganizationAddMemberResponse as OrganizationAddMemberResponse,
    type OrganizationDeleteMemberResponse as OrganizationDeleteMemberResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationListParams as OrganizationListParams,
    type OrganizationDeleteParams as OrganizationDeleteParams,
    type OrganizationAddMemberParams as OrganizationAddMemberParams,
    type OrganizationDeleteMemberParams as OrganizationDeleteMemberParams,
    type OrganizationUpdateMemberParams as OrganizationUpdateMemberParams,
  };

  export {
    Customer as Customer,
    type BlockUsers as BlockUsers,
    type LiteLlmEndUserTable as LiteLlmEndUserTable,
    type CustomerCreateResponse as CustomerCreateResponse,
    type CustomerUpdateResponse as CustomerUpdateResponse,
    type CustomerListResponse as CustomerListResponse,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerBlockResponse as CustomerBlockResponse,
    type CustomerUnblockResponse as CustomerUnblockResponse,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerDeleteParams as CustomerDeleteParams,
    type CustomerBlockParams as CustomerBlockParams,
    type CustomerRetrieveInfoParams as CustomerRetrieveInfoParams,
    type CustomerUnblockParams as CustomerUnblockParams,
  };

  export {
    Spend as Spend,
    type SpendCalculateSpendResponse as SpendCalculateSpendResponse,
    type SpendListLogsResponse as SpendListLogsResponse,
    type SpendListTagsResponse as SpendListTagsResponse,
    type SpendCalculateSpendParams as SpendCalculateSpendParams,
    type SpendListLogsParams as SpendListLogsParams,
    type SpendListTagsParams as SpendListTagsParams,
  };

  export { Global as Global };

  export { Provider as Provider, type ProviderListBudgetsResponse as ProviderListBudgetsResponse };

  export {
    Cache as Cache,
    type CacheDeleteResponse as CacheDeleteResponse,
    type CacheFlushAllResponse as CacheFlushAllResponse,
    type CachePingResponse as CachePingResponse,
  };

  export { Guardrails as Guardrails, type GuardrailListResponse as GuardrailListResponse };

  export {
    Add as Add,
    type IPAddress as IPAddress,
    type AddAddAllowedIPResponse as AddAddAllowedIPResponse,
    type AddAddAllowedIPParams as AddAddAllowedIPParams,
  };

  export {
    Delete as Delete,
    type DeleteCreateAllowedIPResponse as DeleteCreateAllowedIPResponse,
    type DeleteCreateAllowedIPParams as DeleteCreateAllowedIPParams,
  };

  export {
    Files as Files,
    type FileCreateResponse as FileCreateResponse,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileCreateParams as FileCreateParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileListParams as FileListParams,
    type FileDeleteParams as FileDeleteParams,
  };

  export {
    Budget as Budget,
    type BudgetNew as BudgetNew,
    type BudgetCreateResponse as BudgetCreateResponse,
    type BudgetUpdateResponse as BudgetUpdateResponse,
    type BudgetListResponse as BudgetListResponse,
    type BudgetDeleteResponse as BudgetDeleteResponse,
    type BudgetInfoResponse as BudgetInfoResponse,
    type BudgetSettingsResponse as BudgetSettingsResponse,
    type BudgetCreateParams as BudgetCreateParams,
    type BudgetUpdateParams as BudgetUpdateParams,
    type BudgetDeleteParams as BudgetDeleteParams,
    type BudgetInfoParams as BudgetInfoParams,
    type BudgetSettingsParams as BudgetSettingsParams,
  };
}
