import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withPackagesMethods } from './packages.methods';
import { Package, PackageName, PackageStats } from '../../types/package';

type PackageStoreState = {
  packages: Package[];
  stats: (PackageStats & { packageName: PackageName })[];
};

const initialState: PackageStoreState = {
  packages: [],
  stats: [],
};

export const PackageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withPackagesMethods(),
  withHooks({
    onInit: (store) => {
      store.getPackages();
    },
  })
);
