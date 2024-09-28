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
        TestRunGateway,
        {
          provide: getRepositoryToken(TestRun),
          useValue: {}
        },
        {
          provide: getRepositoryToken(TestRunRequest),
          useValue: {}
        },
        {
          provide: getRepositoryToken(Package),
          useValue: {}
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
})
