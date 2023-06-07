import type { Readable } from "../types";

export function noop() {}

export function run(fn: () => void) {
  return fn();
}

export function run_all(fns: any[]) {
  fns.forEach(run);
}

export function is_function(thing: any): thing is Function {
  return typeof thing === "function";
}

export function safe_not_equal(a: any, b: any) {
  return a != a
    ? b == b
    : a !== b || (a && typeof a === "object") || typeof a === "function";
}

export function validate_store(store: any, name: string) {
  if (store != null && typeof store.subscribe !== "function") {
    throw new Error(`'${name}' is not a store with a 'subscribe' method`);
  }
}

export function subscribe(store: any, ...callbacks: any) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

export function get_store_value<T>(store: Readable<T>): T {
  let value;

  subscribe(store, (_: any) => (value = _))();

  return value as unknown as T;
}
