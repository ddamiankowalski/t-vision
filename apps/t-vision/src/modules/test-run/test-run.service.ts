import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRun } from './entities/test-run.entity';
import { Repository } from 'typeorm';
import { TestRunRequest } from './entities';
import { CreateTestRunRequestDto } from './dto';

@Injectable()
export default class TestRunService {
  constructor(
    @InjectRepository(TestRun) private _testRunRepository: Repository<TestRun>,
    @InjectRepository(TestRunRequest)
    private requestRepository: Repository<TestRunRequest>
  ) {}

  public async getTestRuns(): Promise<TestRun[]> {
    return this._testRunRepository.find();
  }

  public async postTestRunRequest(
    requestDto: CreateTestRunRequestDto
  ): Promise<TestRunRequest> {
    const endRequest = await this.requestRepository.save({ ...requestDto });

    if (endRequest.requestType === 'RUN_END') {
      const startRequest = await this.requestRepository.find({
        where: { runId: endRequest.runId, requestType: 'RUN_START' },
      });

      const { createdAt } = startRequest[0];
      console.log(
        new Date(createdAt).getTime() - new Date(endRequest.createdAt).getTime()
      );
      //this._createJob();
    }

    return endRequest;
  }

  private async _createJob(): Promise<TestRun> {
    return await this._testRunRepository.save({ name: 'testname' });
  }
}
