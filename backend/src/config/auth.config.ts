import { ConfigService } from '@nestjs/config';

/**
 * Authentication configuration factory.
 * Covers JWT token settings and OAuth2 identity provider parameters.
 */
export const authConfig = (configService: ConfigService) => ({
  jwt: {
    secret: configService.get<string>('JWT_SECRET', 'change-this-to-a-secure-random-string'),
    expiresIn: configService.get<number>('JWT_EXPIRATION', 3600),
    refreshExpiresIn: configService.get<number>('JWT_REFRESH_EXPIRATION', 86400),
  },
  oauth2: {
    issuerUrl: configService.get<string>('OAUTH2_ISSUER_URL', ''),
    clientId: configService.get<string>('OAUTH2_CLIENT_ID', ''),
    clientSecret: configService.get<string>('OAUTH2_CLIENT_SECRET', ''),
    callbackUrl: configService.get<string>('OAUTH2_CALLBACK_URL', 'http://localhost:3001/api/v1/auth/callback'),
  },
});
