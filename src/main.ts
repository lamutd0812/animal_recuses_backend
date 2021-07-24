import {
  NODE_APP_PORT,
  NODE_APP_PRODUCTION_MODE,
} from './config/common-configs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const port = NODE_APP_PORT;
  const app = await NestFactory.create(AppModule);

  // Morgan logger
  app.use(morgan(NODE_APP_PRODUCTION_MODE === 'true' ? 'combined' : 'dev'));

  await app.listen(port);
  logger.log(`Application running on port ${port}.`);
}
bootstrap();
