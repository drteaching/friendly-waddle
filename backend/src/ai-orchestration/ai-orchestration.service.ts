import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiSession } from './entities/ai-session.entity';

/**
 * Service for orchestrating AI-assisted clinical workflows.
 * All AI interactions follow the "AI as co-pilot" principle:
 * - The clinician always retains full control
 * - AI suggestions require clinician review before action
 * - A pause/override mechanism is always available
 * - All AI outputs are logged for audit and accountability
 */
@Injectable()
export class AiOrchestrationService {
  constructor(
    @InjectRepository(AiSession)
    private readonly sessionRepo: Repository<AiSession>,
  ) {}

  /**
   * Start a new AI-assisted consultation session.
   * Creates a session record and initialises the AI context
   * with relevant patient and clinical information.
   */
  async startConsultationSession(data: {
    practitionerId: string;
    patientId?: string;
    sessionType: string;
    context?: Record<string, any>;
  }): Promise<AiSession> {
    const session = this.sessionRepo.create({
      practitionerId: data.practitionerId,
      patientId: data.patientId || null,
      sessionType: data.sessionType,
      status: 'active',
      context: data.context || {},
      interactions: [],
      startedAt: new Date(),
    });
    return this.sessionRepo.save(session);
  }

  /** Retrieve an AI session by ID. */
  async getSession(id: string): Promise<AiSession> {
    const session = await this.sessionRepo.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`AI session ${id} not found`);
    }
    return session;
  }

  /**
   * Pause an active AI session.
   * This is the clinician override mechanism - allows the clinician
   * to immediately halt AI processing and take manual control.
   */
  async pauseAi(id: string): Promise<AiSession> {
    const session = await this.getSession(id);

    if (session.status !== 'active') {
      throw new BadRequestException(
        'Only active sessions can be paused. Current status: ' + session.status,
      );
    }

    session.status = 'paused';
    session.interactions = [
      ...session.interactions,
      {
        timestamp: new Date().toISOString(),
        type: 'system',
        content: 'Session paused by clinician',
        role: 'system',
      },
    ];

    return this.sessionRepo.save(session);
  }

  /** Resume a paused AI session. */
  async resumeSession(id: string): Promise<AiSession> {
    const session = await this.getSession(id);

    if (session.status !== 'paused') {
      throw new BadRequestException(
        'Only paused sessions can be resumed. Current status: ' + session.status,
      );
    }

    session.status = 'active';
    session.interactions = [
      ...session.interactions,
      {
        timestamp: new Date().toISOString(),
        type: 'system',
        content: 'Session resumed by clinician',
        role: 'system',
      },
    ];

    return this.sessionRepo.save(session);
  }

  /**
   * Finalise an AI session and record outcomes.
   * The clinician must explicitly approve or reject AI-generated
   * content before the session can be closed.
   */
  async finaliseSession(
    id: string,
    data: {
      clinicianApproved: boolean;
      clinicianNotes?: string;
      outcomes?: Record<string, any>;
    },
  ): Promise<AiSession> {
    const session = await this.getSession(id);

    if (!['active', 'paused'].includes(session.status)) {
      throw new BadRequestException(
        'Only active or paused sessions can be finalised. Current status: ' + session.status,
      );
    }

    session.status = 'completed';
    session.clinicianApproved = data.clinicianApproved;
    session.clinicianNotes = data.clinicianNotes || null;
    session.outcomes = data.outcomes || {};
    session.completedAt = new Date();

    session.interactions = [
      ...session.interactions,
      {
        timestamp: new Date().toISOString(),
        type: 'system',
        content: `Session finalised. Clinician ${data.clinicianApproved ? 'approved' : 'did not approve'} AI outputs.`,
        role: 'system',
      },
    ];

    return this.sessionRepo.save(session);
  }

  /**
   * Start an AI-assisted surgical case audit.
   * Creates a specialised session for reviewing surgical cases,
   * optionally analysing associated video recordings against
   * defined audit criteria.
   */
  async startSurgicalAudit(data: {
    practitionerId: string;
    surgicalCaseId: string;
    videoId?: string;
    auditCriteria?: string[];
  }): Promise<AiSession> {
    const session = this.sessionRepo.create({
      practitionerId: data.practitionerId,
      sessionType: 'surgical_audit',
      status: 'active',
      context: {
        surgicalCaseId: data.surgicalCaseId,
        videoId: data.videoId || null,
        auditCriteria: data.auditCriteria || [
          'Instrument handling and ergonomics',
          'Tissue plane identification',
          'Haemostasis technique',
          'Anatomical landmark recognition',
          'Complication prevention strategies',
        ],
      },
      interactions: [
        {
          timestamp: new Date().toISOString(),
          type: 'system',
          content: `Surgical audit session initiated for case ${data.surgicalCaseId}`,
          role: 'system',
        },
      ],
      startedAt: new Date(),
    });

    return this.sessionRepo.save(session);
  }
}
