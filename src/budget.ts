// budget — what you may spend, what is left, what it cost.
//
// Allowance and money never stand in for each other: `left()` answers a count
// of free calls, `balance()` a sum of prepaid credit. A product that shows one
// where it means the other tells the customer to pay when they are not out of
// money, or lets them run out silently when they are.

import { value, type Call, type Page } from './answer';
import { bool, list, num, obj, rfc3339, str, when } from './read';

/**
 * Integer minor units. Never a float: a balance that has been through a binary
 * fraction is a balance that cannot be compared for equality with the one the
 * ledger holds.
 */
export interface Money {
  cents: number;
  /** ISO 4217. Cloud's ledger answers USD. */
  currency: string;
}

/** The free-call ceiling this period, and the moment the count starts again. */
export interface Allowance {
  /** The tier the limit came from. */
  plan: string;
  /** Calls the plan allows per period; 0 is unbounded. */
  limit: number;
  used: number;
  /** `limit - used`, absent where the limit is unbounded — not zero, which would read as spent. */
  left?: number;
  /** The subject is at the limit. */
  spent: boolean;
  /**
   * Which ceiling these numbers describe — "hour" or "day". A caller is held to
   * both and this is the one that will stop them next. Empty where no window
   * bounds the subject at all.
   */
  window: string;
  /** When that window starts again. Absent where the limit is unbounded — there is no period to end. */
  resets?: Date;
}

/** The wallet the AI gate reads before admitting a paid request. */
export interface Balance {
  available: Money;
  /** Reservations the gate is holding against in-flight requests. */
  held: Money;
  /**
   * The ledger key that was resolved — the org's shared pool, or a personal
   * account. Echoed because a client that guesses its own payer can guess wrong,
   * and money then lands in an account the gate never reads.
   */
  account: string;
}

/** What the org's plan grants. */
export interface Plan {
  /** The plan slug commerce resolved, empty where the org has no active subscription. */
  tier: string;
  /**
   * Per console app, whether the org may open it. A key is false both when the
   * plan does not grant the app and when the licence authority could not be
   * reached: a read that decides what to show fails to locked, not to an error.
   */
  apps: Record<string, boolean>;
}

/** One billed call. */
export interface Charge {
  id: string;
  at?: Date;
  /** The metered unit the debit recorded. */
  model: string;
  amount: Money;
}

/** What narrows a read of the ledger. */
export interface Filter {
  since?: Date;
  until?: Date;
  /** One product's rows — agents, inference, the provisioned kind. */
  product?: string;
}

const usd = (cents: number): Money => ({ cents, currency: 'USD' });

export class Budget {
  constructor(private readonly call: Call) {}

  /** What is left of the plan's free-call allowance this period. Reading it does not spend. */
  async left(): Promise<Allowance> {
    return value(await this.call('GET', '/v1/allowance'), (body) => {
      const b = obj(body);
      const limit = num(b['limit']);
      const used = num(b['used']);
      const resets = num(b['resets']);
      return {
        plan: str(b['plan']),
        limit,
        used,
        // Unbounded has no remainder and no period, so neither is reported.
        ...(limit > 0 ? { left: Math.max(0, limit - used) } : {}),
        spent: bool(b['spent']),
        window: str(b['window']),
        ...(limit > 0 && resets > 0 ? { resets: new Date(resets * 1000) } : {}),
      };
    });
  }

  /** Prepaid credit this caller's org can still spend. */
  async balance(): Promise<Balance> {
    return value(await this.call('GET', '/v1/billing/balance'), (body) => {
      const b = obj(body);
      return {
        available: usd(num(b['available'])),
        held: usd(num(b['holds'])),
        account: str(b['account']),
      };
    });
  }

  /** Which console apps the org may open, and the plan slug that decides it. */
  async plan(): Promise<Plan> {
    return value(await this.call('GET', '/v1/entitlement'), (body) => {
      const b = obj(body);
      const apps: Record<string, boolean> = {};
      for (const [k, v] of Object.entries(obj(b['apps']))) apps[k] = bool(v);
      return { tier: str(b['tier']), apps };
    });
  }

  /**
   * Every billed call the org made — the raw charged ledger, not a rollup.
   *
   * The document declares no response schema for this route, so the shape is
   * modelled here from what cloud's own handler writes: `{user, count, usage[]}`
   * with amounts in USD cents.
   */
  async spent(filter: Filter = {}): Promise<Page<Charge>> {
    const reply = await this.call('GET', '/v1/billing/usage', {
      query: {
        // The route reads these three; `since`/`until` are the SDK's one word
        // for a window and `start`/`end` are this route's spelling of it.
        start: rfc3339(filter.since),
        end: rfc3339(filter.until),
        product: filter.product,
      },
    });
    return value(reply, (body) => {
      const b = obj(body);
      const items = list(b['usage']).map((row) => {
        const r = obj(row);
        return {
          id: str(r['transactionId']),
          at: when(r['createdAt']),
          model: str(obj(r['metadata'])['model']),
          amount: usd(num(r['amount'])),
        };
      });
      return { items, total: 'count' in b ? num(b['count']) : items.length };
    });
  }
}
