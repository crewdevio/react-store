export type Setter<T> = (v: T) => void;
export type UpdateFn<T> = (v: T) => T;
export type IUpdater<T> = (u: UpdateFn<T>) => void;

export interface ReadableState<T> {
  value: T;
}

export interface WritableState<T> extends ReadableState<T> {
  update: IUpdater<T>;
  set: Setter<T>;
}

export type Fn<T, S> = (value: T) => S;

/** Callback to inform of a value updates. */
export type Subscriber<T> = (value: T) => void;

/** Unsubscribes from value updates. */
export type Unsubscriber = () => void;

/** Callback to update a value. */
export type Updater<T> = (value: T) => T;

/** Cleanup logic callback. */
export type Invalidator<T> = (value?: T) => void;

/** Start and stop notification callbacks. */
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;

/** Readable interface for subscribing. */
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(
    this: void,
    run: Subscriber<T>,
    invalidate?: Invalidator<T>
  ): Unsubscriber;
}

/** Writable interface for both updating and subscribing. */
export interface Writable<T> extends Readable<T> {
  /**
   * Set value and inform subscribers.
   * @param value to set
   */
  set(this: void, value: T): void;

  /**
   * Update value using callback and inform subscribers.
   * @param updater callback
   */
  update(this: void, updater: Updater<T>): void;
}

/** Pair of subscriber and invalidator. */
export type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>];

/** One or more `Readable`s. */
export type Stores =
  | Readable<any>
  | [Readable<any>, ...Array<Readable<any>>]
  | Array<Readable<any>>;

/** One or more values from `Readable` stores. */
export type StoresValues<T> = T extends Readable<infer U>
  ? U
  : { [K in keyof T]: T[K] extends Readable<infer U> ? U : never };
