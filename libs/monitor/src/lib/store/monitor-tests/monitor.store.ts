import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withMonitorMethods } from './monitor.methods';
import { TestRun } from '../../types/test-run';
import { Package } from '../../types/package';

type MonitorStoreState = {
  testRuns: TestRun[];
  packages: Package[];
};

const initialState: MonitorStoreState = {
  testRuns: [],
  packages: [],
};

export const MonitorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMonitorMethods(),
  withHooks({
    onInit: (store) => {
      store.getTestRuns();
      store.getPackages();
    },
  })
);
