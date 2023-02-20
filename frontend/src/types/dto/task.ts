export interface TaskCreateDto {
  title: string;
  description: string;
  language: string;
  dockerImageName: string;
  mainCode: string;
  testCode: string;
}
