import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { PackageStats } from './entities/package-stats.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private _packageRepository: Repository<Package>,
    @InjectRepository(PackageStats)
    private _packageStatsRepository: Repository<PackageStats>
  ) {}

  public async getPackageStats(packageName: string): Promise<PackageStats> {
    const testPackage = await this._packageRepository.findOne({
      relations: { packageStats: true },
      where: { packageName },
    });

    return testPackage.packageStats;
  }

  public async getPackages(): Promise<Package[]> {
    return this._packageRepository.find();
  }

  public async addPackage(name: string): Promise<Package> {
    const isDuplicate = await this._checkDuplicate(name);

    if (!isDuplicate) {
      const testPackage = await this._packageRepository.save({
        packageName: name,
      });
      await this._createStats(testPackage);
      return testPackage;
    }
  }

  public async updateAverageTime(
    packageName: string,
    timeMs: number
  ): Promise<void> {
    const testPackage = await this._packageRepository.findOne({
      where: { packageName },
      relations: { packageStats: true },
    });

    const { packageStats: stats } = testPackage;

    stats.runQuantity += 1;
    stats.averageTime = (stats.averageTime + timeMs) / stats.runQuantity;
    await this._packageStatsRepository.save(stats);
  }

  private async _createStats(testPackage: Package): Promise<void> {
    await this._packageStatsRepository.save({
      averageTime: 0,
      runQuantity: 0,
      package: testPackage,
    });
  }

  private async _checkDuplicate(name: string): Promise<boolean> {
    const testPackage = await this._packageRepository.findOneBy({
      packageName: name,
    });

    return testPackage !== null;
  }
}
