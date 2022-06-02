

/**
 * Un utilisateur de la plateforme.
 */
export interface IChallenge {
  id: number;
  name: string;
  batch_id: number;
}

export type IChallengeCreate = Omit<IChallenge, 'id'>;
export type IChallengeUpdate = Partial<IChallengeCreate>;
export type IChallengeRO = Readonly<IChallenge>;
