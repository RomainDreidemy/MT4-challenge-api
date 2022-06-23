import {IChallengeTest} from "../types/services/Ichallenge";
import databaseConnection from "../exercises/soldier/1-database-connexion.exercise";
import usersUniqueness from "../exercises/soldier/2-users-uniqueness.exercise";
import invalidRefreshTokens from "../exercises/soldier/3-invalid-refresh-token.exercise";
import handleSoldiersRank from "../exercises/soldier/4-soldier-rank.exercise";

export const SoldierChallenges: IChallengeTest[] = [
  {
    subject: 'Test de la connexion à votre base de données',
    points: 2,
    successMessage: 'nous nous sommes connecté à votre base de données avec succès.',
    errorMessage: 'nous n\'avons pas pu nous connecter à votre base de données.',
    callback: databaseConnection
  },
  {
    subject: 'Rendre la liste des utilisateurs unique.',
    points: 4,
    successMessage: 'la liste des utilisateurs est unique.',
    errorMessage: 'la liste des utilisateurs n\'est pas unique.',
    callback: usersUniqueness
  },
  {
    subject: 'Suppression des tokens invalides.',
    points: 2,
    successMessage: 'les tokens restant sont les bons.',
    errorMessage: 'les tokens restant ne sont pas les bons',
    callback: invalidRefreshTokens
  },
  {
    subject: 'Gestions des rangs de soldat.',
    points: 3,
    successMessage: 'les rangs de soldat sont gérés correctement.',
    errorMessage: 'les rangs de soldat ne sont pas gérés correctement',
    callback: handleSoldiersRank
  },
];
