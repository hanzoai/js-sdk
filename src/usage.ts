// usage — how a priced request was paid for, and the refusals when it cannot be.
//
// Every AI answer says where the caller's plan stands in six headers, never a
// figure: X-Hanzo-Usage (ok | near | limited), -Usage-Class (premium | ours |
// free), -Paid-By (plan | credits | free), -Fallback (the model that answered
// instead), -Served (the Hanzo SKU that answered) and -Usage-Reason (the refusal
// code that caused a fallback). `readUsage` reads them off whatever headers the
// caller holds.
//
// A request nothing may pay for is refused in the OpenAI envelope,
//
//   {"error": {"message", "type", "code", "class"?, "model"?, "fallback"?,
//              "resets_at"?, "upgrade_url"?, "actions"?}}
//
// and six codes in it are six different facts with six different ways out, so
// each is a class: a caller tells them apart with `instanceof`, never by parsing
// the sentence. The names are the Python and Go SDKs' names. Both transports
// throw them from the error path they already had — an axios response
// interceptor for the generated client (transport.ts) and the six capabilities'
// Fault (answer.ts) — through `limited`, the one place a body becomes one.

import { list, obj, type Obj } from './read';

/** One way out of a usage refusal, in the order to offer them. */
export interface UsageAction {
  /** upgrade | switch | credits | topup. */
  kind: string;
  /** The words to put on the button. */
  label?: string;
  /** Where to go: the pay page, or `/v1/ai/limits` for "continue with credits". */
  url?: string;
  /** The plan an `upgrade` moves to. */
  plan?: string;
  /** The model a `switch` moves to. */
  model?: string;
}

/** A string the server sent, or undefined where it sent none — never "". */
const text = (v: unknown): string | undefined => (typeof v === 'string' && v !== '' ? v : undefined);

