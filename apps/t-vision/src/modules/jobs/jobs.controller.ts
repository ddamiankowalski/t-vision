import { Body, Controller, Get, Post } from '@nestjs/common';
import JobsService from './jobs.service';
import { CreateJobRequestDto } from './dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Post()
  postJobRequest(@Body() jobDto: CreateJobRequestDto) {
    console.log(jobDto);
    return this.jobsService.postJob();
  }
}
