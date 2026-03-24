import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a surgical case recorded within the ASPIRE platform.
 * Captures procedure details, outcomes, and links to associated PROMS data.
 */
@Entity('surgical_cases')
export class SurgicalCase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({ type: 'uuid', name: 'surgeon_id' })
  surgeonId!: string;

  @Column({ type: 'uuid', name: 'patient_id', nullable: true })
  patientId!: string | null;

  @Column({ type: 'varchar', length: 100, name: 'procedure_type' })
  procedureType!: string;

  @Column({ type: 'varchar', length: 500, name: 'procedure_description', nullable: true })
  procedureDescription!: string | null;

  @Column({ type: 'date', name: 'procedure_date' })
  procedureDate!: Date;

  @Column({
    type: 'enum',
    enum: ['stage_i', 'stage_ii', 'stage_iii', 'stage_iv', 'not_applicable'],
    nullable: true,
    name: 'endometriosis_stage',
  })
  endometriosisStage!: string | null;

  @Column({ type: 'jsonb', name: 'disease_locations', default: '[]' })
  diseaseLocations!: string[];

  @Column({ type: 'jsonb', name: 'enzian_score', nullable: true })
  enzianScore!: Record<string, any> | null;

  @Column({ type: 'integer', nullable: true, name: 'operative_time_minutes' })
  operativeTimeMinutes!: number | null;

  @Column({ type: 'integer', nullable: true, name: 'estimated_blood_loss_ml' })
  estimatedBloodLossMl!: number | null;

  @Column({ type: 'boolean', default: false, name: 'conversion_to_open' })
  conversionToOpen!: boolean;

  @Column({ type: 'jsonb', name: 'complications', default: '[]' })
  complications!: string[];

  @Column({
    type: 'enum',
    enum: ['none', 'minor', 'major'],
    default: 'none',
    name: 'complication_grade',
  })
  complicationGrade!: string;

  @Column({ type: 'integer', nullable: true, name: 'length_of_stay_days' })
  lengthOfStayDays!: number | null;

  @Column({ type: 'text', nullable: true, name: 'operative_notes' })
  operativeNotes!: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'video_id' })
  videoId!: string | null;

  @Column({
    type: 'enum',
    enum: ['draft', 'completed', 'reviewed', 'audited'],
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
