import { Column, Entity } from 'typeorm';

@Entity()
export class JobRequest {
  @Column({ primary: true })
  uuid: string;

  @Column()
  requestType: 'JOB_START' | 'JOB_END';

  @Column()
  packageName: string;
}
