import { Column, CreateDateColumn, Entity, OneToOne } from 'typeorm';
import { PackageStats } from './package-stats.entity';

@Entity()
export class Package {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @Column({ name: 'package_name' })
  packageName: string;

  @OneToOne(() => PackageStats, (stats) => stats.package)
  packageStats: PackageStats;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
