import { IsUUID } from 'class-validator';

export class UpdateSolutionDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  taskId: string;

  solutionCode: string;
}
