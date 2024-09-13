import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withMethods,
  type,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, tap } from 'rxjs';
import { TestRunHttpService } from './test-run-http.service';
import { tapResponse } from '@ngrx/operators';
import { TestRun, PackageTestRuns } from '../../types/test-run';
import { PackageName } from '../../types/package';

export const withTestRunMethods = () =>
  signalStoreFeature(
    {
      state: type<{ packageRuns: PackageTestRuns[] }>(),
    },
    withMethods((store, httpService = inject(TestRunHttpService)) => {
      /**
       *
       */
      const _handleRunStart = rxMethod<string>(
        pipe(tap((packageName) => _setPackageOngoing(packageName, true)))
      );

      /**
       * Handles the state when the given test run is finished.
       */
      const _handleRunEnd = rxMethod<TestRun>(
        pipe(
          tap((testRun) => {
            _replaceLastRun(testRun.packageName, testRun);
            _setPackageOngoing(testRun.packageName, false);
          })
        )
      );

      /**
       * Utility function that checks whether package exists.
       *
       * @param name
       * @returns
       */
      const _packageExists = (name: PackageName): PackageTestRuns | null => {
        return (
          store.packageRuns().find((info) => info.packageName === name) || null
        );
      };

      /**
       * Utility function that sets a package run as ongoing or not.
       *
       * @param packageName
       * @param ongoing
       */
      const _setPackageOngoing = (
        packageName: string,
        ongoing: boolean
      ): void => {
        patchState(store, {
          packageRuns: store
            .packageRuns()
            .map((run) =>
              run.packageName === packageName ? { ...run, ongoing } : run
            ),
        });
      };

      /**
       * Utility method that replaces last run for a given package name to either a run or null.
       *
       * @param packageName
       * @param lastRun
       */
      const _replaceLastRun = (
        packageName: PackageName,
        lastRun: TestRun | null
      ): void => {
        const existing = _packageExists(packageName);
        const runs = store.packageRuns();
        patchState(store, {
          packageRuns: [
            ...runs.filter((info) => info.packageName !== packageName),
            existing
              ? { ...existing, lastRun }
              : {
                  packageName,
                  lastRun,
                  allRuns: [],
                  ongoing: false,
                },
          ],
        });
      };

      /**
       * Retrieves last successful test run for a specific package name and
       * sets it to the store.
       */
      const getLastTestRun = rxMethod<string>(
        pipe(
          mergeMap((packageName) =>
            httpService.getLastTestRun(packageName).pipe(
              tapResponse({
                next: (run) => _replaceLastRun(packageName, run),
                error: () => _replaceLastRun(packageName, null),
              })
            )
          )
        )
      );

      return {
        getLastTestRun,
        _handleRunStart,
        _handleRunEnd,
      };
    })
  );
