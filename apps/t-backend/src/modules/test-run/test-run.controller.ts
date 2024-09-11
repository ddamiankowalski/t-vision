import { Param, Controller, Get } from '@nestjs/common';
import TestRunService from './test-run.service';

@Controller('test-run')
export class TestRunController {
  constructor(private _testRunService: TestRunService) {}

  @Get()
  getTestRuns() {
    return this._testRunService.getTestRuns();
  }

  @Get('last-run/:name')
  getLastPackageRun(@Param('name') name: string) {
    return this._testRunService.getLastPackageRun(name);
  }
}
