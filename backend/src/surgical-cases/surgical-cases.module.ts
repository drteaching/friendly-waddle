import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurgicalCasesController } from './surgical-cases.controller';
import { SurgicalCasesService } from './surgical-cases.service';
import { SurgicalCase } from './entities/surgical-case.entity';
import { PromsResponse } from './entities/proms-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurgicalCase, PromsResponse])],
  controllers: [SurgicalCasesController],
  providers: [SurgicalCasesService],
  exports: [SurgicalCasesService],
})
export class SurgicalCasesModule {}
