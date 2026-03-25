import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a contribution (comment, opinion, or recommendation) within a case discussion.
 * Contributions are attributed to individual practitioners and may include
 * clinical recommendations or requests for further information.
 */
@Entity('case_contributions')
export class CaseContribution {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'discussion_id' })
  discussionId!: string;

  @Column({ type: 'uuid', name: 'practitioner_id' })
  practitionerId!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({
    type: 'enum',
    enum: ['comment', 'recommendation', 'question', 'answer', 'summary'],
    default: 'comment',
    name: 'contribution_type',
  })
  contributionType!: string;

  @Column({ type: 'jsonb', name: 'attachments', default: '[]' })
  attachments!: Array<{ fileName: string; url: string; mimeType: string }>;

  @Column({ type: 'boolean', default: false, name: 'is_ai_generated' })
  isAiGenerated!: boolean;

  @Column({ type: 'boolean', default: false, name: 'clinician_reviewed' })
  clinicianReviewed!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
