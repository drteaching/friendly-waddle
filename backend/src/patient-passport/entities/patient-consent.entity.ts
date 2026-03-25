import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a patient's consent decision for data sharing or processing.
 * Consent is granular and can be granted or withdrawn for specific purposes,
 * data types, and recipient categories.
 */
@Entity('patient_consents')
export class PatientConsent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'patient_id' })
  patientId!: string;

  @Column({
    type: 'enum',
    enum: [
      'clinical_care',
      'registry_participation',
      'research',
      'ai_processing',
      'data_sharing',
      'proms_collection',
      'video_recording',
    ],
    name: 'consent_type',
  })
  consentType!: string;

  @Column({ type: 'boolean', default: false, name: 'is_granted' })
  isGranted!: boolean;

  @Column({ type: 'text', nullable: true, name: 'consent_text' })
  consentText!: string | null;

  @Column({ type: 'varchar', length: 50, name: 'consent_version' })
  consentVersion!: string;

  @Column({
    type: 'enum',
    enum: ['electronic', 'paper', 'verbal'],
    name: 'collection_method',
  })
  collectionMethod!: string;

  @Column({ type: 'uuid', nullable: true, name: 'collected_by' })
  collectedBy!: string | null;

  @Column({ type: 'timestamp', name: 'granted_at', nullable: true })
  grantedAt!: Date | null;

  @Column({ type: 'timestamp', name: 'withdrawn_at', nullable: true })
  withdrawnAt!: Date | null;

  @Column({ type: 'date', nullable: true, name: 'expiry_date' })
  expiryDate!: Date | null;

  @Column({ type: 'jsonb', nullable: true, name: 'additional_conditions' })
  additionalConditions!: Record<string, any> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
