import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key used by the RolesGuard to retrieve required roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator to specify which roles are permitted to access a route.
 *
 * Usage:
 *   @Roles('admin', 'reviewer')
 *   @UseGuards(JwtAuthGuard, RolesGuard)
 *   async protectedRoute() { ... }
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
