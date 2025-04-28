import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from '../../@enums/task-status.enum';
import { CreateTaskDto } from '../../tasks/dto/create-task.dto';
import { FilteredTasksDto } from '../../tasks/dto/filtered-tasks.dto';
import { TaskEntity } from '../dao/task.entity';
import { UserEntity } from '../dao/user.entity';

/**
 * Repository for managing tasks in the database.
 * This class extends TypeORM's Repository to provide CRUD operations for TaskEntity.
 */
@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.manager);
  }

  async createTask(
    { title, description }: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = this.create({
      title,
      description,
      user,
      status: TaskStatus.OPEN,
    });
    return await this.save(task);
  }

  async getTasks(filter: FilteredTasksDto, user: UserEntity): Promise<TaskEntity[]> {
    const { status, search } = filter;
    const query = this.createQueryBuilder('task').where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
}
