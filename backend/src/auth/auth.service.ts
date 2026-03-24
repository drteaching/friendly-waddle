import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Authentication service responsible for user login, token management,
 * and profile retrieval. In production this would integrate with an
 * external identity provider (e.g. Azure AD B2C).
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Authenticate a user by email and password.
   * Returns a signed JWT access token and refresh token.
   *
   * Note: This is a placeholder implementation. In production,
   * credentials would be validated against an identity provider.
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    // TODO: Replace with real identity provider validation
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    // Placeholder: accept any credentials in development
    const payload = {
      sub: 'placeholder-user-id',
      email,
      roles: ['practitioner'],
      organisationId: 'placeholder-org-id',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const expiresIn = this.configService.get<number>('JWT_EXPIRATION', 28800);

    return { accessToken, refreshToken, expiresIn };
  }

  /**
   * Refresh an expired access token using a valid refresh token.
   */
  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newPayload = {
        sub: payload.sub,
        email: payload.email,
        roles: payload.roles,
        organisationId: payload.organisationId,
      };

      const newAccessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });
      const expiresIn = this.configService.get<number>('JWT_EXPIRATION', 28800);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  /**
   * Retrieve the authenticated user's profile information.
   */
  async getProfile(userId: string): Promise<{
    userId: string;
    email: string;
    roles: string[];
    organisationId: string;
  }> {
    // TODO: Fetch full profile from the practitioners table
    return {
      userId,
      email: 'placeholder@aspire.org.au',
      roles: ['practitioner'],
      organisationId: 'placeholder-org-id',
    };
  }

  /**
   * Invalidate the current user's session.
   */
  async logout(userId: string): Promise<void> {
    // TODO: Implement token blacklisting via Redis
  }

  /**
   * Validate a JWT payload extracted by the passport strategy.
   * Returns the user context if the token is valid.
   */
  async validateUser(payload: {
    sub: string;
    email: string;
    roles: string[];
    organisationId: string;
  }): Promise<{
    userId: string;
    email: string;
    roles: string[];
    organisationId: string;
  }> {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
      organisationId: payload.organisationId,
    };
  }
}
