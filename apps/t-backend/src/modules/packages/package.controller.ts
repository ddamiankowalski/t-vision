import { Controller, Get } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private _packageService: PackageService) {}

  @Get()
  getPackages() {
    return this._packageService.getPackages();
  }
}
