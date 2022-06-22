import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";
import {QueryError} from "mysql2";
import {MysqlUniquenessError} from "../../classes/Errors/MysqlUniquenessError";

const EXPECTED_USERS_COUNT_AFTER_CLEANING = 500;
const EXPECTED_SOLDIER_COUNT_AFTER_CLEANING = 100_000;

const usersUniqueness = async (config: IMysqlThroughSSHConfig) => {
  await checkUsersCount(config);

  await checkSoldierCount(config);

  await checkEmailUniqueness(config);
}

const checkUsersCount = async (config: IMysqlThroughSSHConfig) => {
  const users = await MysqlThroughSSH.query('select * from user', config);
  const nb_of_user = users.length;

  if (nb_of_user > EXPECTED_USERS_COUNT_AFTER_CLEANING) {
    throw new Error('trop d\'utilisateurs sont visible dans la base de données');
  }

  if (nb_of_user < EXPECTED_USERS_COUNT_AFTER_CLEANING) {
    throw new Error('vous avez supprimer trop d\'utilisateurs dans la base de données');
  }
}

const checkSoldierCount = async (config: IMysqlThroughSSHConfig) => {
  const soldier = await MysqlThroughSSH.query('select * from soldier', config);
  const nb_of_soldier = soldier.length;

  if (nb_of_soldier !== EXPECTED_SOLDIER_COUNT_AFTER_CLEANING) {
    throw new Error('le nombre de soldat dans la base de données, n\'est pas le nombre attendu.');
  }
}

const checkEmailUniqueness = async (config: IMysqlThroughSSHConfig) => {
  // Send two queries to check if the email uniqueness constraint work
  // If the two request don't throw error so the uniqueness constraint doesn't work and we throw a MysqlUniquenessError.
  // If the uniqueness work, mysql will throw a QueryError, so we catch this error and we do nothing to tell the challenge "all is good"
  try {
    await MysqlThroughSSH.query('insert into user (id, email, password, roles) values ("XXXX-CHALLENGE-1","challenge@challenge.net", "password", "[]")', config);
    await MysqlThroughSSH.query('insert into user (id, email, password, roles) values ("XXXX-CHALLENGE-2", "challenge@challenge.net", "password", "[]")', config);

    throw new MysqlUniquenessError('L\'email n\'est pas défini comme unique.');

  } catch (err: QueryError|MysqlUniquenessError|any) {
    await MysqlThroughSSH.query('delete from user where email = "challenge@challenge.net"', config);

    if (err instanceof MysqlUniquenessError) {
      throw new Error(err.message);
    }
  }
}

export default usersUniqueness;
