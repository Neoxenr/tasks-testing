export interface VerifyRequestDto {
  language: string;
  dockerImageName: string;
  dockerMountingDirectoryName: string;
  solutionFileName: string;
  solutionCode: string;
  testFileName: string;
  testCode: string;
}
