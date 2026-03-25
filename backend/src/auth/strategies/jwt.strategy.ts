import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JWT payload structure used across the ASPIRE platform.
 */
interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  organisationId: string;
}

/**
 * Passport strategy for validating JWT bearer tokens.
 * Extracts the token from the Authorization header and validates
 * it against the configured secret. The decoded payload is attached
 * to the request object as `req.user`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'dev-secret-change-in-production'),
    });
  }

  /**
   * Validate the decoded JWT payload and return the user context
   * that will be attached to the request.
   */
  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
      organisationId: payload.organisationId,
    };
  }
}
