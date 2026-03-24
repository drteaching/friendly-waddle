import { IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for creating a new accreditation application.
 */
export class CreateApplicationDto {
  @ApiProperty({ description: 'UUID of the applying organisation' })
  @IsUUID()
  @IsNotEmpty()
  organisationId!: string;

  @ApiProperty({
    description: 'Target accreditation tier',
    enum: ['bronze', 'silver', 'gold'],
  })
  @IsEnum(['bronze', 'silver', 'gold'])
  @IsNotEmpty()
  targetTier!: 'bronze' | 'silver' | 'gold';

  @ApiProperty({ description: 'UUID of the lead applicant (practitioner)' })
  @IsUUID()
  @IsNotEmpty()
  leadApplicantId!: string;
}
