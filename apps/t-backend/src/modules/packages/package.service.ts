import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private _repository: Repository<Package>
  ) {}

  public async getPackages(): Promise<Package[]> {
    return this._repository.find();
  }

  public async addPackage(name: string): Promise<Package> {
    const isDuplicate = await this._checkDuplicate(name);

    if (!isDuplicate) {
      return await this._repository.save({ packageName: name });
    }
  }

  private async _checkDuplicate(name: string): Promise<boolean> {
    return (await this._repository.findOneBy({ packageName: name })) !== null;
  }
}
