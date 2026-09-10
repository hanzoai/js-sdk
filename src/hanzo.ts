// hanzoai — the Hanzo API client for TypeScript.
//
// Two halves reach a consumer through this file. `./index` is the generated
// client: 192 *Api classes and 2461 models projected from cloud's own
// openapi.yaml at the ref .spec-lock names, never hand-edited. Everything below
// it is written by hand over that client — the credential, the subject scope,
// and the six capabilities every Hanzo SDK offers in the same six words:
// budget, policy, audit, search, kb and graph.
//
//     import { Client } from 'hanzoai';
//
//     const c = new Client();                        // credentials from the environment
//     const a = await c.search.find('runbook');
//     switch (a.status) {
//       case 'ok':     use(a.value); break;
//       case 'denied': offer(a.code, a.cures); break; // a refusal is an answer
//       case 'held':   wait(a.id, a.clause); break;   // a person was asked
//     }
//
// The capabilities' types are namespaced by capability — budget.Allowance,
// search.Hit, audit.Event, graph.Fact — which is how the contract writes them
// and what keeps them clear of the generated models' 4599 names.

export * from './index';

export { Client } from './client';
export type { Options } from './client';

export * as answer from './answer';
export * as budget from './budget';
export * as policy from './policy';
export * as audit from './audit';
export * as search from './search';
export * as kb from './kb';
export * as graph from './graph';
