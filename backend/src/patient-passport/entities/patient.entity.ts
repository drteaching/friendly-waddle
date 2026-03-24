import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a patient within the ASPIRE EndoExpertise platform.
 * Patient data is subject to strict consent controls and can only be
 * accessed in accordance with the patient's active consent preferences.
 */
@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'phone_number' })
  phoneNumber!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'medical_record_number' })
  medicalRecordNumber!: string | null;

  @Column({ type: 'uuid', name: 'primary_organisation_id', nullable: true })
  primaryOrganisationId!: string | null;

  @Column({ type: 'uuid', name: 'primary_practitioner_id', nullable: true })
  primaryPractitionerId!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'passport_access_code' })
  passportAccessCode!: string | null;

  @Column({ type: 'jsonb', name: 'journey_timeline', default: '[]' })
  journeyTimeline!: any[];

  @Column({ type: 'jsonb', name: 'shared_providers', default: '[]' })
  sharedProviders!: Array<{ organisationId: string; dataCategories: string[]; sharedAt: Date }>;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
