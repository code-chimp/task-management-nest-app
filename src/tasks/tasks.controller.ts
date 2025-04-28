import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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

/**
 * Controller for handling all task-related HTTP requests.
 * All routes are protected by JWT authentication.
 */
@Controller('api/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger(TasksController.name);

  constructor(private tasksService: TasksService) {}

  /**
   * Get all tasks for the authenticated user, optionally filtered by status or search query.
   */
  @Get()
  getTasks(
    @Query() filter: FilteredTasksDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity[]> {
    this.logger.verbose(
      `Getting all tasks for user "${user.username}" with filters: ${JSON.stringify(filter)}`,
    );
    return this.tasksService.getAll(filter, user);
  }

  /**
   * Get a specific task by its ID for the authenticated user.
   */
  @Get('/:id')
  getTask(@Param('id') id: string, @GetUser() user: UserEntity): Promise<TaskEntity> {
    return this.tasksService.get(id, user);
  }

  /**
   * Create a new task for the authenticated user.
   */
  @Post()
  createTask(@Body() dto: CreateTaskDto, @GetUser() user: UserEntity): Promise<TaskEntity> {
    this.logger.verbose(
      `Creating a new task for user "${user.username}" with data: ${JSON.stringify(dto)}`,
    );
    return this.tasksService.create(dto, user);
  }

  /**
   * Update an existing task by its ID for the authenticated user.
   */
  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() task: TaskEntity,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, task, user);
  }

  /**
   * Delete a task by its ID for the authenticated user.
   */
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: UserEntity): Promise<DeleteResult> {
    return this.tasksService.delete(id, user);
  }
}
