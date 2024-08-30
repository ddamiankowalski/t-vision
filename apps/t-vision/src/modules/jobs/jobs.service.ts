import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class JobsService {
  constructor(@InjectRepository(Job) private jobsRepository: Repository<Job>) {}

  public async getJobs(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  public async postJob(): Promise<Job> {
    const job = this.jobsRepository.create();
    return this.jobsRepository.save({ ...job, name: 'default-name' });
  }
}
