import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export default class JobsService {
  constructor(@Inject(REQUEST) private request: Request) {}

  public getRequest(): Request {
    return this.request;
  }
}
