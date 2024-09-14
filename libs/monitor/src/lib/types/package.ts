export type Package = {
  uuid: string;
  packageName: PackageName;
  createdAt: string;
};

export type PackageStats = {
  uuid: string;
  averageTime: number;
  runQuantity: number;
  lastTime: number;
};

export type PackageName = string;
