import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class TestRunRequest {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @Column({ name: 'request_type' })
  requestType: 'RUN_START' | 'RUN_END';

  @Column({ name: 'run_id' })
  runId: string;

  @Column({ name: 'package_name' })
  packageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
