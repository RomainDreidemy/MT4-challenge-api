import {IChallengeTest} from "../types/services/Ichallenge";
import databaseConnection from "../exercises/soldier/1-database-connexion.exercise";
import uniqueUsers from "../exercises/soldier/2-unique-users.exercise";

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
    callback: uniqueUsers
  },
];
