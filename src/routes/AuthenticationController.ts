import { Body, Post, Route } from 'tsoa';
import { Crud } from '../classes/Crud';
import { IUser, IUserCreate } from '../types/tables/user/IUser';
import {IAuthenticationBody} from "../types/api/authentication/IAuthenticationBody";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";

const READ_COLUMNS = ['id', 'email', 'batch_id'];

/**
 * Un utilisateur de la plateforme.
 */
@Route("/login")
export class UserController {

  /**
   * Envoyer un mail à l'utilisateur pour ce connecter.
   */
  @Post()
  public async getUsers(@Body() body: IAuthenticationBody): Promise<string> {

    try {
      const user = await Crud.Read<IUser>('user', 'email', body.email, READ_COLUMNS);
    } catch (err: any) {

      if (err.structured === 'sql/not-found') {
        const response = await Crud.Create<IUserCreate>({ email: body.email, batch_id: 1 }, 'user');

        console.log(response);
      } else {
        throw new ApiError(ErrorCode.BadRequest, 'internal/unknown', `Internal server error`);
      }
    }


    return 'toto';
  }

}
