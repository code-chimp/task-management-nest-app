import { TaskStatus } from '../../@enums/task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilteredTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
