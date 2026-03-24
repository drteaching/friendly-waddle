import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a continuing professional development (CPD) activity
 * recorded by a practitioner. CPD activities contribute towards
 * ASPIRE accreditation requirements and professional registration.
 */
@Entity('cpd_activities')
export class CpdActivity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'practitioner_id' })
  practitionerId!: string;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({
    type: 'enum',
    enum: [
      'conference',
      'workshop',
      'online_course',
      'journal_club',
      'case_review',
      'video_review',
      'teaching',
      'mentorship',
      'audit',
      'research',
      'self_directed',
      'other',
    ],
    name: 'activity_type',
  })
  activityType!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'cpd_hours' })
  cpdHours!: number;

  @Column({ type: 'date', name: 'activity_date' })
  activityDate!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  provider!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'certificate_number' })
  certificateNumber!: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true, name: 'certificate_url' })
  certificateUrl!: string | null;

  @Column({ type: 'text', nullable: true, name: 'learning_outcomes' })
  learningOutcomes!: string | null;

  @Column({ type: 'text', nullable: true, name: 'reflection_notes' })
  reflectionNotes!: string | null;

  @Column({
    type: 'enum',
    enum: ['draft', 'submitted', 'verified', 'rejected'],
    default: 'draft',
  })
  status!: string;

  @Column({ type: 'uuid', nullable: true, name: 'verified_by' })
  verifiedBy!: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'verified_at' })
  verifiedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
