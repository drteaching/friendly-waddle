import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Database configuration factory for TypeORM.
 * Reads connection parameters from environment variables with sensible defaults
 * for local development.
 */
export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'aspire_user'),
  password: configService.get<string>('DB_PASSWORD', 'aspire_dev'),
  database: configService.get<string>('DB_DATABASE', 'aspire_endoexpertise'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
  logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
  ssl: configService.get<string>('DB_SSL', 'false') === 'true'
    ? { rejectUnauthorized: false }
    : false,
  // Connection pool settings suitable for production workloads
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  },
});
