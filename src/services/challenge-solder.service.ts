import {ChallengeService} from "./challenge.service";
import {IMysqlThroughSSHConfig} from "../types/classes/IMysqlThroughSSHConfig";
import {SoldierChallenges} from "../challenges/soldier.challenge";

export class ChallengeSolderService extends ChallengeService {

  public constructor(config: IMysqlThroughSSHConfig) {
    super(config, SoldierChallenges);
  }

}
