import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withTestRunMethods } from './test-run.methods';
import { TestRunInfo } from '../../types/test-run';
import { inject } from '@angular/core';
import { TestRunHttpService } from './test-run-http.service';

type TestRunStoreState = {
  runInfos: TestRunInfo[];
};

const initialState: TestRunStoreState = {
  runInfos: [],
};

export const TestRunStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTestRunMethods(),
  withHooks({
    onInit: () => {
      const httpService = inject(TestRunHttpService);
      httpService.getTestStart$().subscribe(x => console.log(x))

      httpService.getTestRunEnd$().subscribe(x => console.log(x))
    }
  })
);
