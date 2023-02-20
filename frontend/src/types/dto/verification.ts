// Types
import { Verification } from 'types/entity/verification';

export interface VerificationRequestDto {
  language: string;
  dockerImageName: string;
  solutionCode: string;
  testCode: string;
}

export interface VerificationResponseDto {
  result: Verification | null;
  isLoading: boolean;
}
