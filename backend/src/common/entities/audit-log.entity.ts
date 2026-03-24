import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Represents an entry in the platform audit log.
 * Every significant action (data access, modification, consent change)
 * is recorded for compliance and accountability purposes.
 */
@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true, name: 'user_id' })
  userId!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'user_email' })
  userEmail!: string | null;

  @Column({ type: 'varchar', length: 100 })
  action!: string;

  @Column({ type: 'varchar', length: 100, name: 'resource_type' })
  resourceType!: string;

  @Column({ type: 'uuid', nullable: true, name: 'resource_id' })
  resourceId!: string | null;

  @Column({ type: 'varchar', length: 10, name: 'http_method', nullable: true })
  httpMethod!: string | null;

  @Column({ type: 'varchar', length: 500, name: 'request_path', nullable: true })
  requestPath!: string | null;

  @Column({ type: 'varchar', length: 45, name: 'ip_address', nullable: true })
  ipAddress!: string | null;

  @Column({ type: 'varchar', length: 500, name: 'user_agent', nullable: true })
  userAgent!: string | null;

  @Column({ type: 'jsonb', nullable: true, name: 'old_values' })
  oldValues!: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true, name: 'new_values' })
  newValues!: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata!: Record<string, any> | null;

  @Column({
    type: 'enum',
    enum: ['success', 'failure', 'denied'],
    default: 'success',
  })
  outcome!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
