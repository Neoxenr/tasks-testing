import { IsUUID } from 'class-validator';

export class CreateSolutionDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  taskId: string;

  solutionCode: string;
}
