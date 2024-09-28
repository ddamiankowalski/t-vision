import { TestRunRequestController } from './test-run-request.controller';
import { Test } from '@nestjs/testing';
import TestRunService from './test-run.service';
import { TestRunGateway } from './test-run.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestRun, TestRunRequest } from './entities';
import { PackageService } from '../packages/package.service';
import { Package } from '../packages/entities/package.entity';
import { PackageStats } from '../packages/entities/package-stats.entity';
import { CreateTestEndRequestDto } from './dto';

describe('TestRunRequestController', () => {
  let controller: TestRunRequestController;
  let service: TestRunService;

  afterEach(() => {
    jest.clearAllMocks();
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TestRunRequestController],
      providers: [
        TestRunService,
        PackageService,
        {
          provide: TestRunGateway,
          useValue: { emitTestRunStart: jest.fn() }
        },
        {
          provide: getRepositoryToken(TestRun),
          useValue: {}
        },
        {
          provide: getRepositoryToken(TestRunRequest),
          useValue: { findOneBy: jest.fn(), save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)) }
        },
        {
          provide: getRepositoryToken(Package),
          useValue: { findOneBy: jest.fn() }
        },
        {
          provide: getRepositoryToken(PackageStats),
          useValue: {}
        }
    ]
    }).compile();

    controller = moduleRef.get(TestRunRequestController);
    service = moduleRef.get(TestRunService);
  });

  it('successfully initilizes', () => {
    expect(controller).toBeTruthy();
  })

  it('calls start request successfully', () => {
    const spy = jest.spyOn(service, 'postTestRunStartRequest');
    const dto = { packageName: 'test-name', runId: 'test-id' }
    controller.postStartRequest(dto);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(dto);
  })

  it('calls end request successfully', () => {
    const spy = jest.spyOn(service, 'postTestRunEndRequest');
    const dto = { packageName: 'test-name', runId: 'test-id', status: 'FAILURE' } as CreateTestEndRequestDto;
    controller.postEndRequest(dto);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(dto);
  })
})
