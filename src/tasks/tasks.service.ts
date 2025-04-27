import { Injectable, NotFoundException } from '@nestjs/common';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';
import { TasksRepository } from './repositories/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './dao/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) {}

  async getAll(filter: FilteredTasksDto): Promise<TaskEntity[]> {
    return await this.tasksRepository.getTasks(filter);
  }

  async get(id: string): Promise<TaskEntity> {
    const entity = await this.tasksRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return entity;
  }

  create(dto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksRepository.createTask(dto);
  }

  async update(id: string, updated: TaskEntity): Promise<TaskEntity> {
    const task = await this.get(id);
    return await this.tasksRepository.save({
      ...task,
      ...updated,
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return result;
  }
}
