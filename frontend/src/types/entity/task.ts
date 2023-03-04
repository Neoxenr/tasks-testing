export interface Task {
  id: string;
  title: string;
  description: string;
  language: string;
  dockerImageName: string;
  mainFileName: string;
  mainCode: string;
  testFileName: string;
  testCode: string;
}
