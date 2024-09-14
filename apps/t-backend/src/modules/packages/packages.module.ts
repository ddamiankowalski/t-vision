import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { PackageStats } from './entities/package-stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, PackageStats])],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackagesModule {}
