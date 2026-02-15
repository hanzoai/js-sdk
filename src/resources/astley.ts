import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Astley - Structured AI data collection and labeling.
 * Captures commerce interactions, model outputs, and user feedback
 * for AI training and analytics.
 */
export class Astley extends APIResource {
  /**
   * Record a user interaction event for AI training data
   */
  recordInteraction(
    body: AstleyRecordInteractionParams,
    options?: RequestOptions,
  ): APIPromise<AstleyInteractionResponse> {
    return this._client.post('/astley/interaction', { body, ...options });
  }

  /**
   * Record multiple interaction events in batch
   */
  recordBatch(
    body: AstleyRecordBatchParams,
    options?: RequestOptions,
  ): APIPromise<AstleyBatchResponse> {
    return this._client.post('/astley/batch', { body, ...options });
  }

  /**
   * Label/annotate collected interaction data
   */
  labelData(
    body: AstleyLabelDataParams,
    options?: RequestOptions,
  ): APIPromise<AstleyLabelResponse> {
    return this._client.post('/astley/label', { body, ...options });
  }

  /**
   * Collect feedback on an AI model output
   */
  collectFeedback(
    body: AstleyCollectFeedbackParams,
    options?: RequestOptions,
  ): APIPromise<AstleyFeedbackResponse> {
    return this._client.post('/astley/feedback', { body, ...options });
  }

  /**
   * Get dataset statistics and summary
   */
  getStats(
    query?: AstleyGetStatsParams,
    options?: RequestOptions,
  ): APIPromise<AstleyStatsResponse> {
    return this._client.get('/astley/stats', { query, ...options });
  }

  /**
   * Export collected data in specified format
   */
  exportData(
    body: AstleyExportDataParams,
    options?: RequestOptions,
  ): APIPromise<AstleyExportResponse> {
    return this._client.post('/astley/export', { body, ...options });
  }

  /**
   * List interaction events with optional filters
   */
  listInteractions(
    query?: AstleyListInteractionsParams,
    options?: RequestOptions,
  ): APIPromise<AstleyInteractionListResponse> {
    return this._client.get('/astley/interactions', { query, ...options });
  }

  /**
   * Get a specific interaction by ID
   */
  getInteraction(
    interactionId: string,
    options?: RequestOptions,
  ): APIPromise<AstleyInteractionResponse> {
    return this._client.get(`/astley/interaction/${interactionId}`, options);
  }

  /**
   * List feedback entries
   */
  listFeedback(
    query?: AstleyListFeedbackParams,
    options?: RequestOptions,
  ): APIPromise<AstleyFeedbackListResponse> {
    return this._client.get('/astley/feedback', { query, ...options });
  }

  /**
   * Create or update a dataset definition
   */
  upsertDataset(
    body: AstleyUpsertDatasetParams,
    options?: RequestOptions,
  ): APIPromise<AstleyDatasetResponse> {
    return this._client.post('/astley/dataset', { body, ...options });
  }

  /**
   * List available datasets
   */
  listDatasets(
    query?: AstleyListDatasetsParams,
    options?: RequestOptions,
  ): APIPromise<AstleyDatasetListResponse> {
    return this._client.get('/astley/datasets', { query, ...options });
  }
}

// ────────────────────── Interaction types ──────────────────────

export type AstleyInteractionType =
  | 'product_view'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'purchase'
  | 'review'
  | 'feedback'
  | 'chat_message'
  | 'agent_response'
  | 'tool_call'
  | 'page_view'
  | 'click'
  | 'custom';

