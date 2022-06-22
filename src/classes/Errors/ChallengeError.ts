import {IChallengeStepResponse} from "../../types/services/Ichallenge";


export class ChallengeError {

  constructor(private stepResponse: IChallengeStepResponse, message: string) {
    this.stepResponse.message = `Dommage, ${message}`;
    this.stepResponse.status  = false;
  }

  public getApiStepResponse(): IChallengeStepResponse {
    return this.stepResponse;
  }
}
