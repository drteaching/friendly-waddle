import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccreditationController } from './accreditation.controller';
import { AccreditationService } from './accreditation.service';
import { AccreditationApplication } from './entities/accreditation-application.entity';
import { FeatureAssessmentEntity } from './entities/feature-assessment.entity';
import { EvidenceUpload } from './entities/evidence-upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccreditationApplication,
      FeatureAssessmentEntity,
      EvidenceUpload,
    ]),
  ],
  controllers: [AccreditationController],
  providers: [AccreditationService],
  exports: [AccreditationService],
})
export class AccreditationModule {}
