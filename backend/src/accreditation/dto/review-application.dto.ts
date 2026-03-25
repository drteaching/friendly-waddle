import { IsString, IsEnum, IsNotEmpty, IsUUID, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for submitting a reviewer's assessment of an application.
 */
export class ReviewApplicationDto {
  @ApiProperty({ description: 'UUID of the reviewer' })
  @IsUUID()
  @IsNotEmpty()
  reviewerId!: string;

  @ApiProperty({
    description: 'Per-feature reviewer assessments keyed by feature code',
    example: {
      'GOV-01': { reviewerScore: 'fully_met', reviewerComment: 'Well evidenced governance structure' },
    },
  })
  @IsObject()
  @IsNotEmpty()
  featureReviews!: Record<
    string,
    { reviewerScore: string; reviewerComment: string }
  >;

  @ApiProperty({ description: 'Overall reviewer notes and observations' })
  @IsString()
  @IsNotEmpty()
  overallNotes!: string;

  @ApiProperty({
    description: 'Review decision',
    enum: ['approved', 'rejected', 'revision_requested'],
  })
  @IsEnum(['approved', 'rejected', 'revision_requested'])
  @IsNotEmpty()
  decision!: 'approved' | 'rejected' | 'revision_requested';
}
