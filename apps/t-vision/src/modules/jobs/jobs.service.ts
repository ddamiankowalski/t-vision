import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class JobsService {
  constructor(@InjectRepository(Job) private jobsRepository: Repository<Job>) {}

  public getJobs(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  public postJob(): Promise<Job> {
    const job = this.jobsRepository.create();
    return this.jobsRepository.save({ ...job, name: 'default-name' });
  }
}
