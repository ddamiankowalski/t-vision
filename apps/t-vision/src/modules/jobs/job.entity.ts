import { Column, Entity } from 'typeorm';

@Entity()
export class Job {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @Column()
  name: string;
}
