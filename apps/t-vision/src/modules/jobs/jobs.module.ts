import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import JobsService from './jobs.service';
import LoggerService from '../logger/logger.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerService).forRoutes('jobs');
  }
}
