// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

import get_home_client from './top-level/get-home-client';
import list_models from './models/list-models';
import create_openai from './openai/create-openai';
import retrieve_openai from './openai/retrieve-openai';
import update_openai from './openai/update-openai';
import delete_openai from './openai/delete-openai';
import patch_openai from './openai/patch-openai';
import complete_openai_deployments from './openai/deployments/complete-openai-deployments';
import embed_openai_deployments from './openai/deployments/embed-openai-deployments';
import complete_deployments_openai_chat from './openai/deployments/chat/complete-deployments-openai-chat';
import complete_engines from './engines/complete-engines';
import embed_engines from './engines/embed-engines';
import complete_engines_chat from './engines/chat/complete-engines-chat';
import create_chat_completions from './chat/completions/create-chat-completions';
import create_completions from './completions/create-completions';
import create_embeddings from './embeddings/create-embeddings';
import create_images_generations from './images/generations/create-images-generations';
import create_audio_speech from './audio/speech/create-audio-speech';
import create_audio_transcriptions from './audio/transcriptions/create-audio-transcriptions';
import create_assistants from './assistants/create-assistants';
import list_assistants from './assistants/list-assistants';
import delete_assistants from './assistants/delete-assistants';
import create_threads from './threads/create-threads';
import retrieve_threads from './threads/retrieve-threads';
import create_threads_messages from './threads/messages/create-threads-messages';
import list_threads_messages from './threads/messages/list-threads-messages';
import create_threads_runs from './threads/runs/create-threads-runs';
import create_moderations from './moderations/create-moderations';
import get_supported_openai_params_utils from './utils/get-supported-openai-params-utils';
import token_counter_utils from './utils/token-counter-utils';
import transform_request_utils from './utils/transform-request-utils';
import create_model from './model/create-model';
import delete_model from './model/delete-model';
import list_model_info from './model/info/list-model-info';
import full_model_update from './model/update/full-model-update';
import partial_model_update from './model/update/partial-model-update';
import retrieve_info_model_group from './model-group/retrieve-info-model-group';
import list_routes from './routes/list-routes';
import create_responses from './responses/create-responses';
import retrieve_responses from './responses/retrieve-responses';
import delete_responses from './responses/delete-responses';
import list_responses_input_items from './responses/input-items/list-responses-input-items';
import create_batches from './batches/create-batches';
import retrieve_batches from './batches/retrieve-batches';
import list_batches from './batches/list-batches';
import cancel_with_provider_batches from './batches/cancel-with-provider-batches';
import create_with_provider_batches from './batches/create-with-provider-batches';
import list_with_provider_batches from './batches/list-with-provider-batches';
import retrieve_with_provider_batches from './batches/retrieve-with-provider-batches';
import cancel_batches_cancel from './batches/cancel/cancel-batches-cancel';
import create_rerank from './rerank/create-rerank';
import create_v1_rerank from './rerank/create-v1-rerank';
import create_v2_rerank from './rerank/create-v2-rerank';
import create_fine_tuning_jobs from './fine-tuning/jobs/create-fine-tuning-jobs';
import retrieve_fine_tuning_jobs from './fine-tuning/jobs/retrieve-fine-tuning-jobs';
import list_fine_tuning_jobs from './fine-tuning/jobs/list-fine-tuning-jobs';
import create_jobs_fine_tuning_cancel from './fine-tuning/jobs/cancel/create-jobs-fine-tuning-cancel';
import create_credentials from './credentials/create-credentials';
import list_credentials from './credentials/list-credentials';
import delete_credentials from './credentials/delete-credentials';
import create_vertex_ai from './vertex-ai/create-vertex-ai';
import retrieve_vertex_ai from './vertex-ai/retrieve-vertex-ai';
import update_vertex_ai from './vertex-ai/update-vertex-ai';
import delete_vertex_ai from './vertex-ai/delete-vertex-ai';
import patch_vertex_ai from './vertex-ai/patch-vertex-ai';
import create_gemini from './gemini/create-gemini';
import retrieve_gemini from './gemini/retrieve-gemini';
import update_gemini from './gemini/update-gemini';
import delete_gemini from './gemini/delete-gemini';
import patch_gemini from './gemini/patch-gemini';
import create_cohere from './cohere/create-cohere';
import retrieve_cohere from './cohere/retrieve-cohere';
import update_cohere from './cohere/update-cohere';
import delete_cohere from './cohere/delete-cohere';
import modify_cohere from './cohere/modify-cohere';
import create_anthropic from './anthropic/create-anthropic';
import retrieve_anthropic from './anthropic/retrieve-anthropic';
import update_anthropic from './anthropic/update-anthropic';
import delete_anthropic from './anthropic/delete-anthropic';
import modify_anthropic from './anthropic/modify-anthropic';
import create_bedrock from './bedrock/create-bedrock';
import retrieve_bedrock from './bedrock/retrieve-bedrock';
import update_bedrock from './bedrock/update-bedrock';
import delete_bedrock from './bedrock/delete-bedrock';
import patch_bedrock from './bedrock/patch-bedrock';
import create_eu_assemblyai from './eu-assemblyai/create-eu-assemblyai';
import retrieve_eu_assemblyai from './eu-assemblyai/retrieve-eu-assemblyai';
import update_eu_assemblyai from './eu-assemblyai/update-eu-assemblyai';
import delete_eu_assemblyai from './eu-assemblyai/delete-eu-assemblyai';
import patch_eu_assemblyai from './eu-assemblyai/patch-eu-assemblyai';
import create_assemblyai from './assemblyai/create-assemblyai';
import retrieve_assemblyai from './assemblyai/retrieve-assemblyai';
import update_assemblyai from './assemblyai/update-assemblyai';
import delete_assemblyai from './assemblyai/delete-assemblyai';
import patch_assemblyai from './assemblyai/patch-assemblyai';
import create_azure from './azure/create-azure';
import update_azure from './azure/update-azure';
import delete_azure from './azure/delete-azure';
import call_azure from './azure/call-azure';
import patch_azure from './azure/patch-azure';
import create_langfuse from './langfuse/create-langfuse';
import retrieve_langfuse from './langfuse/retrieve-langfuse';
import update_langfuse from './langfuse/update-langfuse';
import delete_langfuse from './langfuse/delete-langfuse';
import patch_langfuse from './langfuse/patch-langfuse';
import create_config_pass_through_endpoint from './config/pass-through-endpoint/create-config-pass-through-endpoint';
import update_config_pass_through_endpoint from './config/pass-through-endpoint/update-config-pass-through-endpoint';
import list_config_pass_through_endpoint from './config/pass-through-endpoint/list-config-pass-through-endpoint';
import delete_config_pass_through_endpoint from './config/pass-through-endpoint/delete-config-pass-through-endpoint';
import ping_test from './test/ping-test';
import check_all_health from './health/check-all-health';
import check_liveliness_health from './health/check-liveliness-health';
import check_liveness_health from './health/check-liveness-health';
import check_readiness_health from './health/check-readiness-health';
import check_services_health from './health/check-services-health';
import list_callbacks_active from './active/list-callbacks-active';
import retrieve_settings from './settings/retrieve-settings';
import update_key from './key/update-key';
import list_key from './key/list-key';
import delete_key from './key/delete-key';
import block_key from './key/block-key';
import check_health_key from './key/check-health-key';
import generate_key from './key/generate-key';
import regenerate_by_key_key from './key/regenerate-by-key-key';
import retrieve_info_key from './key/retrieve-info-key';
import unblock_key from './key/unblock-key';
import create_user from './user/create-user';
import update_user from './user/update-user';
import list_user from './user/list-user';
import delete_user from './user/delete-user';
import retrieve_info_user from './user/retrieve-info-user';
import create_team from './team/create-team';
import update_team from './team/update-team';
import list_team from './team/list-team';
import delete_team from './team/delete-team';
import add_member_team from './team/add-member-team';
import block_team from './team/block-team';
import disable_logging_team from './team/disable-logging-team';
import list_available_team from './team/list-available-team';
import remove_member_team from './team/remove-member-team';
import retrieve_info_team from './team/retrieve-info-team';
import unblock_team from './team/unblock-team';
import update_member_team from './team/update-member-team';
import add_team_model from './team/model/add-team-model';
import remove_team_model from './team/model/remove-team-model';
import retrieve_team_callback from './team/callback/retrieve-team-callback';
import add_team_callback from './team/callback/add-team-callback';
import create_organization from './organization/create-organization';
import update_organization from './organization/update-organization';
import list_organization from './organization/list-organization';
import delete_organization from './organization/delete-organization';
import add_member_organization from './organization/add-member-organization';
import delete_member_organization from './organization/delete-member-organization';
import update_member_organization from './organization/update-member-organization';
import retrieve_organization_info from './organization/info/retrieve-organization-info';
import deprecated_organization_info from './organization/info/deprecated-organization-info';
import create_customer from './customer/create-customer';
import update_customer from './customer/update-customer';
import list_customer from './customer/list-customer';
import delete_customer from './customer/delete-customer';
import block_customer from './customer/block-customer';
import retrieve_info_customer from './customer/retrieve-info-customer';
import unblock_customer from './customer/unblock-customer';
import calculate_spend_spend from './spend/calculate-spend-spend';
import list_logs_spend from './spend/list-logs-spend';
import list_tags_spend from './spend/list-tags-spend';
import list_tags_global_spend from './global/spend/list-tags-global-spend';
import reset_global_spend from './global/spend/reset-global-spend';
import retrieve_report_global_spend from './global/spend/retrieve-report-global-spend';
import list_budgets_provider from './provider/list-budgets-provider';
import delete_cache from './cache/delete-cache';
import flush_all_cache from './cache/flush-all-cache';
import ping_cache from './cache/ping-cache';
import retrieve_info_cache_redis from './cache/redis/retrieve-info-cache-redis';
import list_guardrails from './guardrails/list-guardrails';
import add_allowed_ip_add from './add/add-allowed-ip-add';
import create_allowed_ip_delete from './delete/create-allowed-ip-delete';
import create_files from './files/create-files';
import retrieve_files from './files/retrieve-files';
import list_files from './files/list-files';
import delete_files from './files/delete-files';
import retrieve_files_content from './files/content/retrieve-files-content';
import create_budget from './budget/create-budget';
import update_budget from './budget/update-budget';
import list_budget from './budget/list-budget';
import delete_budget from './budget/delete-budget';
import info_budget from './budget/info-budget';
import settings_budget from './budget/settings-budget';

