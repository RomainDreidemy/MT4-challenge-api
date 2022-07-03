import { Request } from 'express';
import { ApiError } from '../classes/Errors/ApiError';
import { ErrorCode } from '../classes/Errors/ErrorCode';
import jwt from "jsonwebtoken";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<boolean> {

  if (securityName === 'jwt') {
    if (!request.headers.authorization) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/missing-header', 'Missing authorization header');
    }

    if (!request.headers.authorization.startsWith('Bearer ')) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/bad-header', 'Authorization should be a bearer token');
    }

    const token = request.headers.authorization.split(' ')[1];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      jwt.verify(token, process.env.APP_SECRET || 'dev-secret', function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          const { data } = decoded;
          // Check if JWT contains all required scopes
          if (scopes) {
            for (let scope of scopes) {
              if (!data.scopes.includes(scope)) {
                reject(new Error("JWT does not contain required scope."));
              }
            }
          }
          resolve(decoded);
        }
      });
    });
  }

  return true;
}
