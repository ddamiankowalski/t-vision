import { signalStore, withState } from '@ngrx/signals';
import { withTestRunMethods } from './test-run.methods';
import { TestRunInfo } from '../../types/test-run';

type TestRunStoreState = {
  runInfos: TestRunInfo[];
};

const initialState: TestRunStoreState = {
  runInfos: [],
};

export const TestRunStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTestRunMethods()
);
