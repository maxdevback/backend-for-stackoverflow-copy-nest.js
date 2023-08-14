import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { verify as verifyToken } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequestWihUser, IUser } from 'src/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: IRequestWihUser, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');

    if (!token)
      throw new HttpException('Sign-in required', HttpStatus.UNAUTHORIZED);

    try {
      const user: IUser = verifyToken(token, 'secret') as IUser;
      req.user = user;
    } catch (err) {
      console.error(`error: ${err}`);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    } finally {
      next();
    }
  }
}
