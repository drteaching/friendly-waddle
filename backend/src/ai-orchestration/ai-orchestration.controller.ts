import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AiOrchestrationService } from './ai-orchestration.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('AI Orchestration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ai')
export class AiOrchestrationController {
  constructor(private readonly aiService: AiOrchestrationService) {}

  @Post('consultation/start')
  @ApiOperation({ summary: 'Start a new AI-assisted consultation session' })
  @ApiResponse({ status: 201, description: 'Consultation session started' })
  async startConsultationSession(
    @Body() body: {
      practitionerId: string;
      patientId?: string;
      sessionType: string;
      context?: Record<string, any>;
    },
  ) {
    return this.aiService.startConsultationSession(body);
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: 'Retrieve an AI session by ID' })
  @ApiResponse({ status: 200, description: 'Session retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiParam({ name: 'id', description: 'Session UUID' })
  async getSession(@Param('id', ParseUUIDPipe) id: string) {
    return this.aiService.getSession(id);
  }

  @Post('sessions/:id/pause')
  @ApiOperation({ summary: 'Pause an active AI session (clinician override)' })
  @ApiResponse({ status: 200, description: 'Session paused successfully' })
  @ApiParam({ name: 'id', description: 'Session UUID' })
  async pauseAi(@Param('id', ParseUUIDPipe) id: string) {
    return this.aiService.pauseAi(id);
  }

  @Post('sessions/:id/resume')
  @ApiOperation({ summary: 'Resume a paused AI session' })
  @ApiResponse({ status: 200, description: 'Session resumed successfully' })
  @ApiParam({ name: 'id', description: 'Session UUID' })
  async resumeSession(@Param('id', ParseUUIDPipe) id: string) {
    return this.aiService.resumeSession(id);
  }

  @Post('sessions/:id/finalise')
  @ApiOperation({ summary: 'Finalise an AI session and record outcomes' })
  @ApiResponse({ status: 200, description: 'Session finalised successfully' })
  @ApiParam({ name: 'id', description: 'Session UUID' })
  async finaliseSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: {
      clinicianApproved: boolean;
      clinicianNotes?: string;
      outcomes?: Record<string, any>;
    },
  ) {
    return this.aiService.finaliseSession(id, body);
  }

  @Post('surgical-audit/start')
  @ApiOperation({ summary: 'Start an AI-assisted surgical case audit' })
  @ApiResponse({ status: 201, description: 'Surgical audit session started' })
  async startSurgicalAudit(
    @Body() body: {
      practitionerId: string;
      surgicalCaseId: string;
      videoId?: string;
      auditCriteria?: string[];
    },
  ) {
    return this.aiService.startSurgicalAudit(body);
  }
}
