import { Body, Controller, Post } from '@nestjs/common';
import TestRunService from './test-run.service';
import { CreateTestRunRequestDto } from './dto';
import { TestRunRequest } from './entities';

@Controller('jobs-requests')
export class TestRunRequestController {
  constructor(private jobsService: TestRunService) {}

  @Post()
  postRequest(@Body() requestDto: CreateTestRunRequestDto): Promise<TestRunRequest> {
    return this.jobsService.postTestRunRequest(requestDto);
  }
}
