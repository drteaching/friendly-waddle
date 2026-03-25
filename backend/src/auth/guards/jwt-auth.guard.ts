import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that enforces JWT-based authentication on protected routes.
 * Apply this guard to any controller or route handler that requires
 * an authenticated user context.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
