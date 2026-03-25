import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccreditationModule } from './accreditation/accreditation.module';
import { ProvidersModule } from './providers/providers.module';
import { SurgicalCasesModule } from './surgical-cases/surgical-cases.module';
import { CaseHubModule } from './case-hub/case-hub.module';
import { CpdModule } from './cpd/cpd.module';
import { PatientPassportModule } from './patient-passport/patient-passport.module';
import { RegistryModule } from './registry/registry.module';
import { VideoVaultModule } from './video-vault/video-vault.module';
import { AiOrchestrationModule } from './ai-orchestration/ai-orchestration.module';
import { NotificationsModule } from './notifications/notifications.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    // Global configuration module - loads .env variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),

    // TypeORM database connection using async factory
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),

    // Feature modules
    AuthModule,
    AccreditationModule,
    ProvidersModule,
    SurgicalCasesModule,
    CaseHubModule,
    CpdModule,
    PatientPassportModule,
    RegistryModule,
    VideoVaultModule,
    AiOrchestrationModule,
    NotificationsModule,
  ],
})
export class AppModule {}
