import {Body, Post, Route} from 'tsoa';
import {IAuthenticationBody} from "../types/api/authentication/IAuthenticationBody";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IAuthenticationResponse} from "../types/api/authentication/IAuthenticationResponse";
import {UserServices} from "../services/user.services";

/**
 * Un utilisateur de la plateforme.
 */
@Route("/login")
export class UserController {

  /**
   * Envoyer un mail à l'utilisateur pour ce connecter.
   */
  @Post()
  public async getUsers(@Body() body: IAuthenticationBody): Promise<IAuthenticationResponse> {

    await UserServices.authenticate(body.email, body?.challenge_id, body?.admin);

    return {email: body.email};
  }
}
