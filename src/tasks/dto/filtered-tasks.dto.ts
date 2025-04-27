import { TaskStatus } from '../models/task.model';

export class FilteredTasksDto {
  status?: TaskStatus;
  search?: string;
}
