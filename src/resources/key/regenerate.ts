// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Regenerate extends APIResource {}

export interface RegenerateKeyRequest {
  aliases?: unknown | null;

  allowed_cache_controls?: Array<unknown> | null;

  blocked?: boolean | null;

  budget_duration?: string | null;

  budget_id?: string | null;

  config?: unknown | null;

  duration?: string | null;

  enforced_params?: Array<string> | null;

  guardrails?: Array<string> | null;

  key?: string | null;

  key_alias?: string | null;

  max_budget?: number | null;

  max_parallel_requests?: number | null;

  metadata?: unknown | null;

  model_max_budget?: unknown | null;

  model_rpm_limit?: unknown | null;

  model_tpm_limit?: unknown | null;

  models?: Array<unknown> | null;

  new_master_key?: string | null;

  permissions?: unknown | null;

  rpm_limit?: number | null;

  send_invite_email?: boolean | null;

  soft_budget?: number | null;

  spend?: number | null;

  tags?: Array<string> | null;

  team_id?: string | null;

  tpm_limit?: number | null;

  user_id?: string | null;
}

export declare namespace Regenerate {
  export { type RegenerateKeyRequest as RegenerateKeyRequest };
}
