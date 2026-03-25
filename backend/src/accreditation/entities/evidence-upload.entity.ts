import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents evidence uploaded to support an ASPIRE accreditation application.
 * Evidence can include documents, policies, protocols, audit reports, and other artefacts.
 */
@Entity('evidence_uploads')
export class EvidenceUpload {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'application_id' })
  applicationId!: string;

  @Column({ type: 'varchar', length: 50, name: 'feature_code' })
  featureCode!: string;

  @Column({ type: 'varchar', length: 255, name: 'file_name' })
  fileName!: string;

  @Column({ type: 'varchar', length: 100, name: 'mime_type' })
  mimeType!: string;

  @Column({ type: 'bigint', name: 'file_size_bytes' })
  fileSizeBytes!: number;

  @Column({ type: 'varchar', length: 1024, name: 'storage_url' })
  storageUrl!: string;

  @Column({
    type: 'enum',
    enum: ['policy', 'protocol', 'audit_report', 'training_record', 'patient_information', 'clinical_pathway', 'governance_document', 'other'],
    name: 'evidence_type',
  })
  evidenceType!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'uuid', name: 'uploaded_by' })
  uploadedBy!: string;

  @Column({ type: 'boolean', default: false, name: 'reviewer_verified' })
  reviewerVerified!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
