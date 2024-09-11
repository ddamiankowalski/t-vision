import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withMethods,
  type,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, switchMap } from 'rxjs';
import { TestRunHttpService } from './test-run-http.service';
import { tapResponse } from '@ngrx/operators';
import { TestRun } from '../../types/test-run';

export const withMonitorMethods = () =>
  signalStoreFeature(
    {
      state: type<{ lastRuns: Record<string, TestRun>; allRuns: TestRun[] }>(),
    },
    withMethods((store, httpService = inject(TestRunHttpService)) => {
      /**
       * Retrieves all test runs from the backend and saves them inside the store.
       */
      const getTestRuns = rxMethod<void>(
        pipe(
          switchMap(() => httpService.getTestRuns()),
          tapResponse({
            next: (allRuns) => patchState(store, { allRuns }),
            error: () => patchState(store, { allRuns: [] }),
          })
        )
      );

      /**
       * Retrieves last successful test run for a specific package name and
       * sets it to the store.
       */
      const getLastTestRun = rxMethod<string>(
        pipe(
          concatMap((packageName) => httpService.getLastTestRun(packageName)),
          tapResponse({
            next: (lastRun) =>
              patchState(store, {
                lastRuns: {
                  ...store.lastRuns(),
                  [lastRun.packageName]: lastRun,
                },
              }),
            error: (err) => console.error(err),
          })
        )
      );

      return {
        getTestRuns,
        getLastTestRun,
      };
    })
  );
