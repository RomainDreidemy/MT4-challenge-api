import {Body, Get, Path, Post, Put, Route, Security, Tags} from 'tsoa';
import {Crud} from "../../classes/Crud";
import {IScore, IScoreCreate, IScoreUpdate} from "../../types/tables/score/IScore";
import {ApiError} from "../../classes/Errors/ApiError";
import {ErrorCode} from "../../classes/Errors/ErrorCode";
import {ICreateResponse} from "../../types/api/ICreateResponse";
import {IUpdateResponse} from "../../types/api/IUpdateResponse";

const READ_COLUMNS  = ['id', 'user_id', 'challenge_id', 'score', 'first_try_at', 'last_try_at'];
const TABLE_NAME    = 'score';

/**
 * Les scores de la plateforme.
 */
@Route("/scores")
@Tags("Scores")
@Security('jwt', ['admin'])
export class ScoreCrudController {

  /**
   * Récupère tous les scores.
   */
  @Get("/")
  public async index(): Promise<IScore[]> {
    const response = await Crud.Index<IScore>({}, TABLE_NAME, READ_COLUMNS);

    return response.rows;
  }

  /**
   * Récupère un score grâce a un identifiant.
   */
  @Get("/{id}")
  public async read(@Path() id: number): Promise<IScore> {
    const response = await Crud.Read<IScore>(TABLE_NAME, ['id'], [id], READ_COLUMNS);

    if (response === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not found a score`);
    }

    return response;
  }

  /**
   * Création d'un score.
   */
  @Post("/")
  public async create(@Body() body: IScoreCreate): Promise<ICreateResponse> {
    return await Crud.Create<IScoreCreate>(body, TABLE_NAME);
  }

  /**
   * Mise à jour d'un score.
   */
  @Put("/{id}")
  public async update(@Path() id: number, @Body() body: IScoreUpdate): Promise<IUpdateResponse> {
    return await Crud.Update<IScoreUpdate>(body, TABLE_NAME, ['id'], [id]);
  }
}
