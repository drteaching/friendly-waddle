import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data transfer object for the ENZIAN classification of deep endometriosis.
 * The ENZIAN system provides a standardised surgical description of deep
 * endometriosis lesion locations and severity.
 *
 * Compartments:
 *   A - Vagina / rectovaginal space
 *   B - Uterosacral ligaments / pelvic sidewall
 *   C - Rectum / sigmoid
 *   FA - Adenomyosis
 *   FB - Bladder
 *   FU - Ureter (intrinsic)
 *   FI - Other bowel locations
 *   FO - Other locations
 *
 * Grades: 1 (lesion <1cm), 2 (1-3cm), 3 (>3cm)
 */
export class EnzianScoreDto {
  @ApiPropertyOptional({
    description: 'Compartment A grade (vagina / rectovaginal space)',
    enum: ['0', '1', '2', '3'],
  })
  @IsOptional()
  @IsEnum(['0', '1', '2', '3'])
  compartmentA?: string;

  @ApiPropertyOptional({
    description: 'Compartment B grade (uterosacral ligaments / pelvic sidewall)',
    enum: ['0', '1', '2', '3'],
  })
  @IsOptional()
  @IsEnum(['0', '1', '2', '3'])
  compartmentB?: string;

  @ApiPropertyOptional({
    description: 'Compartment C grade (rectum / sigmoid)',
    enum: ['0', '1', '2', '3'],
  })
  @IsOptional()
  @IsEnum(['0', '1', '2', '3'])
  compartmentC?: string;

  @ApiPropertyOptional({ description: 'FA - Adenomyosis involvement' })
  @IsOptional()
  @IsString()
  fa?: string;

  @ApiPropertyOptional({ description: 'FB - Bladder involvement' })
  @IsOptional()
  @IsString()
  fb?: string;

  @ApiPropertyOptional({ description: 'FU - Intrinsic ureteral involvement' })
  @IsOptional()
  @IsString()
  fu?: string;

  @ApiPropertyOptional({ description: 'FI - Other bowel involvement' })
  @IsOptional()
  @IsString()
  fi?: string;

  @ApiPropertyOptional({ description: 'FO - Other location involvement' })
  @IsOptional()
  @IsString()
  fo?: string;

  @ApiPropertyOptional({ description: 'Additional notes on the ENZIAN classification' })
  @IsOptional()
  @IsString()
  notes?: string;
}
