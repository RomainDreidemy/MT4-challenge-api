export interface IChallengeStepResponse {
  subject: string;
  description: string;
  status: boolean;
  points: number;
  message: string;
}

export interface IChallengeExercise {
  subject: string;
  description: string;
  points: number;
  successMessage: string;
  errorMessage: string;
  callback: Function
}
