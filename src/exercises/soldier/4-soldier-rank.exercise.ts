import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const EXPECTED_RANK_COUNT = 27;

const handleSoldiersRank = async (config: IMysqlThroughSSHConfig) => {
  await checkIfTableExist(config);

  await checkCountOfSoldierRank(config);
}

const checkIfTableExist = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_table from information_schema.tables where table_type = "BASE TABLE" and table_name = "soldier_rank_type"', config);
  const nb_table = response[0].nb_table;

  if (nb_table !== 1) {
    throw new Error('la table "soldier_rank_type" n\'existe pas dans la base de données.');
  }
}

const checkCountOfSoldierRank = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_rank from soldier_rank_type', config);
  const nb_rank = response[0].nb_rank;

  if (nb_rank !== EXPECTED_RANK_COUNT) {
    throw new Error('il y a trop ou pas assez de rang dans la table soldier_rank_type');
  }
}

export default handleSoldiersRank;
