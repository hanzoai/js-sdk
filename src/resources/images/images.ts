// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenerationsAPI from './generations';
import { GenerationCreateResponse, Generations } from './generations';

export class Images extends APIResource {
  generations: GenerationsAPI.Generations = new GenerationsAPI.Generations(this._client);
}

Images.Generations = Generations;

export declare namespace Images {
  export { Generations as Generations, type GenerationCreateResponse as GenerationCreateResponse };
}
