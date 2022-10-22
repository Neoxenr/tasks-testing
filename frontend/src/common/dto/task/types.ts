export type TaskDto = {
  title: string;

  language: string;

  description: string;

  userId: string;

  mainCode: string;

  testCode: string;
};

export type TaskVerifyDto = {
  language: string;

  dockerImageName: string;

  testCode: string;

  solutionCode: string;
};
