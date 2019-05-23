import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
  // application
  APP_ENV: string;
  APP_DEBUG: boolean;

  // database
  DB_TYPE: 'mysql' | 'mariadb';
  DB_HOST?: string;
  DB_NAME: string;
  DB_PORT?: number;
  DB_USER: string;
  DB_PASSWORD: string;
}

export class EnvService {
  private readonly vars: EnvData;

  constructor() {
    const data: any = dotenv.parse(fs.readFileSync('.env'));

    data.APP_DEBUG = data.APP_DEBUG === 'true';
    data.DB_PORT = parseInt(data.DB_PORT, 10);

    this.vars = data as EnvData;
  }

  read(): EnvData {
    return this.vars;
  }
}
