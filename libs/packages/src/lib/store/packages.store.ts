import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type PackagesStoreState = {
  jobs: string[];
};

const initialState: PackagesStoreState = {
  jobs: [],
};

export const PackagesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    return {
      fetchPackages() {
        patchState();
      },
    };
  })
);
