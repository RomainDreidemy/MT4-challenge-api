import {IChallengeTest} from "../types/services/Ichallenge";
import {MysqlThroughSSH} from "../classes/MysqlThroughSSH";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";

export const SoldierChallenges: IChallengeTest[] = [
  {
    subject: 'Test de la connexion à votre base de données',
    points: 2,
    successMessage: 'Nous avons pu nous connecter à votre base de données',
    errorMessage: 'Nous n\'avons pas pu nous connecter à votre base de données',
    callback: async (config: IMysqlThroughSSHConfig) => {
      try {
        await MysqlThroughSSH.query('show tables', config);
      } catch (err) {
        throw new ApiError(ErrorCode.InternalError, 'internal/unknown', 'Internal server testMysqlInstallation', err);
      }
    }
  },
  {
    subject: 'Test si il y a 2 tables dans la base de données',
    points: 1,
    successMessage: 'Il y a bien 2 tables dans la base de données',
    errorMessage: 'Il n\'y a pas 2 tables dans la base de données',
    callback: async (config: IMysqlThroughSSHConfig) => {
        const tables = await MysqlThroughSSH.query('show tables', config);
        if (tables.length !== 2) {
          throw new Error('not enough tables');
        }
    }
  },
];
