export interface IAuthenticationBody {
  email: string;
  admin: boolean;
  challenge_id?: number;
}
