import { Body, Post, Route } from 'tsoa';
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

    try {
      await UserServices.authenticate(body.email, body.admin, body?.challenge_id);

    } catch (err) {
        throw new ApiError(ErrorCode.BadRequest, 'internal/unknown', `Internal server error`, err);
    }

    return { email: body.email };
  }
}
