// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'hanzoai';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['ocp-apim-subscription-key']) ?
      req.headers['ocp-apim-subscription-key'][0]
    : req.headers['ocp-apim-subscription-key'];
  return { apiKey };
};
