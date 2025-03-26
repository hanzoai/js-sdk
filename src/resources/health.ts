// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Health extends APIResource {
  /**
   * 🚨 USE `/health/liveliness` to health check the proxy 🚨
   *
   * See more 👉 https://docs.llm.ai/docs/proxy/health
   *
   * Check the health of all the endpoints in config.yaml
   *
   * To run health checks in the background, add this to config.yaml:
   *
   * ```
   * general_settings:
   *     # ... other settings
   *     background_health_checks: True
   * ```
   *
   * else, the health checks will be run on models when /health is called.
   */
  checkAll(
    query: HealthCheckAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/health', { query, ...options });
  }

  /**
   * Unprotected endpoint for checking if worker is alive
   */
  checkLiveliness(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/health/liveliness', options);
  }

  /**
   * Unprotected endpoint for checking if worker is alive
   */
  checkLiveness(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/health/liveness', options);
  }

  /**
   * Unprotected endpoint for checking if worker can receive requests
   */
  checkReadiness(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/health/readiness', options);
  }

  /**
   * Use this admin-only endpoint to check if the service is healthy.
   *
   * Example:
   *
   * ```
   * curl -L -X GET 'http://0.0.0.0:4000/health/services?service=datadog'     -H 'Authorization: Bearer sk-1234'
   * ```
   */
  checkServices(query: HealthCheckServicesParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/health/services', { query, ...options });
  }
}

export type HealthCheckAllResponse = unknown;

export type HealthCheckLivelinessResponse = unknown;

export type HealthCheckLivenessResponse = unknown;

export type HealthCheckReadinessResponse = unknown;

export type HealthCheckServicesResponse = unknown;

export interface HealthCheckAllParams {
  /**
   * Specify the model name (optional)
   */
  model?: string | null;
}

export interface HealthCheckServicesParams {
  /**
   * Specify the service being hit.
   */
  service:
    | 'slack_budget_alerts'
    | 'langfuse'
    | 'slack'
    | 'openmeter'
    | 'webhook'
    | 'email'
    | 'braintrust'
    | 'datadog'
    | (string & {});
}

export declare namespace Health {
  export {
    type HealthCheckAllResponse as HealthCheckAllResponse,
    type HealthCheckLivelinessResponse as HealthCheckLivelinessResponse,
    type HealthCheckLivenessResponse as HealthCheckLivenessResponse,
    type HealthCheckReadinessResponse as HealthCheckReadinessResponse,
    type HealthCheckServicesResponse as HealthCheckServicesResponse,
    type HealthCheckAllParams as HealthCheckAllParams,
    type HealthCheckServicesParams as HealthCheckServicesParams,
  };
}
