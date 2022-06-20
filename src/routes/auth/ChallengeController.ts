import { Body, Post, Route } from 'tsoa';
import {ChallengeSolderService} from "../../services/challenge-solder.service";
import {IChallengeResponse} from "../../types/api/challenge/IChallengeResponse";
import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";

/**
 * Les challenges de la plateforme.
 */
@Route("/challenges")
export class ChallengeController {

  /**
   * Test du challenge soldier.
   */
  @Post("/soldier")
  public async challenge(@Body() body: IMysqlThroughSSHConfig): Promise<IChallengeResponse> {

      const challenge = new ChallengeSolderService(body);

      await challenge.start();

      return challenge.getApiResponse();
  }
}
