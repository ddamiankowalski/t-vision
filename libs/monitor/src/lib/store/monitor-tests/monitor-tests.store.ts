import { signalStore, withState } from '@ngrx/signals';
import { Package } from '../../types/package';
import { withMonitorTestsMethods } from './monitor-tests.methods';

type MonitorTestsStoreState = {
  packages: Package[];
  isError: boolean;
  isLoading: boolean;
};

const initialState: MonitorTestsStoreState = {
  packages: [],
  isError: false,
  isLoading: false,
};

export const MonitorTestsStore = signalStore(
  withState(initialState),
  withMonitorTestsMethods()
);
