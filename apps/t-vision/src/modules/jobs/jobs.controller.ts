import { Controller, Get, Post } from '@nestjs/common';
import JobsService from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Post()
  postJob() {
    return this.jobsService.postJob();
  }
}
