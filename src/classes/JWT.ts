import jwt from "jsonwebtoken";

const APP_SECRET = process.env.APP_SECRET || 'dev-secret'

export class JWT {
  public static get(data: any): string {
    return jwt.sign({
      data,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    }, APP_SECRET);
  }
}
