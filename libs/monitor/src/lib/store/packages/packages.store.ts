import { signalStore, withState } from '@ngrx/signals';
import { withPackagesMethods } from './packages.methods';
import { Package } from '../../types/package';

type PackageStoreState = {
  packages: Package[];
};

const initialState: PackageStoreState = {
  packages: [],
};

export const PackageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withPackagesMethods()
);
