import {IMysqlThroughSSHConfig} from "../../types/classes/IMysqlThroughSSHConfig";
import {MysqlThroughSSH} from "../../classes/MysqlThroughSSH";

const EXPECTED_IMAGE_COUNT_WITH_NEW_DOMAIN = 5;

const soldierImageDomain = async (config: IMysqlThroughSSHConfig) => {
  await checkIfImageExistWithOldDomain(config);

  await checkIfTheNewDomainIsUsed(config);
}

const checkIfImageExistWithOldDomain = async (config: IMysqlThroughSSHConfig) => {
  const response = await MysqlThroughSSH.query('select count(*) as nb_image from soldier_image where secure_url like "%lorempixel.com%";', config);
  const nb_image = response[0].nb_image;

  if (nb_image !== 0) {
    throw new Error('le domaine \'lorempixel.com\' a été trouvé dans la base de données.');
  }
}

const checkIfTheNewDomainIsUsed = async (config: IMysqlThroughSSHConfig) => {

  const response = await MysqlThroughSSH.query('select count(*) as nb_image from soldier_image where secure_url like "%challenge.com%";', config);
  const nb_image = response[0].nb_image;

  if (nb_image !== EXPECTED_IMAGE_COUNT_WITH_NEW_DOMAIN) {
    throw new Error('Toutes les images n\'ont pas le domaine \'challenge.com\'.');
  }
}

export default soldierImageDomain;
