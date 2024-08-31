import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const initialState = {
  counter: 0,
  counterInfo: {
    isPristine: false,
  },
};

export const CalculatorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ counter }) => ({
    isLot: computed(() => counter() > 10),
  })),
  withMethods((store) => ({
    increment: () => {
      patchState(store, { counter: store.counter() + 1 });
    },
    decrement: () => {
      patchState(store, { counter: store.counter() - 1 });
    },
  })),
  withHooks({
    onInit: (store) => {
      watchState(store, (state) => {
        console.log('[watchState] counter state', state);
      });

      effect(() => {
        console.log('[effect] counter state', store.counter());
      });

      store.increment();
      store.increment();
    },
  })
);
