import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Package } from './package.entity';

@Entity()
export class PackageStats {
  @Column({ primary: true, generated: 'uuid' })
  uuid: string;

  @OneToOne(() => Package, (pack) => pack.packageStats)
  @JoinColumn({ name: 'package_uuid' })
  package: Package;

  @Column({ name: 'avg_time' })
  averageTime: number;

  @Column({ name: 'last_time' })
  lastTime: number;

  @Column({ name: 'run_quantity' })
  runQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
