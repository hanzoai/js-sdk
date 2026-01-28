// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Chat extends APIResource {
  /**
   * Follows the exact same API spec as
   * `OpenAI's Chat API https://platform.openai.com/docs/api-reference/chat`
   *
   * ```bash
   * curl -X POST http://localhost:4000/v1/chat/completions
   * -H "Content-Type: application/json"
   * -H "Authorization: Bearer sk-1234"
   * -d '{
   *     "model": "gpt-4o",
   *     "messages": [
   *         {
   *             "role": "user",
   *             "content": "Hello!"
   *         }
   *     ]
   * }'
   * ```
   *
   * @example
   * ```ts
   * const response =
   *   await client.openai.deployments.chat.complete('model', {
   *     messages: [
   *       { content: 'Hello, how are you?', role: 'user' },
   *     ],
   *     body_model: 'model',
   *   });
   * ```
   */
  complete(pathModel: string, body: ChatCompleteParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/openai/deployments/${pathModel}/chat/completions`, { body, ...options });
  }
}

export type ChatCompleteResponse = unknown;

export interface ChatCompleteParams {
  messages: Array<
    | ChatCompleteParams.ChatCompletionUserMessage
    | ChatCompleteParams.ChatCompletionAssistantMessage
    | ChatCompleteParams.ChatCompletionToolMessage
    | ChatCompleteParams.ChatCompletionSystemMessage
    | ChatCompleteParams.ChatCompletionFunctionMessage
    | ChatCompleteParams.ChatCompletionDeveloperMessage
  >;

  body_model: string;

  caching?: boolean | null;

  context_window_fallback_dict?: { [key: string]: string } | null;

  fallbacks?: Array<string> | null;

  frequency_penalty?: number | null;

  function_call?: string | { [key: string]: unknown } | null;

  functions?: Array<{ [key: string]: unknown }> | null;

  guardrails?: Array<string> | null;

  logit_bias?: { [key: string]: number } | null;

  logprobs?: boolean | null;

  max_tokens?: number | null;

  metadata?: { [key: string]: unknown } | null;

  n?: number | null;

  num_retries?: number | null;

  parallel_tool_calls?: boolean | null;

  presence_penalty?: number | null;

  response_format?: { [key: string]: unknown } | null;

  seed?: number | null;

  service_tier?: string | null;

  stop?: string | Array<string> | null;

  stream?: boolean | null;

  stream_options?: { [key: string]: unknown } | null;

  temperature?: number | null;

  tool_choice?: string | { [key: string]: unknown } | null;

  tools?: Array<{ [key: string]: unknown }> | null;

  top_logprobs?: number | null;

  top_p?: number | null;

  user?: string | null;
}

export namespace ChatCompleteParams {
  export interface ChatCompletionUserMessage {
    content:
      | string
      | Array<
          | ChatCompletionUserMessage.ChatCompletionTextObject
          | ChatCompletionUserMessage.ChatCompletionImageObject
          | ChatCompletionUserMessage.ChatCompletionAudioObject
          | ChatCompletionUserMessage.ChatCompletionDocumentObject
          | ChatCompletionUserMessage.ChatCompletionVideoObject
          | ChatCompletionUserMessage.ChatCompletionFileObject
        >;

    role: 'user';

    cache_control?: ChatCompletionUserMessage.CacheControl;
  }

  export namespace ChatCompletionUserMessage {
    export interface ChatCompletionTextObject {
      text: string;

      type: 'text';

      cache_control?: ChatCompletionTextObject.CacheControl;
    }

    export namespace ChatCompletionTextObject {
      export interface CacheControl {
        type: 'ephemeral';
      }
    }

    export interface ChatCompletionImageObject {
      image_url: string | ChatCompletionImageObject.ChatCompletionImageURLObject;

      type: 'image_url';
    }

    export namespace ChatCompletionImageObject {
      export interface ChatCompletionImageURLObject {
        url: string;

        detail?: string;

        format?: string;
      }
    }

    export interface ChatCompletionAudioObject {
      input_audio: ChatCompletionAudioObject.InputAudio;

      type: 'input_audio';
    }

    export namespace ChatCompletionAudioObject {
      export interface InputAudio {
        data: string;

        format: 'wav' | 'mp3';
      }
    }

    export interface ChatCompletionDocumentObject {
      citations: ChatCompletionDocumentObject.Citations | null;

      context: string;

      source: ChatCompletionDocumentObject.Source;

      title: string;

      type: 'document';
    }

    export namespace ChatCompletionDocumentObject {
      export interface Citations {
        enabled: boolean;
      }

      export interface Source {
        data: string;

        media_type: string;

        type: 'text';
      }
    }

    export interface ChatCompletionVideoObject {
      type: 'video_url';

      video_url: string | ChatCompletionVideoObject.ChatCompletionVideoURLObject;
    }

    export namespace ChatCompletionVideoObject {
      export interface ChatCompletionVideoURLObject {
        url: string;

        detail?: string;
      }
    }

    export interface ChatCompletionFileObject {
      file: ChatCompletionFileObject.File;

      type: 'file';
    }

    export namespace ChatCompletionFileObject {
      export interface File {
        file_data?: string;

        file_id?: string;

        filename?: string;

        format?: string;
      }
    }

    export interface CacheControl {
      type: 'ephemeral';
    }
  }

  export interface ChatCompletionAssistantMessage {
    role: 'assistant';

    cache_control?: ChatCompletionAssistantMessage.CacheControl;

    content?:
      | string
      | Array<
          | ChatCompletionAssistantMessage.ChatCompletionTextObject
          | ChatCompletionAssistantMessage.ChatCompletionThinkingBlock
        >
      | null;

    function_call?: ChatCompletionAssistantMessage.FunctionCall | null;

    name?: string | null;

    reasoning_content?: string | null;

    thinking_blocks?: Array<
      | ChatCompletionAssistantMessage.ChatCompletionThinkingBlock
      | ChatCompletionAssistantMessage.ChatCompletionRedactedThinkingBlock
    > | null;

    tool_calls?: Array<ChatCompletionAssistantMessage.ToolCall> | null;
  }

  export namespace ChatCompletionAssistantMessage {
    export interface CacheControl {
      type: 'ephemeral';
    }

    export interface ChatCompletionTextObject {
      text: string;

      type: 'text';

      cache_control?: ChatCompletionTextObject.CacheControl;
    }

    export namespace ChatCompletionTextObject {
      export interface CacheControl {
        type: 'ephemeral';
      }
    }

    export interface ChatCompletionThinkingBlock {
      type: 'thinking';

      cache_control?:
        | { [key: string]: unknown }
        | ChatCompletionThinkingBlock.ChatCompletionCachedContent
        | null;

      signature?: string;

      thinking?: string;
    }

    export namespace ChatCompletionThinkingBlock {
      export interface ChatCompletionCachedContent {
        type: 'ephemeral';
      }
    }

    export interface FunctionCall {
      arguments?: string;

      name?: string | null;

      provider_specific_fields?: { [key: string]: unknown } | null;
    }

    export interface ChatCompletionThinkingBlock {
      type: 'thinking';

      cache_control?:
        | { [key: string]: unknown }
        | ChatCompletionThinkingBlock.ChatCompletionCachedContent
        | null;

      signature?: string;

      thinking?: string;
    }

    export namespace ChatCompletionThinkingBlock {
      export interface ChatCompletionCachedContent {
        type: 'ephemeral';
      }
    }

    export interface ChatCompletionRedactedThinkingBlock {
      type: 'redacted_thinking';

      cache_control?:
        | { [key: string]: unknown }
        | ChatCompletionRedactedThinkingBlock.ChatCompletionCachedContent
        | null;

      data?: string;
    }

    export namespace ChatCompletionRedactedThinkingBlock {
      export interface ChatCompletionCachedContent {
        type: 'ephemeral';
      }
    }

    export interface ToolCall {
      id: string | null;

      function: ToolCall.Function;

      type: 'function';
    }

    export namespace ToolCall {
      export interface Function {
        arguments?: string;

        name?: string | null;

        provider_specific_fields?: { [key: string]: unknown } | null;
      }
    }
  }

  export interface ChatCompletionToolMessage {
    content: string | Array<ChatCompletionToolMessage.UnionMember1>;

    role: 'tool';

    tool_call_id: string;
  }

  export namespace ChatCompletionToolMessage {
    export interface UnionMember1 {
      text: string;

      type: 'text';

      cache_control?: UnionMember1.CacheControl;
    }

    export namespace UnionMember1 {
      export interface CacheControl {
        type: 'ephemeral';
      }
    }
  }

  export interface ChatCompletionSystemMessage {
    content: string | Array<unknown>;

    role: 'system';

    cache_control?: ChatCompletionSystemMessage.CacheControl;

    name?: string;
  }

  export namespace ChatCompletionSystemMessage {
    export interface CacheControl {
      type: 'ephemeral';
    }
  }

  export interface ChatCompletionFunctionMessage {
    content: string | Array<ChatCompletionFunctionMessage.UnionMember1> | null;

    name: string;

    role: 'function';

    tool_call_id: string | null;
  }

  export namespace ChatCompletionFunctionMessage {
    export interface UnionMember1 {
      text: string;

      type: 'text';

      cache_control?: UnionMember1.CacheControl;
    }

    export namespace UnionMember1 {
      export interface CacheControl {
        type: 'ephemeral';
      }
    }
  }

  export interface ChatCompletionDeveloperMessage {
    content: string | Array<unknown>;

    role: 'developer';

    cache_control?: ChatCompletionDeveloperMessage.CacheControl;

    name?: string;
  }

  export namespace ChatCompletionDeveloperMessage {
    export interface CacheControl {
      type: 'ephemeral';
    }
  }
}

export declare namespace Chat {
  export { type ChatCompleteResponse as ChatCompleteResponse, type ChatCompleteParams as ChatCompleteParams };
}
