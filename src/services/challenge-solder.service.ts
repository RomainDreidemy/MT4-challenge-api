import {ISSHConfig} from "../types/classes/SSH/ISSH";
import {ChallengeService} from "./challenge.service";
import {IChallengeStepResponse} from "../types/services/Ichallenge";
import {SSH} from "../classes/SSH";
import {ApiError} from "../classes/Errors/ApiError";
import {ChallengeError} from "../classes/Errors/ChallengeError";
import {ErrorCode} from "../classes/Errors/ErrorCode";

const POINTS_TO_WIN = 25;

export class ChallengeSolderService extends ChallengeService {

  public constructor(sshConfig: ISSHConfig) {
    super(sshConfig, POINTS_TO_WIN);
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

    const server = await SSH.getConnection(this.sshConfig);

    const response = await server.execCommand('mysql');

    if (response.stdout.length > 0) {
      stepResponse.status = true;
      stepResponse.message = 'Nous avons trouvé mysql sur votre instance.';
      this.addPoints(stepResponse.points);
    } else {
      throw new ChallengeError(stepResponse,"Nous n'avons pas trouvé mysql sur votre instance.")
    }

    return stepResponse;
  }
}
