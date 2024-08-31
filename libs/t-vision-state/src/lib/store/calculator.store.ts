import { signalStore, withState } from '@ngrx/signals';

const initialState = {
  counter: 0,
};

export const CalculatorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);
