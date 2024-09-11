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
    const { requestType } = requestDto;

    if(requestType === 'RUN_START') {
      return await this._postStartRequest(requestDto);
    } else {
      return await this._postEndRequest(requestDto);
    }
  }

  private async _postStartRequest(dto: CreateTestRunRequestDto): Promise<TestRunRequest> {
    return await this.requestRepository.save({ ...dto });
  }

  private async _postEndRequest(dto: CreateTestRunRequestDto): Promise<TestRunRequest> {
    const { runId } = dto;
    const endRequest = this.requestRepository.create({ ...dto });
    const startRequest = await this.requestRepository.findOne({ where: { runId, requestType: 'RUN_START' } });

    if(!startRequest) {
      throw new Error();
    }

    return await this.requestRepository.save(endRequest);
  }
}
