import { PackageName } from './package';

export type TestRun = {
  uuid: string;
  packageName: PackageName;
  timeMs: number;
};
