import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Standalone entity for individual feature assessments within an accreditation application.
 * Whilst feature assessments are also stored as JSONB on the application entity,
 * this entity provides a normalised view for reporting and querying purposes.
 */
@Entity('feature_assessments')
export class FeatureAssessmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'application_id' })
  applicationId!: string;

  @Column({ type: 'varchar', length: 50, name: 'feature_code' })
  featureCode!: string;

  @Column({ type: 'varchar', length: 255, name: 'feature_name' })
  featureName!: string;

  @Column({
    type: 'enum',
    enum: ['not_met', 'partially_met', 'fully_met', 'not_applicable'],
    name: 'self_score',
  })
  selfScore!: 'not_met' | 'partially_met' | 'fully_met' | 'not_applicable';

  @Column({ type: 'text', name: 'self_narrative', nullable: true })
  selfNarrative!: string | null;

  @Column({ type: 'jsonb', name: 'evidence_ids', default: '[]' })
  evidenceIds!: string[];

  @Column({
    type: 'enum',
    enum: ['not_met', 'partially_met', 'fully_met', 'not_applicable'],
    name: 'reviewer_score',
    nullable: true,
  })
  reviewerScore!: 'not_met' | 'partially_met' | 'fully_met' | 'not_applicable' | null;

  @Column({ type: 'text', name: 'reviewer_comment', nullable: true })
  reviewerComment!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
