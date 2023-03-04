export interface TaskCreateDto {
  title: string;
  description: string;
  language: string;
  dockerImageName: string;
  mainFileName: string;
  mainCode: string;
  testFileName: string;
  testCode: string;
}
