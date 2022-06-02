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

    try {
      const token = request.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.APP_SECRET || 'dev-secret');
    } catch (err) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/invalid-jwt', 'Invalid token', err);
    }
  }

  return true;
}
