import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a healthcare organisation (e.g. hospital, clinic) registered
 * on the ASPIRE EndoExpertise platform.
 */
@Entity('organisations')
export class Organisation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 100, name: 'organisation_type' })
  organisationType!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'post_code' })
  postCode!: string | null;

  @Column({ type: 'varchar', length: 100, default: 'Australia' })
  country!: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'phone_number' })
  phoneNumber!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'logo_url' })
  logoUrl!: string | null;

  @Column({
    type: 'enum',
    enum: ['none', 'bronze', 'silver', 'gold'],
    default: 'none',
    name: 'current_accreditation_tier',
  })
  currentAccreditationTier!: 'none' | 'bronze' | 'silver' | 'gold';

  @Column({ type: 'date', nullable: true, name: 'accreditation_expiry' })
  accreditationExpiry!: Date | null;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