export interface AstleyRecordInteractionParams {
  sessionId: string;
  type: AstleyInteractionType;
  data: Record<string, unknown>;
  organizationId?: string;
  userId?: string;
  datasetId?: string;
  timestamp?: string;
  context?: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
    previousPage?: string;
    locale?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface AstleyRecordBatchParams {
  events: Array<AstleyRecordInteractionParams>;
}

export interface AstleyInteractionResponse {
  id: string;
  sessionId: string;
  type: AstleyInteractionType;
  data: Record<string, unknown>;
  organizationId?: string;
  userId?: string;
  datasetId?: string;
  timestamp: string;
  createdAt: string;
}

export type AstleyInteractionListResponse = Array<AstleyInteractionResponse>;

export interface AstleyListInteractionsParams {
  datasetId?: string;
  type?: AstleyInteractionType;
  userId?: string;
  sessionId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  count?: number;
}

// ────────────────────── Label types ──────────────────────

export interface AstleyLabelDataParams {
  interactionId: string;
  labels: Array<string>;
  category?: string;
  subcategory?: string;
  quality: 'high' | 'medium' | 'low';
  labelConfidence?: number;
  labeledBy?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface AstleyLabelResponse {
  id: string;
  interactionId: string;
  labels: Array<string>;
  category?: string;
  quality: string;
  labeledAt: string;
}

// ────────────────────── Feedback types ──────────────────────

export interface AstleyCollectFeedbackParams {
  modelOutputId: string;
  feedback: 'positive' | 'negative' | 'neutral';
  rating?: number;
  explanation?: string;
  expectedOutput?: string;
  userId?: string;
  agentId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface AstleyFeedbackResponse {
  id: string;
  modelOutputId: string;
  feedback: 'positive' | 'negative' | 'neutral';
  rating?: number;
  explanation?: string;
  recordedAt: string;
}

export type AstleyFeedbackListResponse = Array<AstleyFeedbackResponse>;

export interface AstleyListFeedbackParams {
  modelOutputId?: string;
  feedback?: 'positive' | 'negative' | 'neutral';
  userId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  count?: number;
}

// ────────────────────── Stats types ──────────────────────

export interface AstleyGetStatsParams {
  organizationId?: string;
  datasetId?: string;
  startDate?: string;
  endDate?: string;
  groupBy?: 'type' | 'category' | 'quality' | 'day' | 'week';
}

export interface AstleyStatsResponse {
  totalInteractions: number;
  totalLabeled: number;
  totalFeedback: number;
  byType: Record<string, number>;
  byQuality: Record<string, number>;
  avgRating: number;
  dateRange: { start: string; end: string };
}

// ────────────────────── Export types ──────────────────────

export interface AstleyExportDataParams {
  format: 'jsonl' | 'parquet' | 'csv';
  datasetId?: string;
  organizationId?: string;
  filters?: {
    type?: Array<AstleyInteractionType>;
    category?: Array<string>;
    quality?: Array<string>;
    dateRange?: { start: string; end: string };
    labeled?: boolean;
  };
}

export interface AstleyExportResponse {
  exportId: string;
  url: string;
  expiresAt: string;
  format: string;
  recordCount: number;
}

// ────────────────────── Dataset types ──────────────────────

export interface AstleyUpsertDatasetParams {
  name: string;
  description?: string;
  organizationId?: string;
  schema?: Record<string, unknown>;
  tags?: Array<string>;
  metadata?: Record<string, unknown>;
}

export interface AstleyDatasetResponse {
  id: string;
  name: string;
  description?: string;
  organizationId?: string;
  interactionCount: number;
  labeledCount: number;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export type AstleyDatasetListResponse = Array<AstleyDatasetResponse>;

export interface AstleyListDatasetsParams {
  organizationId?: string;
  page?: number;
  count?: number;
}

export declare namespace Astley {
  export {
    type AstleyInteractionType as AstleyInteractionType,
    type AstleyRecordInteractionParams as AstleyRecordInteractionParams,
    type AstleyRecordBatchParams as AstleyRecordBatchParams,
    type AstleyInteractionResponse as AstleyInteractionResponse,
    type AstleyInteractionListResponse as AstleyInteractionListResponse,
    type AstleyLabelDataParams as AstleyLabelDataParams,
    type AstleyLabelResponse as AstleyLabelResponse,
    type AstleyCollectFeedbackParams as AstleyCollectFeedbackParams,
    type AstleyFeedbackResponse as AstleyFeedbackResponse,
    type AstleyFeedbackListResponse as AstleyFeedbackListResponse,
    type AstleyGetStatsParams as AstleyGetStatsParams,
    type AstleyStatsResponse as AstleyStatsResponse,
    type AstleyExportDataParams as AstleyExportDataParams,
    type AstleyExportResponse as AstleyExportResponse,
    type AstleyUpsertDatasetParams as AstleyUpsertDatasetParams,
    type AstleyDatasetResponse as AstleyDatasetResponse,
    type AstleyDatasetListResponse as AstleyDatasetListResponse,
  };
}
