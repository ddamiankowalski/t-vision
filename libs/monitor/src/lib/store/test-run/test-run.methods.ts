import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { TestRunHttpService } from './test-run-http.service';
import { tapResponse } from '@ngrx/operators';

export const withMonitorMethods = () =>
  signalStoreFeature(
    withMethods((store, httpService = inject(TestRunHttpService)) => {
      /**
       * Retrieves all test runs from the backend and saves them inside the store.
       */
      const getTestRuns = rxMethod<void>(
        pipe(
          switchMap(() => httpService.getTestRuns()),
          tapResponse({
            next: (testRuns) => patchState(store, { testRuns }),
            error: () => patchState(store, { testRuns: [] }),
          })
        )
      );

      return {
        getTestRuns,
      };
    })
  );
