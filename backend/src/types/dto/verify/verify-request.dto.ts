export interface VerifyRequestDto {
  language: string;
  dockerImageName: string;
  solutionFileName: string;
  solutionCode: string;
  testFileName: string;
  testCode: string;
}
