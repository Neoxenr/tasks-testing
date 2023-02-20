export interface Task {
  id: string;
  title: string;
  description: string;
  language: string;
  dockerImageName: string;
  mainCode: string;
  testCode: string;
}
