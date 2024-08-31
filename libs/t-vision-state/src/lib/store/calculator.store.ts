import { computed, effect } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const initialState = {
  counter: 0,
  isLoading: false,
  _counter: 0,
  counterInfo: {
    isPristine: false,
  },
};

export const withLogger = (name: string) => {
  return signalStoreFeature(
    withHooks({
      onInit: (store) => {
        // watchState(store, (state) => {
        //   console.log('[watchState] counter state', state);
        // });

        /**
         * Destroys the watch state when we want
         * const { destroy } = watchState(store, () => { });
         */

        effect(() => {
          const state = getState(store);
          console.log(`[${name}] counter state`, state);
        });
      },
    })
  );
};

export const CalculatorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLogger('counter'),
  withComputed(({ counter }) => ({
    isLot: computed(() => counter() > 10),
  })),
  withMethods((store) => ({
    increment: async () => {
      patchState(store, (state) => ({ ...state, isLoading: true }));
      const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });

      await promise;
      patchState(store, (state) => ({
        ...state,
        counter: store.counter() + 1,
        isLoading: false,
      }));
    },
    decrement: async () => {
      patchState(store, (state) => ({ ...state, isLoading: true }));
      const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });

      await promise;
      patchState(store, (state) => ({
        ...state,
        counter: store.counter() - 1,
        isLoading: false,
      }));
    },
  }))
);
