import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const EXPECTED_REFRESH_TOKENS_COUNT_AFTER_CLEANING = 10000

const invalidRefreshTokens = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select * from refresh_token', config);

  if (response.length !== EXPECTED_REFRESH_TOKENS_COUNT_AFTER_CLEANING) {
    throw new Error();
  }
}

export default invalidRefreshTokens;
