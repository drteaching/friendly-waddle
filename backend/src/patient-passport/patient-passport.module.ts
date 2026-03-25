import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientPassportController } from './patient-passport.controller';
import { PatientPassportService } from './patient-passport.service';
import { Patient } from './entities/patient.entity';
import { PatientConsent } from './entities/patient-consent.entity';
import { ConsentEvaluationMiddleware } from './middleware/consent-evaluation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, PatientConsent])],
  controllers: [PatientPassportController],
  providers: [PatientPassportService],
  exports: [PatientPassportService],
})
export class PatientPassportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConsentEvaluationMiddleware)
      .forRoutes(PatientPassportController);
  }
}
