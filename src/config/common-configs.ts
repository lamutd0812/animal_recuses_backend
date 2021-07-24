import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string): string => {
  const value = process.env[key];
  return value;
};

// Configs
export const NODE_APP_PRODUCTION_MODE = getEnv('NODE_APP_PRODUCTION_MODE');
export const NODE_APP_PORT = Number(getEnv('NODE_APP_PORT'));

export const NODE_APP_DB_TYPE = 'postgres';
export const NODE_APP_DB_HOST = getEnv('NODE_APP_DB_HOST');
export const NODE_APP_DB_PORT = Number(getEnv('NODE_APP_DB_PORT'));
export const NODE_APP_DB_USERNAME = getEnv('NODE_APP_DB_USERNAME');
export const NODE_APP_DB_PASSWORD = getEnv('NODE_APP_DB_PASSWORD');
export const NODE_APP_DB_DATABASE = getEnv('NODE_APP_DB_DATABASE');

export const JWT_SECRET_KEY = getEnv('JWT_SECRET_KEY');
export const JWT_EXPIRES_IN = Number(getEnv('JWT_EXPIRES_IN'));
