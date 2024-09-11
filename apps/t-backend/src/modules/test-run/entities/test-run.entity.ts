import { Column, Entity } from 'typeorm';

@Entity()
export class TestRun {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @Column()
  packageName: string;

  @Column()
  timeMs: number;
}
