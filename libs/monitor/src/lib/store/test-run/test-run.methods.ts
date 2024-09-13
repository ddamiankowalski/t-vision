import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withMethods,
  type,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe } from 'rxjs';
import { TestRunHttpService } from './test-run-http.service';
import { tapResponse } from '@ngrx/operators';
import { TestRun, TestRunInfo } from '../../types/test-run';
import { PackageName } from '../../types/package';

export const withTestRunMethods = () =>
  signalStoreFeature(
    {
      state: type<{ runInfos: TestRunInfo[] }>(),
    },
    withMethods((store, httpService = inject(TestRunHttpService)) => {
      /**
       * Utility function that checks whether package exists.
       *
       * @param name
       * @returns
       */
      const _packageExists = (name: PackageName): TestRunInfo | null => {
        return (
          store.runInfos().find((info) => info.packageName === name) || null
        );
      };



      /**
       * Utirily method that replaces last run for a given package name to either a run or null.
       *
       * @param packageName
       * @param lastRun
       */
      const _replaceLastRun = (
        packageName: PackageName,
        lastRun: TestRun | null
      ): void => {
        const existing = _packageExists(packageName);
        const runs = store.runInfos();
        patchState(store, {
          runInfos: [
            ...runs.filter((info) => info.packageName !== packageName),
            existing
              ? { ...existing, lastRun }
              : {
                packageName,
                lastRun,
                allRuns: [],
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
        getLastTestRun
      };
    })
  );
