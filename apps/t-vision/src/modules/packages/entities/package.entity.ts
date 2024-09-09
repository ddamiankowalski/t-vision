import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Package {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @Column({ name: 'package_name' })
  packageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
