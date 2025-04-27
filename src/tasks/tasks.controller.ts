import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TaskEntity } from './dao/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filter: FilteredTasksDto): Promise<TaskEntity[]> {
    return this.tasksService.getAll(filter);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.get(id);
  }

  @Post()
  createTask(@Body() { title, description }: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create({ title, description });
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: TaskEntity): Promise<TaskEntity> {
    return this.tasksService.update(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.delete(id);
  }
}
