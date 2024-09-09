import { Column, Entity } from "typeorm";

@Entity()
export class Package {
  @Column({ primary: true, generated: 'uuid' })
  id: string;
}
