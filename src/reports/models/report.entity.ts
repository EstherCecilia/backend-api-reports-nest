import { User } from 'src/users/models/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity(Report.ENTITY_ALIAS)
export class Report extends BaseEntity {
  static readonly ENTITY_ALIAS = 'report';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  identification: string;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @RelationId((report: Report) => report.user)
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
