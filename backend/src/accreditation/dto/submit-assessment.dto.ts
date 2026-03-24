import { IsString, IsEnum, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data transfer object for submitting a feature self-assessment.
 */
export class SubmitAssessmentDto {
  @ApiProperty({ description: 'Feature code (e.g. GOV-01, SURG-02)' })
  @IsString()
  @IsNotEmpty()
  featureCode!: string;

  @ApiProperty({ description: 'Human-readable feature name' })
  @IsString()
  @IsNotEmpty()
  featureName!: string;

  @ApiProperty({
    description: 'Self-assessment score for this feature',
    enum: ['not_met', 'partially_met', 'fully_met', 'not_applicable'],
  })
  @IsEnum(['not_met', 'partially_met', 'fully_met', 'not_applicable'])
  @IsNotEmpty()
  selfScore!: 'not_met' | 'partially_met' | 'fully_met' | 'not_applicable';

  @ApiProperty({ description: 'Narrative description of how the centre meets this feature' })
  @IsString()
  @IsNotEmpty()
  selfNarrative!: string;

  @ApiPropertyOptional({ description: 'UUIDs of associated evidence uploads', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  evidenceIds?: string[];
}
