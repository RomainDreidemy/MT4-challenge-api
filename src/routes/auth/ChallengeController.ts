import {Body, Post, Route, Security, Request} from 'tsoa';
import {ChallengeSolderService} from "../../services/challenge-solder.service";
import {IChallengeResponse} from "../../types/api/challenge/IChallengeResponse";
import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {IUserRequest} from "../../types/api/authentication/IUserRequest";

/**
 * Les challenges de la plateforme.
 */
@Route("/challenges")
@Security('jwt')
export class ChallengeController {

  /**
   * Test du challenge soldier.
   */
  @Post("/soldier")
  public async challenge(@Body() body: IMysqlThroughSSHConfig, @Request() request: any): Promise<IChallengeResponse> {

      const userRequest: IUserRequest = request.user.data;

      const challenge = new ChallengeSolderService(body);

      await challenge.start(userRequest);

      return challenge.getApiResponse();
  }
}
