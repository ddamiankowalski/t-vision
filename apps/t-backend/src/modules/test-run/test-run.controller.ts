import { Controller, Get } from '@nestjs/common';
import TestRunService from './test-run.service';

@Controller('test-run')
export class TestRunController {
  constructor(private _testRunService: TestRunService) {}

  @Get()
  getTestRuns() {
    return this._testRunService.getTestRuns();
  }
}
