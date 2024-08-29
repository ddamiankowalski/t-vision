import { Module } from '@nestjs/common';
import { JobsModule } from './modules';
import LoggerModule from './modules/logger/logger.module';

@Module({
  imports: [JobsModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
