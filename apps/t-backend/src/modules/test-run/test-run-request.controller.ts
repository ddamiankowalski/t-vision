import { Body, Controller, Post } from '@nestjs/common';
import TestRunService from './test-run.service';
import { CreateTestEndRequestDto, CreateTestStartRequestDto } from './dto';
import { TestRunRequest } from './entities';

@Controller('test-run-request')
export class TestRunRequestController {
  constructor(private _testRunService: TestRunService) {}

  @Post('start')
  postStartRequest(
    @Body() requestDto: CreateTestStartRequestDto
  ): Promise<TestRunRequest> {
    return this._testRunService.postTestRunStartRequest(requestDto);
  }

  @Post('start-many')
  postManyStartRequest(@Body() requestDto: CreateTestStartRequestDto): Promise<TestRunRequest> {
    return this._testRunService.postTestRunStartRequest(requestDto)
  }

  @Post('end')
  postEndRequest(@Body() requestDto: CreateTestEndRequestDto) {
    return this._testRunService.postTestRunEndRequest(requestDto);
  }
}
