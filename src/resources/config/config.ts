// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PassThroughEndpointAPI from './pass-through-endpoint';
import {
  PassThroughEndpoint,
  PassThroughEndpointCreateParams,
  PassThroughEndpointCreateResponse,
  PassThroughEndpointDeleteParams,
  PassThroughEndpointListParams,
  PassThroughEndpointResponse,
  PassThroughEndpointUpdateParams,
  PassThroughEndpointUpdateResponse,
  PassThroughGenericEndpoint,
} from './pass-through-endpoint';

export class Config extends APIResource {
  passThroughEndpoint: PassThroughEndpointAPI.PassThroughEndpoint =
    new PassThroughEndpointAPI.PassThroughEndpoint(this._client);
}

Config.PassThroughEndpoint = PassThroughEndpoint;

export declare namespace Config {
  export {
    PassThroughEndpoint as PassThroughEndpoint,
    type PassThroughEndpointResponse as PassThroughEndpointResponse,
    type PassThroughGenericEndpoint as PassThroughGenericEndpoint,
    type PassThroughEndpointCreateResponse as PassThroughEndpointCreateResponse,
    type PassThroughEndpointUpdateResponse as PassThroughEndpointUpdateResponse,
    type PassThroughEndpointCreateParams as PassThroughEndpointCreateParams,
    type PassThroughEndpointUpdateParams as PassThroughEndpointUpdateParams,
    type PassThroughEndpointListParams as PassThroughEndpointListParams,
    type PassThroughEndpointDeleteParams as PassThroughEndpointDeleteParams,
  };
}
