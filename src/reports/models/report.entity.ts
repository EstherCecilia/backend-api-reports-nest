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
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.reports, {})
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid', { nullable: false, name: 'user_id' })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
