import { Controller, Get } from '@nestjs/common';
import JobsService from './jobs.service';

@Controller('job')
export class JobsController {
  constructor(private _jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this._jobsService.getJobs();
  }
}
