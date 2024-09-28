import { getRepositoryToken } from "@nestjs/typeorm";
import TestRunService from "./test-run.service"
import { Test } from '@nestjs/testing';
import { TestRunGateway } from "./test-run.gateway";
import { PackageService } from "../packages/package.service";
import { TestRun, TestRunRequest } from "./entities";
import { Package } from "../packages/entities/package.entity";
import { PackageStats } from "../packages/entities/package-stats.entity";

describe('TestRunService', () => {
  let service: TestRunService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

    service = moduleRef.get(TestRunService);
  });

  it('successfully creates the service', () => {
    expect(service).toBeTruthy();
  })
})
