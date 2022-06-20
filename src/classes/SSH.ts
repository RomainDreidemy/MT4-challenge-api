import {NodeSSH} from "node-ssh";
import {ISSHConfig} from "../types/classes/SSH/ISSH";

export class SSH {
  public static async getConnection(config: ISSHConfig): Promise<NodeSSH> {
    const ssh = new NodeSSH()

    return await ssh.connect(config);
  }
}
