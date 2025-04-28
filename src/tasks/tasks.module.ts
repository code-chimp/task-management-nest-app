import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TaskEntity } from '../data/dao/task.entity';
import { TasksRepository } from '../data/repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksRepository, TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
