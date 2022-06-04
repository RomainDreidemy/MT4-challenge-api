export interface IChallengeStepResponse {
  subject: string;
  status: boolean;
  points: number;
  message: string;
}

export interface IChallengeTest {
  subject: string;
  points: number;
  successMessage: string;
  errorMessage: string;
  callback: Function
}
