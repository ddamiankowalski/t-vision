import { PackageName } from './package';

export type TestRun = {
  uuid: string;
  packageName: PackageName;
  timeMs: number;
  status: 'FAILURE' | 'SUCCESS';
};

export type PackageTestRuns = {
  packageName: PackageName;
  lastRun: TestRun | null;
  allRuns: TestRun[];
  ongoing: boolean;
};
