import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../../@enums/task-status.enum';
import { UserEntity } from './user.entity';

/**
 * Entity representing a task in the database.
 * - id: Unique identifier (UUID)
 * - title: Task title
 * - description: Task description
 * - status: Task status (OPEN, IN_PROGRESS, DONE)
 * - user: The user who owns the task (Many-to-One relationship)
 */
@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => UserEntity, user => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
