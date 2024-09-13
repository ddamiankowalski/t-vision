import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRun } from './entities/test-run.entity';
import { Repository } from 'typeorm';
import { TestRunRequest } from './entities';
import { CreateTestRunRequestDto } from './dto';
import { PackageService } from '../packages/package.service';
import { TestRunGateway } from './test-run.gateway';

@Injectable()
export default class TestRunService {
  constructor(
    @InjectRepository(TestRun) private _testRunRepository: Repository<TestRun>,
    @InjectRepository(TestRunRequest)
    private _requestRepository: Repository<TestRunRequest>,
    private _packageService: PackageService,
    private _gateway: TestRunGateway
  ) { }

  public async getLastPackageRun(packageName: string): Promise<TestRun> {
    const run = await this._testRunRepository.findOne({
      where: { packageName },
      order: { createdAt: 'DESC' },
    });

    if (!run) {
      throw new HttpException(
        `Could not find a test run for name ${packageName}`,
        HttpStatus.NOT_FOUND
      );
    }

    return run;
  }

  public async getTestRuns(): Promise<TestRun[]> {
    return this._testRunRepository.find();
  }

  public async postTestRunRequest(
    requestDto: CreateTestRunRequestDto
  ): Promise<TestRunRequest> {
    const { requestType } = requestDto;

    const request = await this._requestRepository.findOneBy({
      runId: requestDto.runId,
      requestType,
    });

    if (request) {
      throw new HttpException(
        `Test run with given id ${requestDto.runId} and type ${requestType} already exists!`,
        HttpStatus.BAD_REQUEST
      );
    }

    if (requestType === 'RUN_START') {
      return await this._postStartRequest(requestDto);
    } else {
      return await this._postEndRequest(requestDto);
    }
  }

  private async _postStartRequest(
    dto: CreateTestRunRequestDto
  ): Promise<TestRunRequest> {
    this._packageService.addPackage(dto.packageName);

    const request = await this._requestRepository.save({ ...dto });
    this._gateway.emitTestRunStart(request.packageName);

    return request;
  }

  private async _postEndRequest(
    dto: CreateTestRunRequestDto
  ): Promise<TestRunRequest> {
    const endRequest = this._requestRepository.create({ ...dto });
    const startRequest = await this._requestRepository.findOneBy({
      runId: dto.runId,
      packageName: dto.packageName,
      requestType: 'RUN_START',
    });

    if (!startRequest) {
      throw new HttpException(
        'Could not find start request',
        HttpStatus.BAD_REQUEST
      );
    }

    this._saveTestRun(startRequest);

    return await this._requestRepository.save(endRequest);
  }

  private async _saveTestRun(startRequest: TestRunRequest): Promise<void> {
    const timeMs = this._calculateTestRunTime(startRequest);
    const run = await this._testRunRepository.save({
      packageName: startRequest.packageName,
      timeMs,
    });

    this._gateway.emitTestRunEnd(run);
  }

  private _calculateTestRunTime(startRequest: TestRunRequest): number {
    return Date.now() - new Date(startRequest.createdAt).getTime();
  }
}
