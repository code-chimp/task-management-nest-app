import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

/**
 * Entity representing a user in the database.
 * - id: Unique identifier (UUID)
 * - username: Unique username for authentication
 * - password: Hashed password
 * - tasks: List of tasks owned by the user (One-to-Many relationship)
 */
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, task => task.user, { eager: true })
  tasks: TaskEntity[];
}
