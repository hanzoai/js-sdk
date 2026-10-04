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
// throw them from the error path they already had — the generated client's
// axios adapter (transport.ts) and the six capabilities' Fault (answer.ts) —
// through `limited`, the one place a body becomes one of these.

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
  /** What the transport raised: the AxiosError, or nothing on the fetch path. */
  readonly cause: unknown;

  constructor(status: number, error: Obj, cause?: unknown) {
    const code = text(error['code']) ?? '';
    super(text(error['message']) ?? `HTTP ${status} ${code}`);
    this.name = new.target.name;
    this.status = status;
    this.code = code;
    this.type = text(error['type']);
    this.usageClass = text(error['class']);
    this.model = text(error['model']);
    this.fallback = text(error['fallback']);
    this.resetsAt = instant(error['resets_at']);
    this.upgradeUrl = text(error['upgrade_url']);
    this.actions = list(error['actions']).map((a) => {
      const o = obj(a);
      const out: UsageAction = { kind: text(o['kind']) ?? '' };
      for (const k of ['label', 'url', 'plan', 'model'] as const) {
        const v = text(o[k]);
        if (v !== undefined) out[k] = v;
      }
      return out;
    });
    this.cause = cause;
  }
}

/** 402 `plan_allowance_used` — the plan's included usage of the class is used, and nothing else may pay. */
export class PlanAllowanceUsedError extends UsageLimitError {}

/** 402 `paid_plan_required` — the model needs a paid plan or prepaid balance. */
export class PaidPlanRequiredError extends UsageLimitError {}

/** 429 `free_plan_cap` — the free plan's daily cap on the model is used; it lifts at `resetsAt`. */
export class FreePlanCapError extends UsageLimitError {}

/** 402 `model_cap` — the model has used its share of the plan; `fallback` answers instead. */
export class ModelCapError extends UsageLimitError {}

/** 429 `usage_cap_exceeded` — a session or day request window is spent. */
export class UsageCapExceededError extends UsageLimitError {}

/** 402 `insufficient_balance` — the known wallet balance cannot cover the request. */
export class InsufficientBalanceError extends UsageLimitError {}

const classes: Record<string, new (status: number, error: Obj, cause?: unknown) => UsageLimitError> = {
  plan_allowance_used: PlanAllowanceUsedError,
  paid_plan_required: PaidPlanRequiredError,
  free_plan_cap: FreePlanCapError,
  model_cap: ModelCapError,
  usage_cap_exceeded: UsageCapExceededError,
  insufficient_balance: InsufficientBalanceError,
};

/**
 * The typed error a refusal body names, or undefined where `error.code` is none
 * of the six — that answer stays whatever error its transport already raises.
 */
export function limited(status: number, body: unknown, cause?: unknown): UsageLimitError | undefined {
  const error = obj(obj(body)['error']);
  const Class = classes[text(error['code']) ?? ''];
  return Class ? new Class(status, error, cause) : undefined;
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
  const h = headers ?? {};
  const get =
    typeof (h as { get?: unknown }).get === 'function'
      ? (name: string) => (h as { get(name: string): unknown }).get(name)
      : (() => {
          const lower: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(h)) lower[k.toLowerCase()] = v;
          return (name: string) => lower[name];
        })();
  const read = (name: string): string | undefined => {
    let v = get(name);
    if (Array.isArray(v)) v = v[0];
    if (typeof v === 'number' || typeof v === 'boolean') v = String(v);
    return typeof v === 'string' ? text(v.trim()) : undefined;
  };
  return {
    usage: read('x-hanzo-usage'),
    usageClass: read('x-hanzo-usage-class'),
    paidBy: read('x-hanzo-paid-by'),
    fallback: read('x-hanzo-fallback'),
    served: read('x-hanzo-served'),
    reason: read('x-hanzo-usage-reason'),
  };
}
