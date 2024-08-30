import { Column, Entity } from 'typeorm';

@Entity()
export class Job {
  @Column({ primary: true, nullable: false })
  uuid: string;

  @Column()
  name: string;
}
