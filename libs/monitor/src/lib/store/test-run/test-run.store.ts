import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withMonitorMethods } from './test-run.methods';
import { TestRun } from '../../types/test-run';
import { Package } from '../../types/package';

type TestRunStoreState = {
  testRuns: TestRun[];
  packages: Package[];
};

const initialState: TestRunStoreState = {
  testRuns: [],
  packages: [],
};

export const TestRunStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMonitorMethods(),
  withHooks({
    onInit: (store) => {
      store.getTestRuns();
    },
  })
);