/** An RFC 3339 instant, or undefined where none was sent or it does not parse. */
const instant = (v: unknown): Date | undefined => {
  const s = text(v);
  if (!s) return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

/** A priced request refused because nothing the caller holds may pay for it. */
export class UsageLimitError extends Error {
  // Literal, not `new.target.name`, which a minifier renames.
  override name = 'UsageLimitError';
  /** 402 or 429. */
  readonly status: number;
  /** The machine code — one per subclass. */
  readonly code: string;
  /** `billing_error` or `rate_limit_error`. */
  readonly type: string | undefined;
  /** The class of usage refused: premium, ours or free. */
  readonly usageClass: string | undefined;
  /** The model the refusal is about. */
  readonly model: string | undefined;
  /** The model that answers instead, where there is one. */
  readonly fallback: string | undefined;
  /** When the refusal lifts by itself. */
  readonly resetsAt: Date | undefined;
  /** The upgrade page. */
  readonly upgradeUrl: string | undefined;
  readonly actions: UsageAction[];
  /** `x-request-id` — the handle that finds this call in the audit trail. */
  readonly request: string | undefined;
  /** What the transport raised: the AxiosError on the generated client, nothing on the six. */
  readonly cause: unknown;

  constructor(status: number, error: Obj, request?: string, cause?: unknown) {
    const code = text(error['code']) ?? '';
    super(text(error['message']) ?? `HTTP ${status} ${code}`);
    this.status = status;
    this.code = code;
    this.type = text(error['type']);
    this.usageClass = text(error['class']);
    this.model = text(error['model']);
    this.fallback = text(error['fallback']);
    this.resetsAt = instant(error['resets_at']);
    this.upgradeUrl = text(error['upgrade_url']);
    // An entry with no kind is not an action, so it is not offered.
    this.actions = list(error['actions']).flatMap((a) => {
      const o = obj(a);
      const kind = text(o['kind']);
      if (!kind) return [];
      const out: UsageAction = { kind };
      for (const k of ['label', 'url', 'plan', 'model'] as const) {
        const v = text(o[k]);
        if (v !== undefined) out[k] = v;
      }
      return [out];
    });
    this.request = request;
    this.cause = cause;
  }
}

/** 402 `plan_allowance_used` — the plan's included usage of the class is used, and nothing else may pay. */
export class PlanAllowanceUsedError extends UsageLimitError {
  override name = 'PlanAllowanceUsedError';
}

/** 402 `paid_plan_required` — the model needs a paid plan or prepaid balance. */
export class PaidPlanRequiredError extends UsageLimitError {
  override name = 'PaidPlanRequiredError';
}

/** 429 `free_plan_cap` — the free plan's daily cap on the model is used; it lifts at `resetsAt`. */
export class FreePlanCapError extends UsageLimitError {
  override name = 'FreePlanCapError';
}

/** 402 `model_cap` — the model has used its share of the plan; `fallback` answers instead. */
export class ModelCapError extends UsageLimitError {
  override name = 'ModelCapError';
}

/** 429 `usage_cap_exceeded` — a session or day request window is spent. */
export class UsageCapExceededError extends UsageLimitError {
  override name = 'UsageCapExceededError';
}

/** 402 `insufficient_balance` — the known wallet balance cannot cover the request. */
export class InsufficientBalanceError extends UsageLimitError {
  override name = 'InsufficientBalanceError';
}

// A Map, not an object literal: a code of "constructor" must find nothing.
const classes = new Map<string, new (status: number, error: Obj, request?: string, cause?: unknown) => UsageLimitError>([
  ['plan_allowance_used', PlanAllowanceUsedError],
  ['paid_plan_required', PaidPlanRequiredError],
  ['free_plan_cap', FreePlanCapError],
  ['model_cap', ModelCapError],
  ['usage_cap_exceeded', UsageCapExceededError],
  ['insufficient_balance', InsufficientBalanceError],
]);

/**
 * The typed error a refusal names, or undefined: only a 402 or 429 whose
 * `error.code` is one of the six is one. Anything else stays whatever error its
 * transport already raises.
 */
export function limited(status: number, body: unknown, request?: string, cause?: unknown): UsageLimitError | undefined {
  if (status !== 402 && status !== 429) return undefined;
  const error = obj(obj(body)['error']);
  const Class = classes.get(text(error['code']) ?? '');
  return Class ? new Class(status, error, request, cause) : undefined;
}

/** What the X-Hanzo-* headers on one answer say. Each is undefined where the header is absent. */
export interface Usage {
  /** X-Hanzo-Usage: ok | near | limited — where the class stands. */
  usage: string | undefined;
  /** X-Hanzo-Usage-Class: premium | ours | free. */
  usageClass: string | undefined;
  /** X-Hanzo-Paid-By: plan | credits | free. Prepaid and granted credit both read `credits`. */
  paidBy: string | undefined;
  /** X-Hanzo-Fallback: the model that answered instead (limited mode). */
  fallback: string | undefined;
  /** X-Hanzo-Served: the Hanzo SKU that answered. */
  served: string | undefined;
  /** X-Hanzo-Usage-Reason: the refusal code that caused a fallback. */
  reason: string | undefined;
}

/** A fetch `Headers`, axios's `AxiosHeaders`, or any record of header name to value. */
export type HeaderSource = { get(name: string): unknown } | Record<string, unknown>;

/**
 * Read the usage headers off one answer: `readUsage(res.headers)` for an axios
 * response or a fetch Response alike. Names match case-insensitively. A header
 * that is absent, or present and empty, reads undefined — never 0 or "", which
 * would claim the server said something it did not.
 */
export function readUsage(headers: HeaderSource | null | undefined): Usage {
  return {
    usage: header(headers, 'x-hanzo-usage'),
    usageClass: header(headers, 'x-hanzo-usage-class'),
    paidBy: header(headers, 'x-hanzo-paid-by'),
    fallback: header(headers, 'x-hanzo-fallback'),
    served: header(headers, 'x-hanzo-served'),
    reason: header(headers, 'x-hanzo-usage-reason'),
  };
}

/** One header by lower-case name, matched case-insensitively; undefined where absent or empty. */
export function header(headers: HeaderSource | null | undefined, name: string): string | undefined {
  const h = headers ?? {};
  let v: unknown;
  if (typeof (h as { get?: unknown }).get === 'function') {
    v = (h as { get(name: string): unknown }).get(name);
  } else {
    for (const [k, value] of Object.entries(h)) if (k.toLowerCase() === name) v = value;
  }
  if (Array.isArray(v)) v = v[0];
  if (typeof v === 'number' || typeof v === 'boolean') v = String(v);
  return typeof v === 'string' ? text(v.trim()) : undefined;
}
