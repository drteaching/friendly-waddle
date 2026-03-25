/**
 * Auth0 configuration helpers for the ASPIRE EndoExpertise Platform.
 *
 * Uses @auth0/nextjs-auth0 for server-side authentication with
 * Auth0 Universal Login. Environment variables required:
 *
 *   AUTH0_SECRET          — A long, randomly generated string
 *   AUTH0_BASE_URL        — e.g. http://localhost:3000
 *   AUTH0_ISSUER_BASE_URL — e.g. https://aspire.au.auth0.com
 *   AUTH0_CLIENT_ID       — Your Auth0 application client ID
 *   AUTH0_CLIENT_SECRET   — Your Auth0 application client secret
 */

/** Role constants matching Auth0 RBAC roles. */
export const ROLES = {
  PROVIDER: 'provider',
  PATIENT: 'patient',
  ADMIN: 'admin',
  REVIEWER: 'reviewer',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Extracts roles from the Auth0 user profile.
 * Roles are expected under the custom namespace claim configured in Auth0 rules.
 */
export function getUserRoles(user: Record<string, unknown>): Role[] {
  const namespace = process.env.NEXT_PUBLIC_AUTH0_NAMESPACE || 'https://aspire.endoexpertise.org';
  const roles = user[`${namespace}/roles`];
  if (Array.isArray(roles)) {
    return roles as Role[];
  }
  return [];
}

/**
 * Checks whether a user has a specific role.
 */
export function hasRole(user: Record<string, unknown>, role: Role): boolean {
  return getUserRoles(user).includes(role);
}

/**
 * Returns the access token from the session for use with the backend API.
 * Must be called server-side (e.g. in a Route Handler or Server Component).
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    // Dynamic import to avoid bundling @auth0/nextjs-auth0 on the client
    const { getSession } = await import('@auth0/nextjs-auth0');
    const session = await getSession();
    return session?.accessToken ?? null;
  } catch {
    return null;
  }
}

/**
 * Configuration for Auth0 route handlers.
 * Place in /app/api/auth/[auth0]/route.ts:
 *
 *   import { handleAuth } from '@auth0/nextjs-auth0';
 *   export const GET = handleAuth();
 */
export const AUTH0_ROUTES = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  callback: '/api/auth/callback',
  profile: '/api/auth/me',
} as const;
