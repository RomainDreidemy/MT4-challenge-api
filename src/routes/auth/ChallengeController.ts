import {Body, Post, Route, Security, Request} from 'tsoa';
import {ChallengeSolderService} from "../../services/challenge-solder.service";
import {IChallengeResponse} from "../../types/api/challenge/IChallengeResponse";
import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {IUserRequest} from "../../types/api/authentication/IUserRequest";
import {Crud} from "../../classes/Crud";
import {IUser} from "../../types/tables/user/IUser";
import {IChallenge} from "../../types/tables/challenge/IChallenge";
import {ApiError} from "../../classes/Errors/ApiError";

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

    const user = await Crud.Read<IUser>('user', ['id'], [userRequest.id], ['id', 'email', 'batch_id', 'is_admin']);
    const challengeObj = await Crud.Read<IChallenge>('challenge', ['id'], [userRequest.challenge_id], ['id', 'name', 'batch_id']);

    if (!user) {
      throw new ApiError(404, 'sql/not-found', 'Cannot found user in database');
    }

    if (!challengeObj) {
      throw new ApiError(404, 'sql/not-found', 'Cannot found challenge in database');
    }

    const challenge = new ChallengeSolderService(body);

    await challenge.start(user, challengeObj);

    return challenge.getApiResponse();
  }
}
