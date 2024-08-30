import { Controller, Get } from '@nestjs/common';
import JobsService from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }
}
