import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';

@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filter: FilteredTasksDto) {
    if (Object.keys(filter).length > 0) {
      return this.tasksService.getFilteredTasks(filter);
    }

    return this.tasksService.getAll();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.get(id);
  }

  @Post()
  createTask(@Body() { title, description }: CreateTaskDto): Task {
    return this.tasksService.create({ title, description, status: TaskStatus.OPEN });
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() { title, description, status }: Partial<Task>,
  ): Task {
    return this.tasksService.update(id, { title, description, status });
  }

  @Patch('/:id/:field')
  updateTaskField(
    @Param('id') id: string,
    @Param('field') field: string,
    @Body() value: Partial<Task>,
  ): Task {
    return this.tasksService.update(id, value);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): boolean {
    return this.tasksService.delete(id);
  }
}
