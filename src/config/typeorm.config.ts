import {
  NODE_APP_DB_TYPE,
  NODE_APP_DB_HOST,
  NODE_APP_DB_PASSWORD,
  NODE_APP_DB_PORT,
  NODE_APP_DB_USERNAME,
  NODE_APP_DB_DATABASE,
} from './common-configs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: NODE_APP_DB_TYPE,
  host: NODE_APP_DB_HOST,
  port: NODE_APP_DB_PORT,
  username: NODE_APP_DB_USERNAME,
  password: NODE_APP_DB_PASSWORD,
  database: NODE_APP_DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
