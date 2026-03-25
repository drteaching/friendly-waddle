import { ConfigService } from '@nestjs/config';

/**
 * Redis configuration factory.
 * Used for caching, session management, and real-time event distribution.
 */
export const redisConfig = (configService: ConfigService) => ({
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
  password: configService.get<string>('REDIS_PASSWORD', ''),
  db: configService.get<number>('REDIS_DB', 0),
  ttl: configService.get<number>('REDIS_TTL', 300),
});
