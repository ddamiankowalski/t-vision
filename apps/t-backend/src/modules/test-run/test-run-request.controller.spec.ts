import { TestRunRequestController } from './test-run-request.controller';
import { Test } from '@nestjs/testing';
import TestRunService from './test-run.service';
import { TestRunGateway } from './test-run.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestRun, TestRunRequest } from './entities';
import { PackageService } from '../packages/package.service';
import { Package } from '../packages/entities/package.entity';
import { PackageStats } from '../packages/entities/package-stats.entity';

describe('TestRunRequestController', () => {
  let controller: TestRunRequestController;

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

    controller = moduleRef.get(TestRunRequestController)
  });

  it('successfully initilizes', () => {
    expect(controller).toBeTruthy();
  })

  it('calling the POST start controller with correct body returns correct response', async () => {
    const dto = { packageName: 'test-name', runId: 'test-id' };
    const response = await controller.postStartRequest(dto);
    expect(response).toEqual({ ...dto, requestType: 'RUN_START' });
  })
})
