import { Body, Post, Route } from 'tsoa';
import {SSH} from "../../classes/SSH";
import {ISSHConfig} from "../../types/classes/SSH/ISSH";
import {ApiError} from "../../classes/Errors/ApiError";
import {ErrorCode} from "../../classes/Errors/ErrorCode";
import {ChallengeService} from "../../services/challenge.service";
import {ChallengeSolderService} from "../../services/challenge-solder.service";
import {IChallengeResponse} from "../../types/api/challenge/IChallengeResponse";

/**
 * Les challenges de la plateforme.
 */
@Route("/challenges")
export class ChallengeController {

  /**
   * Test du challenge soldier.
   */
  @Post("/soldier")
  public async challenge(@Body() body: ISSHConfig): Promise<IChallengeResponse> {
      const challenge = new ChallengeSolderService(body);

      await challenge.start();

      return challenge.getApiResponse();
  }
}
