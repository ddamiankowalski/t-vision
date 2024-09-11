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
}
