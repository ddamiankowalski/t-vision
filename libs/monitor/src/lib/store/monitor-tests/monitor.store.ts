import { signalStore, withState } from '@ngrx/signals';
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
  withState(initialState),
  withMonitorMethods()
);
