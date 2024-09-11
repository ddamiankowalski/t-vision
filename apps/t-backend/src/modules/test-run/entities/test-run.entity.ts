import { Column, Entity } from 'typeorm';

@Entity()
export class TestRun {
  @Column({ primary: true, nullable: false })
  uuid: string;

  @Column()
  name: string;

  @Column()
  time: number;
}
