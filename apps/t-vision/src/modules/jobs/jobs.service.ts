import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { JobRequest } from './entities';
import { CreateJobRequestDto } from './dto';

@Injectable()
export default class JobsService {
  constructor(
    @InjectRepository(Job) private jobsRepository: Repository<Job>,
    @InjectRepository(JobRequest)
    private requestRepository: Repository<JobRequest>
  ) {}

  public async getJobs(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  public async postJobRequest(
    requestDto: CreateJobRequestDto
  ): Promise<JobRequest> {
    const request = this.requestRepository.create({ ...requestDto });
    return this.requestRepository.save(request);
  }
}
