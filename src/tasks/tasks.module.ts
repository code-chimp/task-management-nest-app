import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TaskEntity } from '../data/dao/task.entity';
import { TasksRepository } from '../data/repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * The TasksModule bundles controllers, services, and repositories for task management.
 * Imports AuthModule for authentication and TypeOrmModule for database integration.
 */
@Module({
  imports: [AuthModule, ConfigModule, TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksRepository, TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
