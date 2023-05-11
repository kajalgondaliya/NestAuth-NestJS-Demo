import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BadJWTError, NoJWTError } from './errors';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const bearerIndex = authHeader.indexOf('Bearer');
      const token = authHeader.substring(bearerIndex + 7);

      try {
        let userId=verify(token, "test");

      } catch (e) {
        throw new BadJWTError();
      }

      next();
    } else {
      throw new NoJWTError();
    }
  }
}
