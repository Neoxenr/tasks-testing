import { Languages } from 'types/languages';

export interface TaskCreateDto {
  title: string;
  description: string;
  language: Languages;
  dockerImageName: string;
  mainFileName: string;
  mainCode: string;
  testFileName: string;
  testCode: string;
}
