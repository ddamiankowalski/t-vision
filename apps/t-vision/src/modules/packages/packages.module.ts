import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Package } from "./entities/package.entity";
import { PackageService } from "./package.service";
import { PackageController } from "./package.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  controllers: [PackageController],
  providers: [PackageService]
})
export class PackagesModule {}
