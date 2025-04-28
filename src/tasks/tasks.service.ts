import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { TaskEntity } from '../data/dao/task.entity';
import { UserEntity } from '../data/dao/user.entity';
import { TasksRepository } from '../data/repositories/tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';

/**
 * Service providing business logic for managing tasks.
 * Handles CRUD operations and delegates database access to the TasksRepository.
 */
@Injectable()
export class TasksService {
  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) {}

  /**
   * Retrieve all tasks for a user, optionally filtered by status or search.
   */
  async getAll(filter: FilteredTasksDto, user: UserEntity): Promise<TaskEntity[]> {
    return await this.tasksRepository.getTasks(filter, user);
  }

  /**
   * Retrieve a single task by ID for a user. Throws if not found.
   */
  async get(id: string, user: UserEntity): Promise<TaskEntity> {
    const entity = await this.tasksRepository.findOne({ where: { id, user } });
    if (!entity) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return entity;
  }

  /**
   * Create a new task for a user.
   */
  create(dto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    return this.tasksRepository.createTask(dto, user);
  }

  /**
   * Update an existing task for a user.
   */
  async update(id: string, updated: TaskEntity, user: UserEntity): Promise<TaskEntity> {
    const task = await this.get(id, user);
    return await this.tasksRepository.save({
      ...task,
      ...updated,
    });
  }

  /**
   * Delete a task by ID for a user. Throws if not found.
   */
  async delete(id: string, user: UserEntity): Promise<DeleteResult> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }
}
