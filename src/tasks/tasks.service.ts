import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';
import { CrudService } from '../common/services/crud.service';
import { FilteredTasksDto } from './dto/filtered-tasks.dto';

/**
 * Service for managing tasks, extending the generic CRUD service.
 * Provides additional functionality for filtering tasks based on specific criteria.
 */
@Injectable()
export class TasksService extends CrudService<Task> {
  /**
   * Retrieves tasks filtered by status and/or search criteria.
   * @param {FilteredTasksDto} filter - The filter criteria containing status and search text.
   * @returns {Task[]} An array of tasks matching the filter criteria.
   */
  getFilteredTasks(filter: FilteredTasksDto): Task[] {
    const { status, search } = filter;
    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return tasks;
  }
}
