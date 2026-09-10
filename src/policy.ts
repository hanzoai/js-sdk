// policy — may this subject take this action on this object.
//
// Policy appears twice and both must speak one vocabulary. Before a call,
// `check` answers `allow` as a value. During a call, a request the engine stops
// comes back as `denied{code: "policy_denied"}` or `held{clause}` — and
// `held.clause` names the same clause this check would have refused on, so a
// caller can tell which of its own checks it should have run.

import { value, type Call } from './answer';
// `obj` is aliased so the third argument can carry the contract's own word.
import { bool, obj as fields, str } from './read';

/** A verdict, with the question beside it. */
export interface Decision {
  allow: boolean;
  /** Who was asking. */
  sub: string;
  /** What they wanted to do. */
  act: string;
  /** What they wanted to do it to. */
  obj: string;
  /**
   * Why. Empty until cloud fills it — a denial with no reason is a dead end
   * with a boolean on it.
   */
  reason: string;
}

export class Policy {
  constructor(private readonly call: Call) {}

  /**
   * Ask one policy question against the caller's own org policy set.
   *
   * The arguments read in the order the sentence does — subject, verb, object.
   * `obj` is an org-rooted resource path; a path outside the caller's org is
   * refused rather than decided.
   *
   * The route publishes neither a request body nor a response in the document,
   * so every generator emits a method that takes nothing and returns nothing.
   * This is written against the shape the served handler reads, measured:
   * `{subject, verb, path}` in, `{allow, subject, verb, path}` back. The words
   * the caller says are the contract's; the words on the wire are this route's.
   */
  async check(sub: string, act: string, obj: string): Promise<Decision> {
    const reply = await this.call('POST', '/v1/authz/check', {
      body: { subject: sub, verb: act, path: obj },
    });
    return value(reply, (body) => {
      const b = fields(body);
      return {
        allow: bool(b['allow']),
        sub: str(b['subject']) || sub,
        act: str(b['verb']) || act,
        obj: str(b['path']) || obj,
        reason: str(b['reason']),
      };
    });
  }
}
