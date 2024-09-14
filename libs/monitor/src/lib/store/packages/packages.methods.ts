import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap } from 'rxjs';
import { PackagesHttpService } from './packages-http.service';
import { Package, PackageName, PackageStats } from '../../types/package';

export const withPackagesMethods = () =>
  signalStoreFeature(
    {
      state: type<{
        stats: (PackageStats & { packageName: PackageName })[];
        packages: Package[];
      }>(),
    },
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

      /**
       * Finds for existing stats by uuid or returns null otherwise.
       *
       * @param uuid
       * @returns
       */
      const _existingStats = (uuid: string): PackageStats | null => {
        return store.stats().find((stat) => stat.uuid === uuid) || null;
      };

      /**
       * Updates the package statistics to the store.
       */
      const getStats = rxMethod<PackageName>(
        pipe(
          mergeMap((packageName) =>
            httpService.getPackageStats(packageName).pipe(
              tapResponse({
                next: (newStats) => {
                  const existing = _existingStats(newStats.uuid);
                  if (!existing) {
                    patchState(store, {
                      stats: [...store.stats(), { ...newStats, packageName }],
                    });
                  } else {
                    patchState(store, {
                      stats: store
                        .stats()
                        .map((stat) =>
                          stat.uuid === newStats.uuid
                            ? { ...newStats, packageName }
                            : stat
                        ),
                    });
                  }
                },
                error: (err) => console.error(err),
              })
            )
          )
        )
      );

      return {
        getPackages,
        getStats,
      };
    })
  );
