import { Controller, Get, Req } from '@nestjs/common';
import JobsService from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs(@Req() req: Request) {
    return Object.keys(this.jobsService.getRequest());
  }
}
