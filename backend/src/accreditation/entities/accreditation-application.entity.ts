import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents an ASPIRE accreditation application for an endometriosis centre.
 * Tracks the full lifecycle from initial self-assessment through to approval.
 */
@Entity('accreditation_applications')
export class AccreditationApplication {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({
    type: 'enum',
    enum: ['bronze', 'silver', 'gold'],
    name: 'target_tier',
  })
  targetTier!: 'bronze' | 'silver' | 'gold';

  @Column({
    type: 'enum',
    enum: ['draft', 'self_assessment', 'evidence_upload', 'submitted', 'under_review', 'approved', 'rejected', 'revision_requested'],
    default: 'draft',
  })
  status!: string;

  @Column({ type: 'jsonb', name: 'feature_assessments', default: '{}' })
  featureAssessments!: Record<string, FeatureAssessment>;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'compliance_score', nullable: true })
  complianceScore!: number | null;

  @Column({ type: 'uuid', name: 'lead_applicant_id' })
  leadApplicantId!: string;

  @Column({ type: 'uuid', name: 'assigned_reviewer_id', nullable: true })
  assignedReviewerId!: string | null;

  @Column({ type: 'text', name: 'reviewer_notes', nullable: true })
  reviewerNotes!: string | null;

  @Column({ type: 'jsonb', name: 'gentle_nudges', default: '[]' })
  gentleNudges!: GentleNudge[];

  @Column({ type: 'timestamp', name: 'submitted_at', nullable: true })
  submittedAt!: Date | null;

  @Column({ type: 'timestamp', name: 'reviewed_at', nullable: true })
  reviewedAt!: Date | null;

  @Column({ type: 'timestamp', name: 'approved_at', nullable: true })
  approvedAt!: Date | null;

  @Column({ type: 'date', name: 'expiry_date', nullable: true })
  expiryDate!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}

/** Assessment of a single ASPIRE feature within an application. */
export interface FeatureAssessment {
  featureCode: string;
  featureName: string;
  selfScore: 'not_met' | 'partially_met' | 'fully_met' | 'not_applicable';
  selfNarrative: string;
  evidenceIds: string[];
  reviewerScore?: 'not_met' | 'partially_met' | 'fully_met' | 'not_applicable';
  reviewerComment?: string;
}

/** A contextual suggestion to help applicants improve their submission. */
export interface GentleNudge {
  featureCode: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  category: 'missing_evidence' | 'incomplete_narrative' | 'score_mismatch' | 'growth_opportunity';
}
