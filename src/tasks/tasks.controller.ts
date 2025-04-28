import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { TaskEntity } from '../data/dao/task.entity';
import { UserEntity } from '../data/dao/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filter: FilteredTasksDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getAll(filter, user);
  }

  @Get('/:id')
  getTask(@Param('id') id: string, @GetUser() user: UserEntity): Promise<TaskEntity> {
    return this.tasksService.get(id, user);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto, @GetUser() user: UserEntity): Promise<TaskEntity> {
    return this.tasksService.create(dto, user);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() task: TaskEntity,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, task, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: UserEntity): Promise<DeleteResult> {
    return this.tasksService.delete(id, user);
  }
}
