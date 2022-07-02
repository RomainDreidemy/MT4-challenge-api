import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";
import {ChallengeExpectedRaiseError} from "../../classes/Errors/ChallengeExpectedRaiseError";

const storedProcedureGetSoldierInjuredOrKilled = async (config: IMysqlThroughSSHConfig) => {
  await checkIfBadDateRaiseError(config);

  await checkSoldierInjuredOrKilledCount(config);
}

const checkSoldierInjuredOrKilledCount = async (config: IMysqlThroughSSHConfig) => {
    const response = await MysqlThroughSSH.query("call getSolderInjuredOrKilled(DATE('2012-06-10'), DATE('2022-06-21'))", config);
    const result = response[response.length - 2][0];
    const soldat_injured = result?.soldat_injured;
    const soldat_killed = result?.soldat_killed;

    if (!soldat_injured || !soldat_killed) {
      throw new Error('les clés soldat_injured et soldat_killed ne sont pas présente.')
    }

    if (soldat_injured !== 18190 || soldat_killed !== 9032) {
      throw new Error('le compte de soldat bléssé et de soldat tué n\'est pas bon.')
    }
}

const checkIfBadDateRaiseError = async (config: IMysqlThroughSSHConfig) => {
  try {
    await MysqlThroughSSH.query(`call getSolderInjuredOrKilled(DATE('2022-07-11'), DATE('2022-06-10'))`, config);

    throw new ChallengeExpectedRaiseError('mettre une date de début supérieur à la date de fin devrait lever une exception.');
  } catch (err) {
    if (err instanceof ChallengeExpectedRaiseError) {
      throw new Error(err.message);
    }
  }
}

export default storedProcedureGetSoldierInjuredOrKilled;
