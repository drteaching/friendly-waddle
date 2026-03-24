import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents an AI-assisted session within the ASPIRE platform.
 * All AI interactions are recorded for audit, accountability,
 * and continuous improvement purposes.
 *
 * The AI operates as a co-pilot - the clinician always retains
 * full control and must explicitly approve AI-generated outputs.
 */
@Entity('ai_sessions')
export class AiSession {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'practitioner_id' })
  practitionerId!: string;

  @Column({ type: 'uuid', name: 'patient_id', nullable: true })
  patientId!: string | null;

  @Column({
    type: 'enum',
    enum: ['consultation', 'surgical_audit', 'case_summary', 'evidence_review', 'report_generation'],
    name: 'session_type',
  })
  sessionType!: string;

  @Column({
    type: 'enum',
    enum: ['active', 'paused', 'completed', 'cancelled', 'error'],
    default: 'active',
  })
  status!: string;

  @Column({ type: 'jsonb', default: '{}' })
  context!: Record<string, any>;

  @Column({ type: 'jsonb', default: '[]' })
  interactions!: Array<{
    timestamp: string;
    type: string;
    content: string;
    role: string;
    metadata?: Record<string, any>;
  }>;

  @Column({ type: 'jsonb', default: '{}' })
  outcomes!: Record<string, any>;

  @Column({ type: 'boolean', nullable: true, name: 'clinician_approved' })
  clinicianApproved!: boolean | null;

  @Column({ type: 'text', nullable: true, name: 'clinician_notes' })
  clinicianNotes!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'ai_model_version' })
  aiModelVersion!: string | null;

  @Column({ type: 'integer', nullable: true, name: 'total_tokens_used' })
  totalTokensUsed!: number | null;

  @Column({ type: 'timestamp', name: 'started_at' })
  startedAt!: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'completed_at' })
  completedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
