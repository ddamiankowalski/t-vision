import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class JobRequest {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @Column({ name: 'request_type' })
  requestType: 'JOB_START' | 'JOB_END';

  @Column({ name: 'job_id' })
  jobId: string;

  @Column({ name: 'package_name' })
  packageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
