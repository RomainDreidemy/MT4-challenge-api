import {ChallengeService} from "./challenge.service";
import {IChallengeStepResponse, IChallengeTest} from "../types/services/Ichallenge";
import {ApiError} from "../classes/Errors/ApiError";
import {ChallengeError} from "../classes/Errors/ChallengeError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";
import {SoldierChallenges} from "../challenges/soldier.challenge";

const POINTS_TO_WIN = 25;

export class ChallengeSolderService extends ChallengeService {

  public constructor(config: IMysqlThroughSSHConfig) {
    super(config, POINTS_TO_WIN, SoldierChallenges);
  }

  public async start(): Promise<void> {
    try {
      let index = 0;
      while (index < this.tests.length) {
        this.responses.push( await this.play(this.tests[index]));
        index += 1;
      }

    } catch (err) {
      if (err instanceof ChallengeError) {
        this.responses.push(err.getApiStepResponse());
      } else {
        throw new ApiError(ErrorCode.InternalError, 'internal/unknown', 'Internal server error', err);
      }
    }
  }

  private async play(test: IChallengeTest): Promise<IChallengeStepResponse> {
    const {subject, points, successMessage, errorMessage, callback} = test;

    const stepResponse: IChallengeStepResponse = {
      subject,
      status: false,
      points,
      message: ''
    }

    try {
      await callback(this.config);

      stepResponse.status = true;
      stepResponse.message = successMessage;
      this.addPoints(stepResponse.points);

      return stepResponse;

    } catch (err) {
      throw new ChallengeError(stepResponse, errorMessage);
    }
  }
}
