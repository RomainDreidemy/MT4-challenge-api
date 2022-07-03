import {IChallengeExercise} from "../types/services/Ichallenge";
import databaseConnection from "../exercises/soldier/1-database-connexion.exercise";
import usersUniqueness from "../exercises/soldier/2-users-uniqueness.exercise";
import invalidRefreshTokens from "../exercises/soldier/3-invalid-refresh-token.exercise";
import handleSoldiersRank from "../exercises/soldier/4-soldier-rank.exercise";
import soldierImageDomain from "../exercises/soldier/5-soldier-image-domain.exercise";
import soldierLifeDeathDepartment from "../exercises/soldier/6-soldier-life-death-department.exercise";
import storedProcedureSoldiersDieWhereTheyLived
  from "../exercises/soldier/7-stored-procedure-soldiersDieWhereTheyLived.exercise";
import storedProcedureGetSoldierInjuredOrKilled
  from "../exercises/soldier/8-stored-procedure-getSolderInjuredOrKilled.exercise";

export const SoldierChallenges: IChallengeExercise[] = [
  {
    subject: 'Test de la connexion à votre base de données',
    description: 'Créer votre base de données mariadb sur un serveur.',
    points: 2,
    successMessage: 'nous nous sommes connecté à votre base de données avec succès.',
    errorMessage: 'nous n\'avons pas pu nous connecter à votre base de données.',
    callback: databaseConnection
  },
  {
    subject: 'Rendre la liste des utilisateurs unique.',
    description: 'Les emails des utilisateurs ne sont pas unique. Rendez les unique. Attention pensez à réaffecter les soldats correctement.',
    points: 4,
    successMessage: 'la liste des utilisateurs est unique.',
    errorMessage: 'la liste des utilisateurs n\'est pas unique.',
    callback: usersUniqueness
  },
  {
    subject: 'Suppression des tokens invalides.',
    description: 'Supprimez tous les tokens dont vous ne trouvez pas l\'adresse email ou dont la date a expiré.',
    points: 2,
    successMessage: 'les tokens restant sont les bons.',
    errorMessage: 'les tokens restant ne sont pas les bons',
    callback: invalidRefreshTokens
  },
  {
    subject: 'Gestions des rangs de soldat.',
    description: 'Créer une table \'soldier_rank_type\' qui contiendra une liste unique de tous les rangs. Puis créer dans la table \'soldier\' une colonne \'rank_id\' et associé le bon rang. Si un soldat n\'a pas de rang, lui associé le rang \'soldat_rank_unknow\'.',
    points: 3,
    successMessage: 'les rangs de soldat sont gérés correctement.',
    errorMessage: 'les rangs de soldat ne sont pas gérés correctement',
    callback: handleSoldiersRank
  },
  {
    subject: 'Remplacement du nom de domain pour les images de soldat.',
    description: 'Dans la table \'soldier_image\' remplacer le nom de domaine des images par \'challenge.com\'.',
    points: 2,
    successMessage: 'les urls des images ont bien été modifié.',
    errorMessage: 'toutes les urls d\'image n\'ont pas été modifié.',
    callback: soldierImageDomain
  },
  {
    subject: 'Refactoriser les colonnes death_department et life_after_department.',
    description: 'À partir de la table \'soldier\', créer une table \'soldier_death_department\' qui regroupe tous les départements où les soldats sont décédés et créer une relation grâche à une colonne \'death_department_id\'.<br><br>' +
      'À partir de la table \'soldier\', créer une table \'soldier_life_after_department\' qui regroupe tous les départements où les soldats ont vécus et créer une relation grâche à une colonne \'life_after_department_id\'.<br><br>',
    points: 4,
    successMessage: 'les colonnes ont été refactorisé correctement.',
    errorMessage: 'les colonnes n\'ont pas été refactorisé correctement.',
    callback: soldierLifeDeathDepartment
  },
  {
    subject: 'Créer une procédure stockée soldiersDieWhereTheyLived(department).',
    description: 'Faire une procédure stockée qui prend en argument un département et permet de récupérer le nombre de soldat qui sont morts dans le departement où ils ont habités après la guerre. Retourne le résultat avec comme alias \'nb_soldier\'',
    points: 3,
    successMessage: 'La procédure stockée fonctionne.',
    errorMessage: 'La procédure stockée ne fonctionne pas.',
    callback: storedProcedureSoldiersDieWhereTheyLived
  },
  {
    subject: 'Créer une procédure stockée getSolderInjuredOrKilled(start_date, end_date).',
    description: 'Créer une procédure stockée qui retournera le nombre de soldat bléssé et le nombre soldat tué avec comme alias \'nb_soldier_injured\' et \'nb_soldier_killed\'',
    points: 5,
    successMessage: 'La procédure stockée fonctionne.',
    errorMessage: 'la procédure stocké ne fonctionne pas.',
    callback: storedProcedureGetSoldierInjuredOrKilled
  },
];
