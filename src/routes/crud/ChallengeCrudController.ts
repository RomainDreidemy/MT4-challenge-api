import {Body, Delete, Get, Path, Post, Put, Route, Security, Tags} from 'tsoa';
import {Crud} from "../../classes/Crud";
import {IChallenge, IChallengeCreate, IChallengeUpdate} from "../../types/tables/challenge/IChallenge";
import {ApiError} from "../../classes/Errors/ApiError";
import {ErrorCode} from "../../classes/Errors/ErrorCode";
import {ICreateResponse} from "../../types/api/ICreateResponse";
import {IUpdateResponse} from "../../types/api/IUpdateResponse";
import {IScore} from "../../types/tables/score/IScore";

const READ_COLUMNS  = ['id', 'name', 'batch_id'];
const TABLE_NAME    = 'challenge'

/**
 * Les challenges de la plateforme.
 */
@Route("/challenges")
@Tags("Challenges")
@Security('jwt', ['admin'])
export class ChallengeCrudController {

  /**
   * Récupère tous les challenges.
   */
  @Get("/")
  public async index(): Promise<IChallenge[]> {
    const response = await Crud.Index<IChallenge>({}, TABLE_NAME, READ_COLUMNS);

    return response.rows;
  }

  /**
   * Récupère un challenge grâce a un identifiant.
   */
  @Get("/{id}")
  public async read(@Path() id: number): Promise<IChallenge> {
    const response = await Crud.Read<IChallenge>(TABLE_NAME, ['id'], [id], READ_COLUMNS);

    if (response === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not found a challenge`);
    }

    return response;
  }

  /**
   * Création d'un challenge.
   */
  @Post("/")
  public async create(@Body() body: IChallengeCreate): Promise<ICreateResponse> {
    return await Crud.Create<IChallengeCreate>(body, TABLE_NAME);
  }

  /**
   * Mise à jour d'un challenge.
   */
  @Put("/{id}")
  public async update(@Path() id: number, @Body() body: IChallengeUpdate): Promise<IUpdateResponse> {
    return await Crud.Update<IChallengeUpdate>(body, TABLE_NAME, ['id'], [id]);
  }

  /**
   * Suppression d'un challenge.
   */
  @Delete('/{id}')
  public async delete(@Path() id: number): Promise<IUpdateResponse> {
    return Crud.Delete(TABLE_NAME, 'id', id);
  }

  /**
   * Fermeture d'un challenge.
   */
  @Post("/{id}/close")
  public async close(@Path() id: number): Promise<IUpdateResponse> {
    return await Crud.Update<IChallengeUpdate>({ is_close: 1 }, TABLE_NAME, ['id'], [id]);
  }

  /**
   * Récupère les scores pour un challenge.
   */
  @Get("/{id}/scores")
  public async scores(@Path() id: number): Promise<IScore[]> {
    const response = await Crud.Index<IScore>({}, 'score', ['id', 'user_id', 'challenge_id', 'score', 'first_try_at', 'last_try_at'], {challenge_id: id});

    if (response === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not found a challenge`);
    }

    return response.rows;
  }
}
