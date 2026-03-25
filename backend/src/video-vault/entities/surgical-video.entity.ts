import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a surgical video stored in the ASPIRE Video Vault.
 * Videos are securely stored in Azure Blob Storage and can be
 * used for peer review, training, and quality improvement.
 */
@Entity('surgical_videos')
export class SurgicalVideo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'surgical_case_id', nullable: true })
  surgicalCaseId!: string | null;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({ type: 'uuid', name: 'surgeon_id' })
  surgeonId!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 255, name: 'file_name' })
  fileName!: string;

  @Column({ type: 'varchar', length: 100, name: 'mime_type' })
  mimeType!: string;

  @Column({ type: 'bigint', name: 'file_size_bytes' })
  fileSizeBytes!: number;

  @Column({ type: 'integer', nullable: true, name: 'duration_seconds' })
  durationSeconds!: number | null;

  @Column({ type: 'varchar', length: 1024, name: 'storage_url' })
  storageUrl!: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, name: 'thumbnail_url' })
  thumbnailUrl!: string | null;

  @Column({
    type: 'enum',
    enum: ['uploading', 'processing', 'available', 'archived', 'failed'],
    default: 'uploading',
  })
  status!: string;

  @Column({ type: 'boolean', default: false, name: 'is_anonymised' })
  isAnonymised!: boolean;

  @Column({ type: 'boolean', default: false, name: 'patient_consent_obtained' })
  patientConsentObtained!: boolean;

  @Column({ type: 'jsonb', default: '[]' })
  tags!: string[];

  @Column({ type: 'jsonb', default: '[]' })
  annotations!: Array<{
    timestamp: number;
    label: string;
    note: string;
    createdBy: string;
  }>;

  @Column({ type: 'uuid', nullable: true, name: 'reviewed_by' })
  reviewedBy!: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'reviewed_at' })
  reviewedAt!: Date | null;

  @Column({ type: 'text', nullable: true, name: 'review_notes' })
  reviewNotes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
