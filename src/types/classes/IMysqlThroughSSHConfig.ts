export interface IMysqlThroughSSHConfig {
  ssh_host: string;
  ssh_port: number;
  ssh_username: string;
  ssh_privateKey: string
  database_host: string;
  database_port: number;
  database_name: string;
  database_username: string;
  database_password: string;
}
