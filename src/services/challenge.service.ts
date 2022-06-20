import {IChallengeResponse} from "../types/api/challenge/IChallengeResponse";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IChallengeStepResponse, IChallengeTest} from "../types/services/Ichallenge";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";
import {ChallengeError} from "../classes/Errors/ChallengeError";

export abstract class ChallengeService {
  protected config: IMysqlThroughSSHConfig;
  protected responses: IChallengeStepResponse[];
  protected tests: IChallengeTest[];
  protected points: number = 0;

  protected constructor(config: IMysqlThroughSSHConfig, tests: IChallengeTest[]) {
    this.config       = config;
    this.responses    = [];
    this.tests        = tests;
  }

  get pointsToWin() {
    return this.tests.reduce((accumulator, test) => {
      return accumulator + test.points;
    }, 0)
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
    try {
      let index = 0;
      while (index < this.tests.length) {
        this.responses.push( await this.playTest(this.tests[index]));
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

  private async playTest(test: IChallengeTest): Promise<IChallengeStepResponse> {
    let {subject, points, successMessage, errorMessage, callback} = test;

    const stepResponse: IChallengeStepResponse = {
      subject,
      status: false,
      points,
      message: ''
    }

    successMessage  = `Bravos, ${successMessage}`;
    errorMessage    = `Dommage, ${errorMessage}`;

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

  protected addPoints(points: number): void {
    this.points += points;
  }
}
