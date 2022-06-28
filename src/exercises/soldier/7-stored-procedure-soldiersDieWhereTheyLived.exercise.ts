import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";
import {ISoldierDepartmentCount} from "../../types/challenges/exercises/ISoldierDepartmentCount";

const storedProcedureSoldiersDieWhereTheyLived = async (config: IMysqlThroughSSHConfig) => {
  await checkCountOfDepartment(config);
}


const checkCountOfDepartment = async (config: IMysqlThroughSSHConfig) => {
  const departments: ISoldierDepartmentCount[] = [
    { value: 'Alpes Maritimes', expectedCount: 2962 },
    { value: 'Ain', expectedCount: 48 },
    { value: 'Bouches du Rhône', expectedCount: 656 },
    { value: 'Rhône', expectedCount: 18 },
  ];

  for (const department of departments) {
    const response = await MysqlThroughSSH.query(`call soldiersDieWhereTheyLived('${department.value}')`, config);
    const soldier = response[response.length - 2][0];
    const nb_soldier = soldier.nb_soldier;

    if (nb_soldier !== department.expectedCount) {
      throw new Error(`La valeur retourné n\'est pas correcte ${department.value} = ${nb_soldier}`);
    }
  }
}

export default storedProcedureSoldiersDieWhereTheyLived;
