import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * Interceptor that logs all API requests to the audit trail.
 * Captures the request method, path, user identity, and response status
 * for every interaction with the platform.
 *
 * In a full implementation, this would persist audit entries to the
 * audit_log table via TypeORM. For now, it logs to the application logger.
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const user = request.user;
    const userId = user?.userId || 'anonymous';
    const userEmail = user?.email || 'unknown';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const duration = Date.now() - startTime;

          this.logger.log(
            `AUDIT: ${method} ${url} | user=${userId} (${userEmail}) | ` +
            `status=${response.statusCode} | ip=${ip} | duration=${duration}ms`,
          );

          // TODO: Persist audit entry to the audit_log table
          // const auditEntry = {
          //   userId,
          //   userEmail,
          //   action: `${method} ${url}`,
          //   resourceType: this.extractResourceType(url),
          //   resourceId: this.extractResourceId(url),
          //   httpMethod: method,
          //   requestPath: url,
          //   ipAddress: ip,
          //   userAgent: request.headers['user-agent'],
          //   outcome: response.statusCode < 400 ? 'success' : 'failure',
          // };
        },
        error: (error) => {
          const duration = Date.now() - startTime;

          this.logger.warn(
            `AUDIT: ${method} ${url} | user=${userId} (${userEmail}) | ` +
            `error=${error.message} | ip=${ip} | duration=${duration}ms`,
          );
        },
      }),
    );
  }
}
