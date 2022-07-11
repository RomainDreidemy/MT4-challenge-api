import {Crud} from "../classes/Crud";
import {IChallenge} from "../types/tables/challenge/IChallenge";
import {ApiError} from "../classes/Errors/ApiError";
import {ErrorCode} from "../classes/Errors/ErrorCode";
import {IUser, IUserCreate} from "../types/tables/user/IUser";
import {JWT} from "../classes/JWT";
import {Mailer} from "../classes/Mailer";

const READ_COLUMNS = ['id', 'email', 'batch_id', 'is_admin'];
const FRONT_URL = process.env.FRONT_URL || 'http://127.0.0.1:3000'

export class UserServices {
  public static async authenticate(email: string, admin: boolean, challenge_id: number | undefined) {
    let user = await UserServices.dispatcherUser(email, admin, challenge_id);

    if (!user) {
      throw new Error('User cannot be found');
    }

    const jwtData = {
      id: user.id,
      email: email,
      challenge_id: challenge_id,
      scopes: user.is_admin ? ['admin'] : [],
    }

    const token = JWT.get(jwtData);
    const url = this.getLoginUrl(token, user.is_admin === 1, challenge_id);

    await Mailer.send(
      email,
      'Connexion à votre challenge',
      `Cliquez sur l'url suivante pour vous connecter ${url}`,
      `<h3>Bienvenu dans Challenge</h3><p>Pour vous connecter cliquez <a href="${url}">ici</a></p>`
    );
  }

  private static async getChallenge(challenge_id: number): Promise<IChallenge | null> {
    const challenge: IChallenge | null = await Crud.Read<IChallenge>('challenge', ['id'], [challenge_id], ['id', 'name', 'batch_id'], false);

    if (challenge === null) {
      throw new ApiError(ErrorCode.BadRequest, 'sql/not-found', `Could not read challenge row with id = ${challenge_id}`);
    }

    return challenge
  }


  private static async dispatcherUser(email: string, admin: boolean, challenge_id: number | undefined): Promise<IUser | null> {

    if (admin) {
      return await Crud.Read<IUser>('user', ['email'], [email], READ_COLUMNS, false)

    } else if (!admin && challenge_id) {
      const challenge: IChallenge | null = await UserServices.getChallenge(challenge_id)

      let user = await Crud.Read<IUser>('user', ['email'], [email], READ_COLUMNS, false);

      if (user === null && !!challenge) {
        const response = await Crud.Create<IUserCreate>({
          email: email,
          batch_id: challenge.batch_id,
          is_admin: 0
        }, 'user');
        user = await Crud.Read<IUser>('user', ['id'], [response.id], READ_COLUMNS);
      }

      if (!user) {
        throw new Error('User cannot be created');
      } else if (!admin && !challenge) {
        throw new Error('Challenge cannot be found');
      }

      return user

    } else {
      throw new Error('Missing information');
    }
  }

  private static getLoginUrl(token: string, admin: boolean, challenge_id: number | undefined): string {
    if (admin) {
      return `${FRONT_URL}/login?token=${token}&admin=${admin}`;
    }

    return `${FRONT_URL}/login?token=${token}&challenge_id=${challenge_id}`;
  }
}