export type HandlerFunction = (client: Hanzo, args: Record<string, unknown> | undefined) => Promise<any>;

export type Metadata = {
  resource: string;
  operation: 'read' | 'write';
  tags: string[];
};

export type Endpoint = {
  metadata: Metadata;
  tool: Tool;
  handler: HandlerFunction;
};

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(get_home_client);
addEndpoint(list_models);
addEndpoint(create_openai);
addEndpoint(retrieve_openai);
addEndpoint(update_openai);
addEndpoint(delete_openai);
addEndpoint(patch_openai);
addEndpoint(complete_openai_deployments);
addEndpoint(embed_openai_deployments);
addEndpoint(complete_deployments_openai_chat);
addEndpoint(complete_engines);
addEndpoint(embed_engines);
addEndpoint(complete_engines_chat);
addEndpoint(create_chat_completions);
addEndpoint(create_completions);
addEndpoint(create_embeddings);
addEndpoint(create_images_generations);
addEndpoint(create_audio_speech);
addEndpoint(create_audio_transcriptions);
addEndpoint(create_assistants);
addEndpoint(list_assistants);
addEndpoint(delete_assistants);
addEndpoint(create_threads);
addEndpoint(retrieve_threads);
addEndpoint(create_threads_messages);
addEndpoint(list_threads_messages);
addEndpoint(create_threads_runs);
addEndpoint(create_moderations);
addEndpoint(get_supported_openai_params_utils);
addEndpoint(token_counter_utils);
addEndpoint(transform_request_utils);
addEndpoint(create_model);
addEndpoint(delete_model);
addEndpoint(list_model_info);
addEndpoint(full_model_update);
addEndpoint(partial_model_update);
addEndpoint(retrieve_info_model_group);
addEndpoint(list_routes);
addEndpoint(create_responses);
addEndpoint(retrieve_responses);
addEndpoint(delete_responses);
addEndpoint(list_responses_input_items);
addEndpoint(create_batches);
addEndpoint(retrieve_batches);
addEndpoint(list_batches);
addEndpoint(cancel_with_provider_batches);
addEndpoint(create_with_provider_batches);
addEndpoint(list_with_provider_batches);
addEndpoint(retrieve_with_provider_batches);
addEndpoint(cancel_batches_cancel);
addEndpoint(create_rerank);
addEndpoint(create_v1_rerank);
addEndpoint(create_v2_rerank);
addEndpoint(create_fine_tuning_jobs);
addEndpoint(retrieve_fine_tuning_jobs);
addEndpoint(list_fine_tuning_jobs);
addEndpoint(create_jobs_fine_tuning_cancel);
addEndpoint(create_credentials);
addEndpoint(list_credentials);
addEndpoint(delete_credentials);
addEndpoint(create_vertex_ai);
addEndpoint(retrieve_vertex_ai);
addEndpoint(update_vertex_ai);
addEndpoint(delete_vertex_ai);
addEndpoint(patch_vertex_ai);
addEndpoint(create_gemini);
addEndpoint(retrieve_gemini);
addEndpoint(update_gemini);
addEndpoint(delete_gemini);
addEndpoint(patch_gemini);
addEndpoint(create_cohere);
addEndpoint(retrieve_cohere);
addEndpoint(update_cohere);
addEndpoint(delete_cohere);
addEndpoint(modify_cohere);
addEndpoint(create_anthropic);
addEndpoint(retrieve_anthropic);
addEndpoint(update_anthropic);
addEndpoint(delete_anthropic);
addEndpoint(modify_anthropic);
addEndpoint(create_bedrock);
addEndpoint(retrieve_bedrock);
addEndpoint(update_bedrock);
addEndpoint(delete_bedrock);
addEndpoint(patch_bedrock);
addEndpoint(create_eu_assemblyai);
addEndpoint(retrieve_eu_assemblyai);
addEndpoint(update_eu_assemblyai);
addEndpoint(delete_eu_assemblyai);
addEndpoint(patch_eu_assemblyai);
addEndpoint(create_assemblyai);
addEndpoint(retrieve_assemblyai);
addEndpoint(update_assemblyai);
addEndpoint(delete_assemblyai);
addEndpoint(patch_assemblyai);
addEndpoint(create_azure);
addEndpoint(update_azure);
addEndpoint(delete_azure);
addEndpoint(call_azure);
addEndpoint(patch_azure);
addEndpoint(create_langfuse);
addEndpoint(retrieve_langfuse);
addEndpoint(update_langfuse);
addEndpoint(delete_langfuse);
addEndpoint(patch_langfuse);
addEndpoint(create_config_pass_through_endpoint);
addEndpoint(update_config_pass_through_endpoint);
addEndpoint(list_config_pass_through_endpoint);
addEndpoint(delete_config_pass_through_endpoint);
addEndpoint(ping_test);
addEndpoint(check_all_health);
addEndpoint(check_liveliness_health);
addEndpoint(check_liveness_health);
addEndpoint(check_readiness_health);
addEndpoint(check_services_health);
addEndpoint(list_callbacks_active);
addEndpoint(retrieve_settings);
addEndpoint(update_key);
addEndpoint(list_key);
addEndpoint(delete_key);
addEndpoint(block_key);
addEndpoint(check_health_key);
addEndpoint(generate_key);
addEndpoint(regenerate_by_key_key);
addEndpoint(retrieve_info_key);
addEndpoint(unblock_key);
addEndpoint(create_user);
addEndpoint(update_user);
addEndpoint(list_user);
addEndpoint(delete_user);
addEndpoint(retrieve_info_user);
addEndpoint(create_team);
addEndpoint(update_team);
addEndpoint(list_team);
addEndpoint(delete_team);
addEndpoint(add_member_team);
addEndpoint(block_team);
addEndpoint(disable_logging_team);
addEndpoint(list_available_team);
addEndpoint(remove_member_team);
addEndpoint(retrieve_info_team);
addEndpoint(unblock_team);
addEndpoint(update_member_team);
addEndpoint(add_team_model);
addEndpoint(remove_team_model);
addEndpoint(retrieve_team_callback);
addEndpoint(add_team_callback);
addEndpoint(create_organization);
addEndpoint(update_organization);
addEndpoint(list_organization);
addEndpoint(delete_organization);
addEndpoint(add_member_organization);
addEndpoint(delete_member_organization);
addEndpoint(update_member_organization);
addEndpoint(retrieve_organization_info);
addEndpoint(deprecated_organization_info);
addEndpoint(create_customer);
addEndpoint(update_customer);
addEndpoint(list_customer);
addEndpoint(delete_customer);
addEndpoint(block_customer);
addEndpoint(retrieve_info_customer);
addEndpoint(unblock_customer);
addEndpoint(calculate_spend_spend);
addEndpoint(list_logs_spend);
addEndpoint(list_tags_spend);
addEndpoint(list_tags_global_spend);
addEndpoint(reset_global_spend);
addEndpoint(retrieve_report_global_spend);
addEndpoint(list_budgets_provider);
addEndpoint(delete_cache);
addEndpoint(flush_all_cache);
addEndpoint(ping_cache);
addEndpoint(retrieve_info_cache_redis);
addEndpoint(list_guardrails);
addEndpoint(add_allowed_ip_add);
addEndpoint(create_allowed_ip_delete);
addEndpoint(create_files);
addEndpoint(retrieve_files);
addEndpoint(list_files);
addEndpoint(delete_files);
addEndpoint(retrieve_files_content);
addEndpoint(create_budget);
addEndpoint(update_budget);
addEndpoint(list_budget);
addEndpoint(delete_budget);
addEndpoint(info_budget);
addEndpoint(settings_budget);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  if (filters.length === 0) {
    return endpoints;
  }

  const allExcludes = filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  if (unmatchedFilters.size > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${[...unmatchedFilters]
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
