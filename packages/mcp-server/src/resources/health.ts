// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'check_all_health',
  description:
    '🚨 USE `/health/liveliness` to health check the proxy 🚨\n\nSee more 👉 https://docs.hanzo.ai/docs/proxy/health\n\n\nCheck the health of all the endpoints in config.yaml\n\nTo run health checks in the background, add this to config.yaml:\n```\ngeneral_settings:\n    # ... other settings\n    background_health_checks: True\n```\nelse, the health checks will be run on models when /health is called.',
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
  handler: (client: Hanzo, args: any) => {
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
  handler: (client: Hanzo, args: any) => {
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
  handler: (client: Hanzo, args: any) => {
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
  handler: (client: Hanzo, args: any) => {
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.health.checkServices(body);
  },
});
