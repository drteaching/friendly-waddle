import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a patient-reported outcome measure (PROMS) response.
 * PROMS are collected at defined intervals (pre-operative, 6 weeks,
 * 6 months, 12 months post-operatively) to track patient outcomes.
 */
@Entity('proms_responses')
export class PromsResponse {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'surgical_case_id' })
  surgicalCaseId!: string;

  @Column({ type: 'uuid', name: 'patient_id' })
  patientId!: string;

  @Column({
    type: 'enum',
    enum: ['pre_operative', '6_weeks', '6_months', '12_months'],
    name: 'collection_point',
  })
  collectionPoint!: string;

  @Column({ type: 'varchar', length: 100, name: 'questionnaire_type' })
  questionnaireType!: string;

  @Column({ type: 'jsonb', default: '{}' })
  responses!: Record<string, any>;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, name: 'total_score' })
  totalScore!: number | null;

  @Column({
    type: 'enum',
    enum: ['pending', 'sent', 'partially_completed', 'completed', 'expired'],
    default: 'pending',
  })
  status!: string;

  @Column({ type: 'date', name: 'due_date' })
  dueDate!: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'completed_at' })
  completedAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true, name: 'reminder_sent_at' })
  reminderSentAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
