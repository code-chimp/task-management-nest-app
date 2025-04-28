import { IsNotEmpty } from 'class-validator';

/**
 * DTO for creating a new task.
 * - title: The title of the task (required).
 * - description: The description of the task (required).
 */
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
