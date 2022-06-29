import {IChallengeTest} from "../types/services/Ichallenge";
import databaseConnection from "../exercises/soldier/1-database-connexion.exercise";
import usersUniqueness from "../exercises/soldier/2-users-uniqueness.exercise";
import invalidRefreshTokens from "../exercises/soldier/3-invalid-refresh-token.exercise";
import handleSoldiersRank from "../exercises/soldier/4-soldier-rank.exercise";
import soldierImageDomain from "../exercises/soldier/5-soldier-image-domain.exercise";
import soldierLifeDeathDepartment from "../exercises/soldier/6-soldier-life-death-department.exercise";

export const SoldierChallenges: IChallengeTest[] = [
  // {
  //   subject: 'Test de la connexion à votre base de données',
  //   points: 2,
  //   successMessage: 'nous nous sommes connecté à votre base de données avec succès.',
  //   errorMessage: 'nous n\'avons pas pu nous connecter à votre base de données.',
  //   callback: databaseConnection
  // },
  // {
  //   subject: 'Rendre la liste des utilisateurs unique.',
  //   points: 4,
  //   successMessage: 'la liste des utilisateurs est unique.',
  //   errorMessage: 'la liste des utilisateurs n\'est pas unique.',
  //   callback: usersUniqueness
  // },
  // {
  //   subject: 'Suppression des tokens invalides.',
  //   points: 2,
  //   successMessage: 'les tokens restant sont les bons.',
  //   errorMessage: 'les tokens restant ne sont pas les bons',
  //   callback: invalidRefreshTokens
  // },
  // {
  //   subject: 'Gestions des rangs de soldat.',
  //   points: 3,
  //   successMessage: 'les rangs de soldat sont gérés correctement.',
  //   errorMessage: 'les rangs de soldat ne sont pas gérés correctement',
  //   callback: handleSoldiersRank
  // },
  // {
  //   subject: 'Remplacement du nom de domain pour les images de soldat.',
  //   points: 2,
  //   successMessage: 'les urls des images ont bien été modifié.',
  //   errorMessage: 'toutes les urls d\'image n\'ont pas été modifié.',
  //   callback: soldierImageDomain
  // },
  // {
  //   subject: 'Remplacement du nom de domain pour les images de soldat.',
  //   points: 2,
  //   successMessage: 'les urls des images ont bien été modifié.',
  //   errorMessage: 'toutes les urls d\'image n\'ont pas été modifié.',
  //   callback: soldierImageDomain
  // },
  // {
  //   subject: 'Refactoriser les colonnes death_department et life_after_department.',
  //   points: 4,
  //   successMessage: 'les colonnes ont été refactorisé correctement.',
  //   errorMessage: 'les colonnes n\'ont pas été refactorisé correctement.',
  //   callback: soldierLifeDeathDepartment
  // },
  {
    subject: 'Créer une procédure stockée .',
    points: 3,
    successMessage: 'La procédure stockée fonctionne.',
    errorMessage: 'La procédure stockée ne fonctionne pas.',
    callback: storedProcedureSoldiersDieWhereTheyLived
  },
  {
    subject: 'Créer une procédure stockée getSolderInjuredOrKilled(start_date, end_date).',
    points: 5,
    successMessage: 'les colonnes ont été refactorisé correctement.',
    errorMessage: 'les colonnes n\'ont pas été refactorisé correctement.',
    callback: soldierLifeDeathDepartment
  },
];
