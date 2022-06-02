

/**
 * Un utilisateur de la plateforme.
 */
export interface IUser {
  id: number;
  email: string;
  batch_id: number;
}

export type IUserCreate = Omit<IUser, 'id'>;
export type IUserUpdate = Partial<IUserCreate>;
export type IUserRO = Readonly<IUser>;
