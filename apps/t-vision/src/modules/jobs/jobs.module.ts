import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import JobsService from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import LoggerService from '../logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerService).forRoutes('jobs');
  }
}
