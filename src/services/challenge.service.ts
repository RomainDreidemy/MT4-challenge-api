import {ISSHConfig} from "../types/classes/SSH/ISSH";
import {IChallengeResponse} from "../types/api/challenge/IChallengeResponse";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IChallengeStepResponse} from "../types/services/Ichallenge";

export abstract class ChallengeService {
  protected sshConfig: ISSHConfig;
  protected pointsToWin: number;
  protected responses: IChallengeStepResponse[];

  protected points: number = 0;

  protected constructor(sshConfig: ISSHConfig, pointsToWin: number = 20) {
    this.sshConfig    = sshConfig;
    this.pointsToWin  = pointsToWin;
    this.responses    = [];
  }

  public getPoints(): number {
    return this.points;
  }

  public getPointsToWin(): number {
    return this.pointsToWin;
  }

  public getApiResponse(): IChallengeResponse {
    return {
      hasWin: this.hasWin(),
      points: this.points,
      pointsToWin: this.pointsToWin,
      responses: this.responses
    }
  }

  public hasWin() {
    return this.points === this.pointsToWin;
  }

  public async start(): Promise<void> {
    throw new ApiError(ErrorCode.InternalError, 'internal/unknown','You have to implement the method start() !');
  }

  protected addPoints(points: number): void {
    this.points += points;
  }
}
