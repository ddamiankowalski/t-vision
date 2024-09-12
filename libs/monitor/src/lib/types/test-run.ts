import { PackageName } from './package';

export type TestRun = {
  uuid: string;
  packageName: PackageName;
  timeMs: number;
};

export type TestRunInfo = {
  packageName: PackageName;
  lastRun: TestRun | null;
  allRuns: TestRun[];
};
