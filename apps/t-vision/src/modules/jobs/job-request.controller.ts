import { Body, Controller, Post } from '@nestjs/common';
import JobsService from './jobs.service';
import { JobRequest } from './entities';
import { CreateJobRequestDto } from './dto';

@Controller('jobs-requests')
export class JobsRequestsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  postRequest(@Body() requestDto: CreateJobRequestDto): Promise<JobRequest> {
    return this.jobsService.postJobRequest(requestDto);
  }
}
