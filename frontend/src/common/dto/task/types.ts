import { TaskEntity } from '../../entity';

export type TaskCreateRequestDto = {
  title: string;
  language: string;
  description: string;
  userId: string;
  mainCode: string;
  testCode: string;
};

export type TaskGetRequestDto = {
  task: TaskEntity | null;
  isLoading: boolean;
};

export type TaskVerifyRequestDto = {
  language: string;
  dockerImageName: string;
  testCode: string;
  solutionCode: string;
};

export type TaskVerifyResponseDto = {
  passed: boolean;
  output: string;
  result: string;
  status: number;
};
