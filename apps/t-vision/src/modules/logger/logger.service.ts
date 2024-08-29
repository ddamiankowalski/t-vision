import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export default class LoggerService implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    console.log('Request incoming');
    next();
  }
}
