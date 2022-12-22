import { IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @IsUUID()
  userId: string;

  title: string;

  language: string;

  description: string;

  dockerImageName: string;

  mainCode: string;

  testCode: string;
}
