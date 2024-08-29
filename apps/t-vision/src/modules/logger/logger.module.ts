import { Module } from '@nestjs/common';
import LoggerService from './logger.service';

@Module({
  providers: [LoggerService],
})
export default class LoggerModule {}
