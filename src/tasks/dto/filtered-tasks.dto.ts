import { TaskStatus } from '../../@enums/task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * DTO for filtering tasks by status and search query.
 * - status: Optional filter for task status (OPEN, IN_PROGRESS, DONE).
 * - search: Optional search string to match in title or description.
 */
export class FilteredTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
