import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data transfer object for recording a new surgical case.
 */
export class CreateCaseDto {
  @ApiProperty({ description: 'UUID of the organisation where the procedure was performed' })
  @IsUUID()
  @IsNotEmpty()
  organisationId!: string;

  @ApiProperty({ description: 'UUID of the lead surgeon' })
  @IsUUID()
  @IsNotEmpty()
  surgeonId!: string;

  @ApiPropertyOptional({ description: 'UUID of the patient (if consented)' })
  @IsOptional()
  @IsUUID()
  patientId?: string;

  @ApiProperty({ description: 'Type of surgical procedure performed' })
  @IsString()
  @IsNotEmpty()
  procedureType!: string;

  @ApiPropertyOptional({ description: 'Detailed procedure description' })
  @IsOptional()
  @IsString()
  procedureDescription?: string;

  @ApiProperty({ description: 'Date the procedure was performed (ISO 8601)' })
  @IsDateString()
  @IsNotEmpty()
  procedureDate!: string;

  @ApiPropertyOptional({
    description: 'rASRM endometriosis staging classification',
    enum: ['stage_i', 'stage_ii', 'stage_iii', 'stage_iv', 'not_applicable'],
  })
  @IsOptional()
  @IsEnum(['stage_i', 'stage_ii', 'stage_iii', 'stage_iv', 'not_applicable'])
  endometriosisStage?: string;

  @ApiPropertyOptional({ description: 'Anatomical locations where disease was found', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diseaseLocations?: string[];

  @ApiPropertyOptional({ description: 'Operative time in minutes' })
  @IsOptional()
  @IsNumber()
  operativeTimeMinutes?: number;

  @ApiPropertyOptional({ description: 'Estimated blood loss in millilitres' })
  @IsOptional()
  @IsNumber()
  estimatedBloodLossMl?: number;

  @ApiPropertyOptional({ description: 'Whether the procedure was converted to open surgery' })
  @IsOptional()
  @IsBoolean()
  conversionToOpen?: boolean;

  @ApiPropertyOptional({ description: 'Operative notes or summary' })
  @IsOptional()
  @IsString()
  operativeNotes?: string;
}
