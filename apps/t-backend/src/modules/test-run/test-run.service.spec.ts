import { getRepositoryToken } from "@nestjs/typeorm";
import TestRunService from "./test-run.service"
import { Test, TestingModule } from '@nestjs/testing';
import { TestRunGateway } from "./test-run.gateway";
import { PackageService } from "../packages/package.service";
import { TestRun, TestRunRequest } from "./entities";
import { Package } from "../packages/entities/package.entity";
import { PackageStats } from "../packages/entities/package-stats.entity";

describe('TestRunService', () => {
  let service: TestRunService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
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

  describe('#getLastPackageRun', () => {
    it('calls the #findOne method from db with correct arguments', () => {
      const repository = moduleRef.get(getRepositoryToken(TestRun))
      repository.findOne = jest.fn().mockImplementation(() => Promise.resolve(null));

      service.getLastPackageRun('test-package');
    })
  })
})
