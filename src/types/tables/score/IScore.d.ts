

/**
 * Un utilisateur de la plateforme.
 */
export interface IScore {
  id: number;
  user_id: number;
  challenge_id: number;
  score: number;
  first_try_at: Date;
  last_try_at: Date;
}

export type IScoreCreate = Omit<IScore, 'id'>;
export type IScoreUpdate = Partial<IScoreCreate>;
export type IScoreRO = Readonly<IScore>;
