import {Client, ClientChannel, ConnectConfig} from 'ssh2';
import mysql, {Connection, ConnectionOptions} from 'mysql2';
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";

export class MysqlThroughSSH {

  public static connect(config: IMysqlThroughSSHConfig): Promise<Connection> {
      const sshClient = new Client();

      return new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
          sshClient.forwardOut(
            '127.0.0.1',
            config.database_port,
            config.ssh_host,
            config.database_port,
            (err, stream) => {
              if (err) {
                reject(err);
              }

              const connection = mysql.createConnection(this.getMysqlConnectionOptions(config, stream));

              connection.connect((error) => {
                if (error) {
                  reject(error);
                }
                resolve(connection);
              });
            });
        }).connect(this.getSshConnectConfig(config));
      })
  }

  private static getMysqlConnectionOptions(config: IMysqlThroughSSHConfig, stream: ClientChannel): ConnectionOptions {
    return {
      ...{
        host: config.ssh_host,
        port: config.database_port,
        user: config.database_username,
        password: config.database_password,
        database: config.database_name
      },
      stream
    }
  }

  private static getSshConnectConfig(config: IMysqlThroughSSHConfig): ConnectConfig {
    return {
      host: config.ssh_host,
      port: config.ssh_port,
      username: config.ssh_username,
      privateKey: config.ssh_privateKey
    }
  }

  public static async query(query: string, config: IMysqlThroughSSHConfig): Promise<any> {
    const connection = await this.connect(config);

    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      })
    })
  }
}
