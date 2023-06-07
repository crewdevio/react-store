## What is react-store-js?

react-store-js is a state management library for react based on [svelte/store](https://github.com/sveltejs/svelte/tree/master/src/runtime/store) but adapted to the philosophy of react.

### Instalation

```console
npm i react-store-js
```

### How to use:

to use react-state-js is very simple, just initialize your global state and then import it in your component, to mutate/update the state you can use the different hooks

example: `counter.store.ts`

```ts
import { createWritableStore } from "react-store-js";

export const counter = createWritableStore(0);
```

on: `App.tsx`

```tsx
import { useWritable } from "react-store-js";
import { counter } from "./counter.store";

export default function App() {
  const $counter = useWritable(counter);

  return (
    <div>
      <button onClick={() => $counter.update(($counter) => $counter + 1)}>
        count is {$counter.value}
      </button>
    </div>
  );
}
```

> **Note**: react-store-js is fully type-safe and typed, and generics can be used

---

### Methods:

- `createWritableStore(initialState, StartStopNotifier?)`: creates a state that can be fined and read

`example`:

```ts
export const counter = createWritableStore(0);
```

---

- `createReadableStore(initialState, StartStopNotifier?)`: creates a state that can only be read

`example`:

```ts
export const counter = createReadableStore(0);
```

---

- `getStore(state)`: gets the state directly, works with read-only states as well as mutable states

`example`:

```ts
export const counter = createWritableStore(0);

const value = getStore(couter); // return 0
```

---

### Hooks:

- `useWritable(state)`: can be used to mutate, update, and read state

`example`:

```ts
// initialize store
const counter = createWritableStore(0);

// use store
const $counter = useWritable(counter);

// mutate the state directly
$counter.set(0);

// update the current state
$counter.update(($counter) => $counter + 1);

// get actual state
$counter.value;
```

---

- `useReadable(state)`: used to read the read-only state

`example`:

```ts
// initialize store
export const now = createReadableStore(Date.now());

const $now = useReadable(now);

// get actual state
$now.value;
```

---

- `useDerived(state | state[], callback, initialState?)`: create a state whose value is based on the value of one or more other states

`example`:

```ts
// initialize store
const counter = createWritableStore(0);

const $double = useDerived(counter, ($couter) => $counter * 2, 10);

$double.value;
```

---

- `useSubcriber(state, callback)`: used to listen for changes in state when the state changes

`example`:

```ts
const counter = createWritableStore(0);

const $counter = useWritable(counter);

$counter.update(($counter) => $counter + 1);

useEffect(() => {
  const unsubcribe = useSubcriber(counter, ($counter) => {
    console.log($counter); // 1
  });

  // stop listening when component disconnects
  return unsubcribe;
}, []);
```

---

### Advances examples:

`createReadableStore` with inside mutation:

on: `time.store.ts`

```ts
export const time = createReadableStore(0, (set) => {
  const a = setInterval(() => set(Date.now()), 1000);

  return () => clearInterval(a);
});
```

`createWritableStore` with inside mutation:

on: `time.store.ts`

```ts
export const time = createWritableStore(0, (set) => {
  const a = setInterval(() => set(Date.now()), 1000);

  return () => clearInterval(a);
});
```
