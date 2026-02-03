// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'hanzoai';

export const parseAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['x-litellm-api-key']) ?
      req.headers['x-litellm-api-key'][0]
    : req.headers['x-litellm-api-key'];
  return { apiKey };
};
