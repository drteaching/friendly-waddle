import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents an entry in the ASPIRE clinical outcomes registry.
 * Registry entries aggregate de-identified clinical data for
 * benchmarking, research, and quality improvement purposes.
 */
@Entity('registry_entries')
export class RegistryEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({ type: 'uuid', name: 'surgical_case_id', nullable: true })
  surgicalCaseId!: string | null;

  @Column({ type: 'uuid', name: 'patient_id', nullable: true })
  patientId!: string | null;

  @Column({ type: 'varchar', length: 100, name: 'registry_type' })
  registryType!: string;

  @Column({ type: 'integer', nullable: true, name: 'patient_age_at_procedure' })
  patientAgeAtProcedure!: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'procedure_type' })
  procedureType!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'endometriosis_stage' })
  endometriosisStage!: string | null;

  @Column({ type: 'jsonb', name: 'disease_locations', default: '[]' })
  diseaseLocations!: string[];

  @Column({ type: 'jsonb', name: 'outcome_data', default: '{}' })
  outcomeData!: Record<string, any>;

  @Column({ type: 'jsonb', name: 'proms_data', default: '{}' })
  promsData!: Record<string, any>;

  @Column({ type: 'boolean', default: true, name: 'is_de_identified' })
  isDeIdentified!: boolean;

  @Column({ type: 'boolean', default: false, name: 'consent_verified' })
  consentVerified!: boolean;

  @Column({ type: 'date', name: 'procedure_date', nullable: true })
  procedureDate!: Date | null;

  @Column({
    type: 'enum',
    enum: ['draft', 'submitted', 'validated', 'published'],
    default: 'draft',
  })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
