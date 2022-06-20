import {Crud} from "../classes/Crud";
import {IChallenge} from "../types/tables/challenge/IChallenge";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IUser, IUserCreate} from "../types/tables/user/IUser";
import {JWT} from "../classes/JWT";
import {Mailer} from "../classes/Mailer";

const READ_COLUMNS = ['id', 'email', 'batch_id'];
const FRONT_URL = process.env.FRONT_URL || 'http://127.0.0.1:3000'

export class UserServices {
  public static async authenticate(email: string, challenge_id: number) {
    const challenge: IChallenge|null = await Crud.Read<IChallenge>('challenge', 'id', challenge_id, [ 'id', 'name', 'batch_id' ], false);

    if (challenge === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not read challenge row with id = ${challenge_id}`);
    }

    let user = await Crud.Read<IUser>('user', 'email', email, READ_COLUMNS, false);

    if (user === null) {
      await Crud.Create<IUserCreate>({ email: email, batch_id: challenge.batch_id }, 'user');
    }

    const jwtData = {
      data: {
        email: email
      }
    };

    const token = JWT.get(jwtData);
    const url = this.getLoginUrl(token, challenge_id);

    await Mailer.send(
      email,
      'Connexion à votre challenge',
      `Cliquez sur l'url suivante pour vous connecter ${this.getLoginUrl(token, challenge_id)}`,
      `<h3>Bienvenu dans Challenge</h3><p>Pour vous connecter cliquez <a href="${url}">ici</a></p>`
    );
  }

  private static getLoginUrl(token: string, challenge_id: number): string {
    return `${FRONT_URL}/login?token=${token}&challenge_id=${challenge_id}`;
  }
}
