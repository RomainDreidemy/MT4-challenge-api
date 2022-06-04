import {ChallengeService} from "./challenge.service";
import {IChallengeStepResponse} from "../types/services/Ichallenge";
import {ApiError} from "../classes/Errors/ApiError";
import {ChallengeError} from "../classes/Errors/ChallengeError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {MysqlThroughSSH} from "../classes/MysqlThroughSSH";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";

const POINTS_TO_WIN = 25;

export class ChallengeSolderService extends ChallengeService {

  public constructor(config: IMysqlThroughSSHConfig) {
    super(config, POINTS_TO_WIN);
  }

  async start(): Promise<void> {
    try {
      this.responses.push( await this.testMysqlInstallation());
    } catch (err) {
      if (err instanceof ChallengeError) {
        this.responses.push(err.getApiStepResponse());
      } else {
        throw new ApiError(ErrorCode.InternalError, 'internal/unknown', 'Internal server error', err);
      }
    }
  }

  private async testMysqlInstallation(): Promise<IChallengeStepResponse> {
    const stepResponse: IChallengeStepResponse = {
      subject: 'Test de la présence de mysql sur votre instance.',
      status: false,
      points: 2,
      message: ''
    }

    console.log(this.config);

    try {
      const response = await MysqlThroughSSH.query('show tables', this.config);

      console.log(response)

      stepResponse.status = true;
      stepResponse.message = 'Nous avons trouvé mysql sur votre instance.';
      this.addPoints(stepResponse.points);

    } catch (err) {
      throw new ChallengeError(stepResponse,"Nous n'avons pas trouvé mysql sur votre instance.");
    }

    return stepResponse;
  }
}
