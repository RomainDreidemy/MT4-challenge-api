import {IChallengeTest} from "../types/services/Ichallenge";
import {MysqlThroughSSH} from "../classes/MysqlThroughSSH";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";
import databaseConnection from "../exercises/soldier/1-database-connexion.exercise";

export const SoldierChallenges: IChallengeTest[] = [
  {
    subject: 'Test de la connexion à votre base de données',
    points: 2,
    successMessage: 'nous nous sommes connecté à votre base de données avec succès.',
    errorMessage: 'nous n\'avons pas pu nous connecter à votre base de données.',
    callback: databaseConnection
  }
];
