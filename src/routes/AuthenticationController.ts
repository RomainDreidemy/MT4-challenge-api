import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../classes/Crud';
import { ICreateResponse } from '../types/api/ICreateResponse';
import { IIndexResponse } from '../types/api/IIndexQuery';
import { IUpdateResponse } from '../types/api/IUpdateResponse';
import { IUser, IUserCreate, IUserUpdate } from '../types/tables/user/IUser';
import {IAuthenticationBody} from "../types/api/authentication/IAuthenticationBody";

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

    const user = await Crud.Read<IUser>('user', 'email', body.email, READ_COLUMNS);

    console.log(user)

    return 'toto';
  }

}
