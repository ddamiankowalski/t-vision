import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withTestRunMethods } from './test-run.methods';
import { PackageTestRuns } from '../../types/test-run';
import { inject } from '@angular/core';
import { TestRunHttpService } from './test-run-http.service';

type TestRunStoreState = {
  packageRuns: PackageTestRuns[];
};

const initialState: TestRunStoreState = {
  packageRuns: [],
};

export const TestRunStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTestRunMethods(),
  withHooks({
    onInit: (store) => {
      const httpService = inject(TestRunHttpService);
      store._handleRunStart(httpService.getTestRunStart$());
      store._handleRunEnd(httpService.getTestRunEnd$());
    },
  })
);
