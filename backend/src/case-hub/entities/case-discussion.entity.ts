import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a case discussion thread in the Case Hub.
 * Allows multidisciplinary teams to collaborate on complex endometriosis cases
 * with structured clinical discussion and peer review.
 */
@Entity('case_discussions')
export class CaseDiscussion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'uuid', name: 'surgical_case_id', nullable: true })
  surgicalCaseId!: string | null;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy!: string;

  @Column({
    type: 'enum',
    enum: ['open', 'in_progress', 'awaiting_input', 'resolved', 'closed'],
    default: 'open',
  })
  status!: string;

  @Column({
    type: 'enum',
    enum: ['routine', 'urgent', 'complex'],
    default: 'routine',
  })
  priority!: string;

  @Column({ type: 'simple-array', nullable: true, name: 'invited_practitioner_ids' })
  invitedPractitionerIds!: string[] | null;

  @Column({ type: 'jsonb', default: '[]' })
  tags!: string[];

  @Column({ type: 'boolean', default: false, name: 'is_anonymised' })
  isAnonymised!: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'resolved_at' })
  resolvedAt!: Date | null;

  // MDT meeting fields
  @Column({ type: 'timestamp', nullable: true, name: 'mdt_scheduled_at' })
  mdtScheduledAt!: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'mdt_location' })
  mdtLocation!: string | null;

  @Column({ type: 'text', nullable: true, name: 'mdt_agenda' })
  mdtAgenda!: string | null;

  @Column({ type: 'text', nullable: true, name: 'mdt_outcomes' })
  mdtOutcomes!: string | null;

  @Column({ type: 'simple-array', nullable: true, name: 'mdt_attendee_ids' })
  mdtAttendeeIds!: string[] | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
