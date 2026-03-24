import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a healthcare practitioner registered on the platform.
 * Practitioners are linked to organisations and hold specific clinical roles.
 */
@Entity('practitioners')
export class Practitioner {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'organisation_id' })
  organisationId!: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100, name: 'clinical_role' })
  clinicalRole!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  speciality!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'registration_number' })
  registrationNumber!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'registration_body' })
  registrationBody!: string | null;

  @Column({ type: 'simple-array', nullable: true })
  roles!: string[] | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'avatar_url' })
  avatarUrl!: string | null;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive!: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
  lastLoginAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
