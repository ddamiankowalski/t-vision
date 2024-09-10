import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { MonitorTestsHttpService } from './monitor-tests-http.service';
import { tapResponse } from '@ngrx/operators';

export const withMonitorTestsMethods = () =>
  signalStoreFeature(
    withMethods((store, httpService = inject(MonitorTestsHttpService)) => {
      /**
       * Retrieves all packages from the backend and saves them inside the store.
       */
      const getPackages = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => httpService.getPackages()),
          tapResponse({
            next: (packages) => patchState(store, { packages }),
            error: () => patchState(store, { isError: true }),
            finalize: () => patchState(store, { isLoading: false }),
          })
        )
      );

      return {
        getPackages,
      };
    })
  );
