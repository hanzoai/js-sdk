// Narrowing a JSON body that arrived as `unknown`.
//
// Several of the routes the six capabilities call publish no response schema,
// and the ones that do can outgrow it between a cloud release and a regenerated
// client, so every field is read rather than asserted. One accessor per JSON
// type, each answering the empty value: a field the server did not send is a
// fact about the answer, not a fault to throw at the caller.
//
// Nothing here reaches the package surface — it is how the six read, not
// something they hand back.

export type Obj = Record<string, unknown>;

export const obj = (v: unknown): Obj =>
  typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Obj) : {};

export const str = (v: unknown): string => (typeof v === 'string' ? v : '');

export const num = (v: unknown): number =>
  typeof v === 'number' && Number.isFinite(v) ? v : 0;

export const bool = (v: unknown): boolean => v === true;

export const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

/** An instant the server sent as RFC 3339, or undefined where it sent none. */
export const when = (v: unknown): Date | undefined => {
  if (typeof v !== 'string' || v === '') return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

/**
 * An instant a stored row always carries. Invalid where the server sent none,
 * which no stored row does — and an Invalid Date can never be mistaken for a
 * real one, where a substituted epoch reads as 1970.
 */
export const instant = (v: unknown): Date => when(v) ?? new Date(NaN);

/**
 * RFC 3339 — the one spelling of an instant on this wire. An instant that is not
 * one is left off the request, so the server says what is wrong with it rather
 * than the client throwing "Invalid time value" three frames from the caller.
 */
export const rfc3339 = (d: Date | undefined): string | undefined =>
  d && !Number.isNaN(d.getTime()) ? d.toISOString() : undefined;
