import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { MonitorHttpService } from './monitor-http.service';
import { tapResponse } from '@ngrx/operators';

export const withMonitorMethods = () =>
  signalStoreFeature(
    withMethods((store, httpService = inject(MonitorHttpService)) => {
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

      /**
       * Retrieves all packages from the backend and saves them inside the store.
       */
      const getPackages = rxMethod<void>(
        pipe(
          switchMap(() => httpService.getPackages()),
          tapResponse({
            next: (packages) => patchState(store, { packages }),
            error: () => patchState(store, { packages: [] }),
          })
        )
      );

      return {
        getTestRuns,
        getPackages,
      };
    })
  );
