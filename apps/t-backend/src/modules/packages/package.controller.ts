import { Controller, Get, Param } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private _packageService: PackageService) {}

  @Get()
  getPackages() {
    return this._packageService.getPackages();
  }

  @Get('stats/:name')
  getPackageStats(@Param('name') name: string) {
    return this._packageService.getPackageStats(name);
  }
}
