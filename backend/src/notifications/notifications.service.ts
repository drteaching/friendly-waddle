import { Injectable, Logger } from '@nestjs/common';

/**
 * Notification delivery types supported by the platform.
 */
export type NotificationChannel = 'in_app' | 'email' | 'sms';

/**
 * Notification payload structure.
 */
export interface NotificationPayload {
  recipientId: string;
  recipientEmail?: string;
  title: string;
  message: string;
  channel: NotificationChannel;
  category: string;
  metadata?: Record<string, any>;
  actionUrl?: string;
}

/**
 * Service responsible for dispatching notifications across the platform.
 * Supports in-app notifications, email, and SMS delivery channels.
 *
 * In production, this would integrate with:
 * - Azure Communication Services for email/SMS
 * - WebSocket/SSE for real-time in-app notifications
 * - A message queue for reliable delivery
 */
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  /**
   * Send a notification to a recipient.
   * Routes the notification to the appropriate delivery channel.
   */
  async send(payload: NotificationPayload): Promise<void> {
    this.logger.log(
      `Sending ${payload.channel} notification to ${payload.recipientId}: ${payload.title}`,
    );

    switch (payload.channel) {
      case 'in_app':
        await this.sendInApp(payload);
        break;
      case 'email':
        await this.sendEmail(payload);
        break;
      case 'sms':
        await this.sendSms(payload);
        break;
      default:
        this.logger.warn(`Unknown notification channel: ${payload.channel}`);
    }
  }

  /**
   * Send notifications to multiple recipients.
   */
  async sendBulk(payloads: NotificationPayload[]): Promise<void> {
    await Promise.all(payloads.map((payload) => this.send(payload)));
  }

  /**
   * Send an accreditation status update notification.
   */
  async notifyAccreditationUpdate(
    recipientId: string,
    applicationId: string,
    newStatus: string,
  ): Promise<void> {
    await this.send({
      recipientId,
      title: 'Accreditation Application Update',
      message: `Your accreditation application has been updated to status: ${newStatus}`,
      channel: 'in_app',
      category: 'accreditation',
      metadata: { applicationId, newStatus },
      actionUrl: `/accreditation/applications/${applicationId}`,
    });
  }

  /**
   * Send a PROMS reminder notification to a patient.
   */
  async notifyPromsReminder(
    patientId: string,
    surgicalCaseId: string,
    collectionPoint: string,
  ): Promise<void> {
    await this.send({
      recipientId: patientId,
      title: 'Patient-Reported Outcomes Questionnaire',
      message: `Your ${collectionPoint.replace('_', ' ')} outcomes questionnaire is ready to be completed. Your feedback helps us improve care for all endometriosis patients.`,
      channel: 'email',
      category: 'proms',
      metadata: { surgicalCaseId, collectionPoint },
    });
  }

  /**
   * Send an MDT meeting notification to invited practitioners.
   */
  async notifyMdtMeeting(
    practitionerIds: string[],
    discussionId: string,
    scheduledAt: Date,
  ): Promise<void> {
    const payloads: NotificationPayload[] = practitionerIds.map((id) => ({
      recipientId: id,
      title: 'MDT Meeting Scheduled',
      message: `An MDT case discussion meeting has been scheduled for ${scheduledAt.toLocaleString('en-AU')}. Please review the case materials beforehand.`,
      channel: 'in_app' as NotificationChannel,
      category: 'mdt',
      metadata: { discussionId, scheduledAt: scheduledAt.toISOString() },
      actionUrl: `/case-hub/discussions/${discussionId}`,
    }));

    await this.sendBulk(payloads);
  }

  // ---- Private delivery methods ----

  private async sendInApp(payload: NotificationPayload): Promise<void> {
    // TODO: Implement in-app notification storage and real-time delivery via WebSocket
    this.logger.log(`[In-App] ${payload.recipientId}: ${payload.title}`);
  }

  private async sendEmail(payload: NotificationPayload): Promise<void> {
    // TODO: Implement email delivery via Azure Communication Services
    this.logger.log(`[Email] ${payload.recipientId}: ${payload.title}`);
  }

  private async sendSms(payload: NotificationPayload): Promise<void> {
    // TODO: Implement SMS delivery via Azure Communication Services
    this.logger.log(`[SMS] ${payload.recipientId}: ${payload.title}`);
  }
}
