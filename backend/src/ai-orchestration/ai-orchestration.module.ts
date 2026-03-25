import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiOrchestrationController } from './ai-orchestration.controller';
import { AiOrchestrationService } from './ai-orchestration.service';
import { AiSession } from './entities/ai-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiSession])],
  controllers: [AiOrchestrationController],
  providers: [AiOrchestrationService],
  exports: [AiOrchestrationService],
})
export class AiOrchestrationModule {}
