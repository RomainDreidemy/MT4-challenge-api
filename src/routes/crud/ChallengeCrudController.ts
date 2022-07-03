import {Get, Route, Security} from 'tsoa';
import {Crud} from "../../classes/Crud";
import {IChallenge} from "../../types/tables/challenge/IChallenge";

const READ_COLUMNS = ['id', 'name', 'batch_id'];

/**
 * Les challenges de la plateforme.
 */
@Route("/challenges")
@Security('jwt', ['admin'])
export class ChallengeCrudController {

  /**
   * Test du challenge soldier.
   */
  @Get("/")
  public async index(): Promise<IChallenge[]> {
    const response = await Crud.Index<IChallenge>({}, 'challenge', READ_COLUMNS);

    return response.rows;
  }
}
