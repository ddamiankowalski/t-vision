import { Module } from '@nestjs/common';
import { TestRunController } from './test-run.controller';
import TestRunService from './test-run.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestRun } from './entities/test-run.entity';
import { TestRunRequest } from './entities/test-run-request.entity';
import { TestRunRequestController } from './test-run-request.controller';
import { PackagesModule } from '../packages/packages.module';
import { TestRunGateway } from './test-run.gateway';

@Module({
  imports: [
    PackagesModule,
    TypeOrmModule.forFeature([TestRun, TestRunRequest]),
  ],
  controllers: [TestRunController, TestRunRequestController],
  providers: [TestRunService, TestRunGateway],
})
export class JobsModule { }
