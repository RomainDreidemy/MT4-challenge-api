import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const EXPECTED_USERS_COUNT_AFTER_CLEANING = 10000;

const uniqueUsers = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select * from user', config);

  if (response.length !== EXPECTED_USERS_COUNT_AFTER_CLEANING) {
    throw new Error();
  }
}

export default uniqueUsers;
