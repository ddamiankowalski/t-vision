import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withMonitorMethods } from './monitor.methods';
import { TestRun } from '../../types/test-run';

type MonitorStoreState = {
  testRuns: TestRun[];
  isError: boolean;
  isLoading: boolean;
};

const initialState: MonitorStoreState = {
  testRuns: [],
  isError: false,
  isLoading: false,
};

export const MonitorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMonitorMethods(),
  withHooks({
    onInit: (store) => {
      store.getPackages();
    },
  })
);
