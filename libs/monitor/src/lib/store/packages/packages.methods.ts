import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { PackagesHttpService } from './packages-http.service';

export const withPackagesMethods = () =>
  signalStoreFeature(
    withMethods((store, httpService = inject(PackagesHttpService)) => {
      /**
       * Retrieves all packages from the backend and saves them inside the store.
       */
      const getPackages = rxMethod<void>(
        pipe(
          switchMap(() =>
            httpService.getPackages().pipe(
              tapResponse({
                next: (packages) => patchState(store, { packages }),
                error: () => patchState(store, {}),
              })
            )
          )
        )
      );

      return {
        getPackages,
      };
    })
  );
