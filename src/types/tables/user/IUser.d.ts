

/**
 * Un utilisateur de la plateforme.
 */
export type IUserIsAdmin = 0|1;

export interface IUser {
  id: number;
  email: string;
  batch_id: number;
  is_admin: IUserIsAdmin
}

export type IUserCreate = Omit<IUser, 'id'>;
export type IUserUpdate = Partial<IUserCreate>;
export type IUserRO = Readonly<IUser>;
