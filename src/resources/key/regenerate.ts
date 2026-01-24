// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Regenerate extends APIResource {}

export interface RegenerateKeyRequest {
  aliases?: { [key: string]: unknown } | null;

  allowed_cache_controls?: Array<unknown> | null;

  allowed_passthrough_routes?: Array<unknown> | null;

  allowed_routes?: Array<unknown> | null;

  allowed_vector_store_indexes?: Array<RegenerateKeyRequest.AllowedVectorStoreIndex> | null;

  /**
   * Whether this key should be automatically rotated
   */
  auto_rotate?: boolean | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  budget_id?: string | null;

  config?: { [key: string]: unknown } | null;

  duration?: string | null;

  enforced_params?: Array<string> | null;

  guardrails?: Array<string> | null;

  key?: string | null;

  key_alias?: string | null;

  /**
   * Enum for key types that determine what routes a key can access
   */
  key_type?: 'llm_api' | 'management' | 'read_only' | 'default' | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: { [key: string]: unknown } | null;

  model_max_budget?: { [key: string]: unknown } | null;

  model_rpm_limit?: { [key: string]: unknown } | null;

  model_tpm_limit?: { [key: string]: unknown } | null;

  models?: Array<unknown> | null;

  new_key?: string | null;

  new_master_key?: string | null;

  object_permission?: RegenerateKeyRequest.ObjectPermission | null;

  organization_id?: string | null;

  permissions?: { [key: string]: unknown } | null;

  prompts?: Array<string> | null;

  /**
   * How often to rotate this key (e.g., '30d', '90d'). Required if auto_rotate=True
   */
  rotation_interval?: string | null;

  /**
   * Set of params that you can modify via `router.update_settings()`.
   */
  router_settings?: RegenerateKeyRequest.RouterSettings | null;

  rpm_limit?: number | null;

  rpm_limit_type?: 'guaranteed_throughput' | 'best_effort_throughput' | 'dynamic' | null;

  send_invite_email?: boolean | null;

  soft_budget?: number | null;

  spend?: number | null;

  tags?: Array<string> | null;

  team_id?: string | null;

  tpm_limit?: number | null;

  tpm_limit_type?: 'guaranteed_throughput' | 'best_effort_throughput' | 'dynamic' | null;

  user_id?: string | null;
}

export namespace RegenerateKeyRequest {
  export interface AllowedVectorStoreIndex {
    index_name: string;

    index_permissions: Array<'read' | 'write'>;
  }

  export interface ObjectPermission {
    agent_access_groups?: Array<string> | null;

    agents?: Array<string> | null;

    mcp_access_groups?: Array<string> | null;

    mcp_servers?: Array<string> | null;

    mcp_tool_permissions?: { [key: string]: Array<string> } | null;

    vector_stores?: Array<string> | null;
  }

  /**
   * Set of params that you can modify via `router.update_settings()`.
   */
  export interface RouterSettings {
    allowed_fails?: number | null;

    context_window_fallbacks?: Array<{ [key: string]: unknown }> | null;

    cooldown_time?: number | null;

    fallbacks?: Array<{ [key: string]: unknown }> | null;

    max_retries?: number | null;

    model_group_alias?: { [key: string]: string | { [key: string]: unknown } } | null;

    model_group_retry_policy?: { [key: string]: unknown } | null;

    num_retries?: number | null;

    retry_after?: number | null;

    routing_strategy?: string | null;

    routing_strategy_args?: { [key: string]: unknown } | null;

    timeout?: number | null;
  }
}

export declare namespace Regenerate {
  export { type RegenerateKeyRequest as RegenerateKeyRequest };
}
