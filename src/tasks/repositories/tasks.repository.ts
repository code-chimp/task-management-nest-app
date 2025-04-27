import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskEntity } from '../dao/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../../@enums/task-status.enum';
import { FilteredTasksDto } from '../dto/filtered-tasks.dto';

/**
 * Repository for managing tasks in the database.
 * This class extends TypeORM's Repository to provide CRUD operations for TaskEntity.
 */
@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.manager);
  }

  async createTask({ title, description }: CreateTaskDto): Promise<TaskEntity> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    return await this.save(task);
  }

  async getTasks(filter: FilteredTasksDto): Promise<TaskEntity[]> {
    const { status, search } = filter;
    const query = this.createQueryBuilder('task');

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
