import {Body, Delete, Get, Path, Post, Put, Route, Security, Tags} from 'tsoa';
import {Crud} from "../../classes/Crud";
import {IChallenge, IChallengeCreate, IChallengeUpdate} from "../../types/tables/challenge/IChallenge";
import {ApiError} from "../../classes/Errors/ApiError";
import {ErrorCode} from "../../classes/Errors/ErrorCode";
import {ICreateResponse} from "../../types/api/ICreateResponse";
import {IUpdateResponse} from "../../types/api/IUpdateResponse";
import {IScore} from "../../types/tables/score/IScore";

const READ_COLUMNS = ['id', 'name', 'batch_id'];
const TABLE_NAME = 'challenge'

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
  public async close(@Path() id: number): Promise<IChallenge> {
    await Crud.Update<IChallengeUpdate>({is_close: 1}, TABLE_NAME, ['id'], [id]);

    const challenge = await Crud.Read<IChallenge>(TABLE_NAME, ['id'], [id], READ_COLUMNS)

    if (challenge === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not found a challenge`);
    }

    return challenge;
  }

  /**
   * Récupère les scores pour un challenge.
   */
  @Get("/{id}/scores")
  public async scores(@Path() id: number): Promise<IScore[]> {

    const scoreQuery = `
        select score.id           as id,
               score.score        as score,
               score.first_try_at as first_try_at,
               score.last_try_at  as last_try_at,
               u.email         as email
        from score
        inner join user u on u.id = score.user_id
        where score.challenge_id = 5
        order by score.score desc;
    `

    const response = await Crud.Query<IScore[]>(scoreQuery, {challenge_id: id});

    if (response === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not found a challenge`);
    }

    return response
  }
}
