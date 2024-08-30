import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import JobsService from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobRequest } from './entities/job-request.entity';
import { JobsRequestsController } from './job-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobRequest])],
  controllers: [JobsController, JobsRequestsController],
  providers: [JobsService],
})
export class JobsModule {}
