import {IChallengeResponse} from "../types/api/challenge/IChallengeResponse";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IChallengeStepResponse, IChallengeExercise} from "../types/services/Ichallenge";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";
import {ChallengeError} from "../classes/Errors/ChallengeError";
import {QueryError} from "mysql2";
import {IUserRequest} from "../types/api/authentication/IUserRequest";
import {Crud} from "../classes/Crud";
import {IUser, IUserCreate} from "../types/tables/user/IUser";
import {IScoreCreate, IScoreUpdate} from "../types/tables/score/IScore";
import {IChallenge} from "../types/tables/challenge/IChallenge";

export abstract class ChallengeService {
  protected config: IMysqlThroughSSHConfig;
  protected responses: IChallengeStepResponse[];
  protected tests: IChallengeExercise[];
  protected points: number = 0;

  protected constructor(config: IMysqlThroughSSHConfig, tests: IChallengeExercise[]) {
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

  public async start(user: IUser, challenge: IChallenge): Promise<void> {
    if (!user.is_admin && user.batch_id !== challenge.batch_id) {
      throw new ApiError(403, 'challenge/not-part', 'Vous ne faites pas parti de la bonne promo.');
    }

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
    } finally {
      await this.handleScore(user.id, challenge.id, this.points);
    }
  }

  private async playTest(test: IChallengeExercise): Promise<IChallengeStepResponse> {
    let {subject, description, points, successMessage, errorMessage, callback} = test;

    const stepResponse: IChallengeStepResponse = {
      subject,
      description,
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

    } catch (err: Error|QueryError|any) {
      let message = errorMessage;

      if (err.code && err.sqlState && err.sqlMessage) {
        message = `${err.code}: ${err.sqlState} - ${err.sqlMessage}`;
      } else if (err instanceof Error) {
        message = err.message;
      }

      throw new ChallengeError(stepResponse, message);
    }
  }

  protected addPoints(points: number): void {
    this.points += points;
  }

  private handleScore = async (userId: number, challengeId: number, score: number) => {
    const hasScore = await this.hasUserScore(userId, challengeId);

     if (!hasScore) {
       await this.saveScore(userId, challengeId, score);
     } else {
       await this.updateScore(userId, challengeId, score);
     }
  }

  private hasUserScore = async (userId: number, challengeId: number): Promise<boolean> => {
    const request = await Crud.Read<IUser>('score', ['user_id', 'challenge_id'], [userId, challengeId], ['score'], false);

    return !!request;
  }

  private saveScore = async (userId: number, challengeId: number, score: number) => {
    await Crud.Create<IScoreCreate>({
      user_id: userId,
      challenge_id: challengeId,
      score,
      first_try_at: new Date(),
      last_try_at: new Date()
    }, 'score');
  }

  private updateScore = async (userId: number, challengeId: number, score: number) => {
    await Crud.Update<IScoreUpdate>({
      score,
      last_try_at: new Date()
    }, 'score', ['user_id', 'challenge_id'], [userId, challengeId]);
  }
}
