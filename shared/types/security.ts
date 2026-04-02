// Security types for role-based access control, access policies, and break-the-glass events
// Re-exports Role from auth module to avoid duplication; adds security-specific types

export { Role, type AccessPolicy, type BreakTheGlassEvent } from './auth';
