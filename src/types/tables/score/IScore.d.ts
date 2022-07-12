/**
 * Un utilisateur de la plateforme.
 */
import {IUser} from "../user/IUser";

export interface IScore {
  id: number;
  user_id: number;
  challenge_id: number;
  score: number;
  first_try_at: Date;
  last_try_at: Date;
}

export interface IScoreResponse {
  id?: number;
  score?: number;
  email: IUser['email'];
  first_try_at?: Date;
  last_try_at?: Date;
}

export type IScoreCreate = Omit<IScore, 'id'>;
export type IScoreUpdate = Partial<IScoreCreate>;
export type IScoreRO = Readonly<IScore>;
