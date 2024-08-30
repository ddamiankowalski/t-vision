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
    const endRequest = await this.requestRepository.save({ ...requestDto });

    if (endRequest.requestType === 'JOB_END') {
      const startRequest = await this.requestRepository.find({
        where: { jobId: endRequest.jobId, requestType: 'JOB_START' },
      });

      const { createdAt } = startRequest[0];
      console.log(
        new Date(createdAt).getTime() - new Date(endRequest.createdAt).getTime()
      );
      //this._createJob();
    }

    return endRequest;
  }

  private async _createJob(): Promise<Job> {
    return await this.jobsRepository.save({ name: 'testname' });
  }
}
