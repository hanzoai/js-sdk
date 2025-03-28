// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'list_guardrails',
  description:
    'List the guardrails that are available on the proxy server\n\n👉 [Guardrail docs](https://docs.hanzo.ai/docs/proxy/guardrails/quick_start)\n\nExample Request:\n```bash\ncurl -X GET "http://localhost:4000/guardrails/list" -H "Authorization: Bearer <your_api_key>"\n```\n\nExample Response:\n```json\n{\n    "guardrails": [\n        {\n        "guardrail_name": "bedrock-pre-guard",\n        "guardrail_info": {\n            "params": [\n            {\n                "name": "toxicity_score",\n                "type": "float",\n                "description": "Score between 0-1 indicating content toxicity level"\n            },\n            {\n                "name": "pii_detection",\n                "type": "boolean"\n            }\n            ]\n        }\n        }\n    ]\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.guardrails.list();
  },
});
