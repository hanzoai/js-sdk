// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RedisAPI from './redis';
import { RediRetrieveInfoResponse, Redis } from './redis';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Cache extends APIResource {
  redis: RedisAPI.Redis = new RedisAPI.Redis(this._client);

  /**
   * Endpoint for deleting a key from the cache. All responses from llm proxy have
   * `x-llm-cache-key` in the headers
   *
   * Parameters:
   *
   * - **keys**: _Optional[List[str]]_ - A list of keys to delete from the cache.
   *   Example {"keys": ["key1", "key2"]}
   *
   * ```shell
   * curl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d '{"keys": ["key1", "key2"]}'
   * ```
   */
  delete(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/cache/delete', options);
  }

  /**
   * A function to flush all items from the cache. (All items will be deleted from
   * the cache with this) Raises HTTPException if the cache is not initialized or if
   * the cache type does not support flushing. Returns a dictionary with the status
   * of the operation.
   *
   * Usage:
   *
   * ```
   * curl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"
   * ```
   */
  flushAll(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/cache/flushall', options);
  }

  /**
   * Endpoint for checking if cache can be pinged
   */
  ping(options?: RequestOptions): APIPromise<CachePingResponse> {
    return this._client.get('/cache/ping', options);
  }
}

export type CacheDeleteResponse = unknown;

export type CacheFlushAllResponse = unknown;

export interface CachePingResponse {
  cache_type: string;

  status: string;

  health_check_cache_params?: unknown | null;

  llm_cache_params?: string | null;

  ping_response?: boolean | null;

  set_cache_response?: string | null;
}

Cache.Redis = Redis;

export declare namespace Cache {
  export {
    type CacheDeleteResponse as CacheDeleteResponse,
    type CacheFlushAllResponse as CacheFlushAllResponse,
    type CachePingResponse as CachePingResponse,
  };

  export { Redis as Redis, type RediRetrieveInfoResponse as RediRetrieveInfoResponse };
}
