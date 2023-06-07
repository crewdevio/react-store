import type {
  WritableState,
  Readable,
  ReadableState,
  Writable,
  Unsubscriber,
  Fn,
} from "../types";
import { get, writable, readable, derived } from "./core";
import { useEffect, useState } from "react";

const unset: symbol = Symbol();

export function useReadable<T>(store: Readable<T>): ReadableState<T> {
  const [value, set] = useState<T>(unset as unknown as T);

  useEffect(() => {
    let invalidate = store.subscribe(set);

    // prevent memory leak
    return invalidate;
  }, [store]);

  //@ts-ignore
  return { value: value === unset ? get(store) : value };
}

export function useWritable<T>(store: Writable<T>): WritableState<T> {
  const { value } = useReadable<T>(store);

  return { value: value, set: store.set, update: store.update };
}

export function useSubcriber<T>(
  store: Writable<T>,
  fn: Fn<T, void>
): Unsubscriber {
  return store.subscribe(fn);
}

export function useDerived<T>(
  store: Writable<T> | Writable<T>[],
  fn: Fn<T, T>,
  initial_value?: T
): ReadableState<T> {
  return { value: get(derived(store, fn as any, initial_value)) };
}

export type { Writable, Readable, WritableState };
export {
  get as getStore,
  writable as createWritableStore,
  readable as createReadableStore,
};
