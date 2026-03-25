import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpdController } from './cpd.controller';
import { CpdService } from './cpd.service';
import { CpdActivity } from './entities/cpd-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CpdActivity])],
  controllers: [CpdController],
  providers: [CpdService],
  exports: [CpdService],
})
export class CpdModule {}
