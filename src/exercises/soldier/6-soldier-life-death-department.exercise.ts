import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";
import {ISoldierDepartmentCount} from "../../types/challenges/exercises/ISoldierDepartmentCount";

const EXPECTED_DEATH_DEPARTMENT = 17;
const EXPECTED_LIFE_DEPARTMENT = 30;

const soldierLifeDeathDepartment = async (config: IMysqlThroughSSHConfig) => {
  await checkSoldierDeathDepartmentCount(config);

  await checkDeathDepartmentIdsInSoldierTable(config);

  await checkSoldierLifeDepartmentCount(config);

  await checkLifeDepartmentIdsInSoldierTable(config);
}

const checkSoldierDeathDepartmentCount = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_department from soldier_death_department', config);
  const nb_department = response[0].nb_department;

  if (nb_department !== EXPECTED_DEATH_DEPARTMENT) {
    throw new Error('le nombre de département dans la table \'soldier_death_department\' ne correspond pas avec ce qui est attendu.')
  }
}

const checkDeathDepartmentIdsInSoldierTable = async (config: IMysqlThroughSSHConfig) => {
  const departments: ISoldierDepartmentCount[] = [
    { value: 'Allemagne', expectedCount: 20506 },
    { value: 'Allier', expectedCount: 2555 },
    { value: 'Alpes Maritimes', expectedCount: 35932 },
    { value: 'Rhône', expectedCount: 2608 },
    { value: 'Saône et Loire', expectedCount: 2577 },
    { value: 'Pyrénées Orientales', expectedCount: 2462 },
    { value: 'Calvavdos', expectedCount: 2530 },
  ];

  await testCountDepartments('soldier_death_department','death_department_id', departments, config);
}

const checkSoldierLifeDepartmentCount = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_department from soldier_life_after_department', config);
  const nb_department = response[0].nb_department;

  if (nb_department !== EXPECTED_LIFE_DEPARTMENT) {
    throw new Error('le nombre de département dans la table \'soldier_life_after_department\' ne correspond pas avec ce qui est attendu.')
  }
}

const checkLifeDepartmentIdsInSoldierTable = async (config: IMysqlThroughSSHConfig) => {
  const departments: ISoldierDepartmentCount[] = [
      { value: 'Alpes Maritimes', expectedCount: 8321 },
      { value: 'Ain', expectedCount: 1514 },
      { value: 'Basse Pyrénées', expectedCount: 728 },
      { value: 'Ile de France', expectedCount: 5247 },
      { value: 'Var', expectedCount: 28481 },
      { value: 'Seine et Oise', expectedCount: 769 },
    ];

  await testCountDepartments('soldier_life_after_department', 'life_after_department_id', departments, config);
}

const testCountDepartments = async (table: string, relation_column_name: string, departments: ISoldierDepartmentCount[], config:IMysqlThroughSSHConfig) => {
  for (const department of departments) {
    const query = `select count(*) as nb_department from ${table} sdd inner join soldier s on sdd.id = s.${relation_column_name} and sdd.name = "${department.value}"`;
    const response = await MysqlThroughSSH.query(query, config);
    const nb_department = response[0].nb_department;

    if (nb_department !== department.expectedCount) {
      throw new Error('la relation entre les départements et les soldats n\'a pas été fait correctement.')
    }
  }
}

export default soldierLifeDeathDepartment;
