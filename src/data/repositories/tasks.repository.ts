import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskStatus } from '../../@enums/task-status.enum';
import { CreateTaskDto } from '../../tasks/dto/create-task.dto';
import { FilteredTasksDto } from '../../tasks/dto/filtered-tasks.dto';
import { TaskEntity } from '../dao/task.entity';
import { UserEntity } from '../dao/user.entity';

/**
 * Repository for managing TaskEntity persistence and queries.
 * Provides custom methods for creating and filtering tasks for a user.
 */
@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  private readonly logger = new Logger(TasksRepository.name, { timestamp: true });

  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.manager);
  }

  /**
   * Create a new task for a user with the given title and description.
   * @param dto - Data for the new task
   * @param user - The user who owns the task
   */
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

  /**
   * Get all tasks for a user, optionally filtered by status and search string.
   * @param filter - Filtering options
   * @param user - The user whose tasks to retrieve
   */
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

    try {
      return await query.getMany();
    } catch (e) {
      this.logger.error(
        `Error fetching tasks for user ${user.username}, filters: ${JSON.stringify(filter)}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        e.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
