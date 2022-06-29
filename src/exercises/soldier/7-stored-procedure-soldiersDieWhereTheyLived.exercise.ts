import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";
import {ISoldierDepartmentCount} from "../../types/challenges/exercises/ISoldierDepartmentCount";
import {ChallengeExpectedRaiseError} from "../../classes/Errors/ChallengeExpectedRaiseError";
import {MysqlUniquenessError} from "../../classes/Errors/MysqlUniquenessError";

const storedProcedureSoldiersDieWhereTheyLived = async (config: IMysqlThroughSSHConfig) => {
  await checkCountOfDepartment(config);

  await checkWhenADepartmentDoesNotExist(config);
}

const checkCountOfDepartment = async (config: IMysqlThroughSSHConfig) => {
  const departments: ISoldierDepartmentCount[] = [
    { value: 'Alpes Maritimes', expectedCount: 2962 },
    { value: 'Ain', expectedCount: 48 },
    { value: 'Bouches du Rhône', expectedCount: 656 },
    { value: 'Rhône', expectedCount: 18 },
  ];

  await testCountDepartments(departments, config);
}

const checkWhenADepartmentDoesNotExist = async (config: IMysqlThroughSSHConfig) => {
  try {
    await MysqlThroughSSH.query(`call soldiersDieWhereTheyLived('xxxxxx')`, config);

    throw new ChallengeExpectedRaiseError('appeler un département qui n\'existe pas devrait lever un exception.')
  } catch (err) {
    if (err instanceof ChallengeExpectedRaiseError) {
      throw new Error(err.message);
    }
  }
}

const testCountDepartments = async (departments: ISoldierDepartmentCount[], config:IMysqlThroughSSHConfig) => {
  for (const department of departments) {
    const query = `call soldiersDieWhereTheyLived('${department.value}')`;
    const response = await MysqlThroughSSH.query(query, config);
    const soldier = response[response.length - 2][0];
    const nb_soldier = soldier.nb_soldier;

    if (nb_soldier !== department.expectedCount) {
      throw new Error(`la valeur retourné n\'est pas correcte ${department.value} = ${nb_soldier}`);
    }
  }
}

export default storedProcedureSoldiersDieWhereTheyLived;
