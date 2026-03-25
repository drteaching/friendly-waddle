import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Guard that enforces patient consent requirements on data access.
 * Checks active consents before allowing access to patient data.
 */
@Injectable()
export class ConsentGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const patientId = request.params.patientId || request.body?.patientId;

    if (!patientId) {
      return true; // No patient context, consent check not applicable
    }

    // TODO: Implement full consent evaluation against patient_consents table
    // For now, allow access (to be implemented with consent service integration)
    return true;
  }
}
