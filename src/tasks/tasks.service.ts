import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { TaskEntity } from '../data/dao/task.entity';
import { UserEntity } from '../data/dao/user.entity';
import { TasksRepository } from '../data/repositories/tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) {}

  async getAll(filter: FilteredTasksDto, user: UserEntity): Promise<TaskEntity[]> {
    return await this.tasksRepository.getTasks(filter, user);
  }

  async get(id: string, user: UserEntity): Promise<TaskEntity> {
    const entity = await this.tasksRepository.findOne({ where: { id, user } });

    if (!entity) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return entity;
  }

  create(dto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    return this.tasksRepository.createTask(dto, user);
  }

  async update(id: string, updated: TaskEntity, user: UserEntity): Promise<TaskEntity> {
    const task = await this.get(id, user);
    return await this.tasksRepository.save({
      ...task,
      ...updated,
    });
  }

  async delete(id: string, user: UserEntity): Promise<DeleteResult> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return result;
  }
}
