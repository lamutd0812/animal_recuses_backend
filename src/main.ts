import {
  NODE_APP_PORT,
  NODE_APP_PRODUCTION_MODE,
} from './config/common-configs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const port = NODE_APP_PORT;
  const app = await NestFactory.create(AppModule);

  // Morgan logger
  app.use(morgan(NODE_APP_PRODUCTION_MODE === 'true' ? 'combined' : 'dev'));

  // Swagger configs
  const swaggerConfigs = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Animal Recuses')
    .setDescription('Animal Recuses API Documentations.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfigs);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
    },
  });

  await app.listen(port);
  logger.log(`Application running on port ${port}.`);
}
bootstrap();
