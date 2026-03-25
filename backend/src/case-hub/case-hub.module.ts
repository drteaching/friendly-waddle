import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseHubController } from './case-hub.controller';
import { CaseHubService } from './case-hub.service';
import { CaseDiscussion } from './entities/case-discussion.entity';
import { CaseContribution } from './entities/case-contribution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseDiscussion, CaseContribution])],
  controllers: [CaseHubController],
  providers: [CaseHubService],
  exports: [CaseHubService],
})
export class CaseHubModule {}
