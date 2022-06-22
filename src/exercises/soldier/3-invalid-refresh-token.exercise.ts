import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const EXPECTED_REFRESH_TOKENS_COUNT_AFTER_CLEANING = 627;

const invalidRefreshTokens = async (config: IMysqlThroughSSHConfig) => {
  await checkCountOfRefreshToken(config);

  await checkIfTheGoodRefreshTokensAreDeleted(config);
}

const checkCountOfRefreshToken = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_refresh_token from refresh_tokens', config);
  const nb_refresh_token = response[0].nb_refresh_token;

  if (nb_refresh_token !== EXPECTED_REFRESH_TOKENS_COUNT_AFTER_CLEANING) {
    throw new Error('le nombre de refresh token restant n\'est pas le bon.');
  }
}

const checkIfTheGoodRefreshTokensAreDeleted = async (config: IMysqlThroughSSHConfig) => {
  const refreshTokenIds: string[] = [
    '604ab826e68da5bff7122aa09bf8b78544eade6346a45e91d91a75a298406493',
    '963fbcf43ea477ae38aa5087f53d1f52489090c4e72fec9209ed4bdaaac6760d',
    '02c0d4a70e65d940b4cbbbac50e8ece40f185db409fa784d07312c12d07751aa',
    'c25061154c90de6a2babbeb3fc0f4fe077c53dad0073a7e6dd1be6ed9c882214'
  ];

  const stringIds = `"${refreshTokenIds.join('"," ')}"`;

  const response = await MysqlThroughSSH.query(`select count(*) as nb_refresh_token from refresh_tokens where id in (${stringIds})`, config);
  const nb_refresh_token = response[0].nb_refresh_token;

  if (nb_refresh_token !== 0) {
    throw new Error('les refresh tokens supprimés ne sont pas les bons !');
  }
}

export default invalidRefreshTokens;
