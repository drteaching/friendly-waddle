import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that evaluates patient consent before allowing data access.
 * Logs all access attempts to patient data for audit purposes.
 *
 * In a full implementation, this middleware would:
 * 1. Extract the patient ID from the request path
 * 2. Determine the type of data being accessed
 * 3. Check that the requesting user has appropriate consent
 * 4. Log the access attempt for audit trail purposes
 * 5. Block access if consent has not been granted
 */
@Injectable()
export class ConsentEvaluationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ConsentEvaluationMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction): void {
    // Extract patient ID from the request path if present
    const patientIdMatch = req.path.match(
      /patients\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i,
    );

    if (patientIdMatch) {
      const patientId = patientIdMatch[1];
      const userId = (req as any).user?.userId || 'anonymous';

      this.logger.log(
        `Patient data access: user=${userId} patient=${patientId} method=${req.method} path=${req.path}`,
      );

      // TODO: Implement full consent evaluation logic
      // - Look up active consents for this patient
      // - Determine the consent type required for this endpoint
      // - Verify consent is active and not expired
      // - Return 403 Forbidden if consent is not granted
    }

    next();
  }
}
