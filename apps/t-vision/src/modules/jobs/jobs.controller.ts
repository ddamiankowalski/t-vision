import { Body, Controller, Get, Post } from '@nestjs/common';
import JobsService from './jobs.service';
import { CreateJobDto } from './dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Post()
  postJob(@Body() jobDto: CreateJobDto) {
    console.log(jobDto);
    return this.jobsService.postJob();
  }
}
