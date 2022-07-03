import {Body, Get, Path, Post, Put, Route, Security, Tags} from 'tsoa';
import {Crud} from "../../classes/Crud";
import {ApiError} from "../../classes/Errors/ApiError";
import {ErrorCode} from "../../classes/Errors/ErrorCode";
import {ICreateResponse} from "../../types/api/ICreateResponse";
import {IUpdateResponse} from "../../types/api/IUpdateResponse";
import {IBatch, IBatchCreate, IBatchUpdate} from "../../types/tables/batch/IBatch";

const READ_COLUMNS  = ['id', 'name'];
const TABLE_NAME    = 'batch'

/**
 * Les promos de la plateforme.
 */
@Route("/batches")
@Tags("Batches")
@Security('jwt', ['admin'])
export class BatchCrudController {

  /**
   * Récupère toutes les promos.
   */
  @Get("/")
  public async index(): Promise<IBatch[]> {
    const response = await Crud.Index<IBatch>({}, TABLE_NAME, READ_COLUMNS);

    return response.rows;
  }

  /**
   * Récupère une promo grâce a un identifiant.
   */
  @Get("/{id}")
  public async read(@Path() id: number): Promise<IBatch> {
    const response = await Crud.Read<IBatch>(TABLE_NAME, ['id'], [id], READ_COLUMNS);

    if (response === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not found a batch`);
    }

    return response;
  }

  /**
   * Création d'une promo.
   */
  @Post("/")
  public async create(@Body() body: IBatchCreate): Promise<ICreateResponse> {
    return await Crud.Create<IBatchCreate>(body, TABLE_NAME);
  }

  /**
   * Mise à jour d'une promo.
   */
  @Put("/{id}")
  public async update(@Path() id: number, @Body() body: IBatchUpdate): Promise<IUpdateResponse> {
    return await Crud.Update<IBatchUpdate>(body, TABLE_NAME, ['id'], [id]);
  }
}
