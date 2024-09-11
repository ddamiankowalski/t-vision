import { signalStore, withState } from '@ngrx/signals';
import { withMonitorMethods } from './test-run.methods';
import { TestRun } from '../../types/test-run';
import { PackageName } from '../../types/package';

type TestRunStoreState = {
  lastRuns: Record<PackageName, TestRun>;
  allRuns: TestRun[];
};

const initialState: TestRunStoreState = {
  lastRuns: {},
  allRuns: [],
};

export const TestRunStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMonitorMethods()
);
