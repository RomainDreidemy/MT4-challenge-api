

/**
 * Un utilisateur de la plateforme.
 */
export interface IScore {
  id: number;
  user_id: number;
  challenge_id: number;
  score: number;
  first_try_at: datetime;
  last_try_at: datetime;
}

export type IScoreCreate = Omit<IScore, 'id'>;
export type IScoreUpdate = Partial<IScoreCreate>;
export type IScoreRO = Readonly<IScore>;
