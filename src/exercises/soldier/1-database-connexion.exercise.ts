import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const databaseConnection = async (config: IMysqlThroughSSHConfig) => {
  await MysqlThroughSSH.query('show tables', config);
}

export default databaseConnection;
