import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './dao/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksRepository, TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
