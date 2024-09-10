import { signalStore, withHooks, withState } from '@ngrx/signals';
import { Package } from '../../types/package';
import { withMonitorMethods } from './monitor.methods';

type MonitorStoreState = {
  packages: Package[];
  isError: boolean;
  isLoading: boolean;
};

const initialState: MonitorStoreState = {
  packages: [],
  isError: false,
  isLoading: false,
};

export const MonitorStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMonitorMethods(),
  withHooks({
    onInit: (store) => {
      store.getPackages();
    },
  })
);
