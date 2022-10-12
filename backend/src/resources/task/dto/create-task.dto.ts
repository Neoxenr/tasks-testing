import { IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  userId: string;

  title: string;

  description: string;

  language: string;

  dockerImageName: string;

  mainCode: string;

  testCode: string;
}
