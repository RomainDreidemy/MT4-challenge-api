import {IChallengeStepResponse} from "../../services/Ichallenge";

export interface IChallengeResponse {
  hasWin: boolean;
  points: number;
  pointsToWin: number;
  responses: IChallengeStepResponse[]
}
