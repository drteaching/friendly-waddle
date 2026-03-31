import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for the frontend application
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global validation pipe - strips unknown properties and transforms payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global exception filter for consistent error responses
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global audit interceptor for logging all API interactions
  app.useGlobalInterceptors(new AuditInterceptor());

  // Set global API prefix
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // Swagger / OpenAPI documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ASPIRE EndoExpertise Platform API')
    .setDescription(
      'API for the ASPIRE endometriosis centre accreditation and clinical workflow platform. ' +
      'Supports accreditation management, surgical case tracking, MDT coordination, ' +
      'CPD recording, patient passport, and AI-assisted clinical workflows.',
    )
    .setVersion('0.1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication and authorisation')
    .addTag('Accreditation', 'Accreditation application management')
    .addTag('Providers', 'Organisation and practitioner registry')
    .addTag('Surgical Cases', 'Surgical case tracking and PROMS')
    .addTag('Case Hub', 'MDT case discussion and coordination')
    .addTag('CPD', 'Continuing professional development tracking')
    .addTag('Patient Passport', 'Patient consent and data sharing')
    .addTag('Registry', 'Endometriosis clinical registry')
    .addTag('Video Vault', 'Surgical video management')
    .addTag('AI Orchestration', 'AI-assisted clinical workflows')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

   
  console.log(`ASPIRE EndoExpertise API is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();
