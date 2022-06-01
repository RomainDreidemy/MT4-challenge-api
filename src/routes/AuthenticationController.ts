import { Body, Delete, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { Crud } from '../classes/Crud';
import { ICreateResponse } from '../types/api/ICreateResponse';
import { IIndexResponse } from '../types/api/IIndexQuery';
import { IUpdateResponse } from '../types/api/IUpdateResponse';
import { IUser, IUserCreate, IUserUpdate } from '../types/tables/user/IUser';
import {IAuthenticationBody} from "../types/api/authentication/IAuthenticationBody";

const READ_COLUMNS = ['userId', 'familyName', 'givenName', 'email'];

/**
 * Un utilisateur de la plateforme.
 */
@Route("/login")
@Security('jwt')
export class UserController {

  /**
   * Envoyer un mail à l'utilisateur pour ce connecter.
   */
  @Post()
  public async getUsers(@Body() body: IAuthenticationBody): Promise<IIndexResponse<IUser>> {
    return Crud.Index<IUser>({ page: 0, limit: 2 }, 'user', READ_COLUMNS);
  }

}
