import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const EXPECTED_DEATH_DEPARTMENT = 17;
const EXPECTED_LIFE_DEPARTMENT = 5;

const soldierLifeDeathDepartment = async (config: IMysqlThroughSSHConfig) => {
  await checkSoldierDeathDepartmentCount(config);

  await checkDeathDepartementIdsInSoldierTable(config);
}

const checkSoldierDeathDepartmentCount = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_department from soldier_death_department', config);
  const nb_department = response[0].nb_department;

  if (nb_department !== EXPECTED_DEATH_DEPARTMENT) {
    throw new Error('le nombre de département dans la table \'soldier_death_department\' ne correspond pas avec ce qui est attendu.')
  }
}

const checkDeathDepartementIdsInSoldierTable = async (config: IMysqlThroughSSHConfig) => {
  interface SoldierDepartmentCount {
    value: string,
    expectedCount: number
  }

  const departments: SoldierDepartmentCount[] = [
    { value: 'Allemagne', expectedCount: 20506 },
    { value: 'Allier', expectedCount: 2555 },
    { value: 'Alpes Maritimes', expectedCount: 35932 },
    { value: 'Rhône', expectedCount: 2608 },
    { value: 'Saône et Loire', expectedCount: 2577 },
    { value: 'Pyrénées Orientales', expectedCount: 2462 },
    { value: 'Calvavdos', expectedCount: 2530 },
  ];

  for (const department of departments) {
    const query = `select count(*) from soldier_death_department sdd inner join soldier s on sdd.id = s.death_department_id and sdd.name = "${department.value}"`;
    const response = await MysqlThroughSSH.query(query, config);
    const nb_department = response[0].nb_department;

    if (nb_department !== department.expectedCount) {
      throw new Error('la relation entre les départements et les soldats n\'a pas été fait correctement.')
    }
  }
}

export default soldierLifeDeathDepartment;
