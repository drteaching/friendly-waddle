import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AccreditationService } from './accreditation.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
import { ReviewApplicationDto } from './dto/review-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Accreditation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('accreditation')
export class AccreditationController {
  constructor(private readonly accreditationService: AccreditationService) {}

  @Post('applications')
  @ApiOperation({ summary: 'Create a new accreditation application' })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async createApplication(@Body() dto: CreateApplicationDto) {
    return this.accreditationService.createApplication(
      dto.organisationId,
      dto.targetTier,
      dto.leadApplicantId,
    );
  }

  @Get('applications')
  @ApiOperation({ summary: 'List accreditation applications with optional filtering' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  @ApiQuery({ name: 'organisationId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async getApplications(
    @Query('organisationId') organisationId?: string,
    @Query('status') status?: string,
  ) {
    return this.accreditationService.getApplications({ organisationId, status });
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Retrieve a single accreditation application by ID' })
  @ApiResponse({ status: 200, description: 'Application retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async getApplicationById(@Param('id', ParseUUIDPipe) id: string) {
    return this.accreditationService.getApplicationById(id);
  }

  @Post('applications/:id/features')
  @ApiOperation({ summary: 'Submit or update a feature self-assessment within the application' })
  @ApiResponse({ status: 200, description: 'Feature assessment submitted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid assessment or application status' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async submitFeatureAssessment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.accreditationService.submitFeatureAssessment(id, dto);
  }

  @Post('applications/:id/evidence')
  @ApiOperation({ summary: 'Upload evidence artefact for an accreditation application' })
  @ApiResponse({ status: 201, description: 'Evidence uploaded successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async uploadEvidence(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    body: {
      featureCode: string;
      fileName: string;
      mimeType: string;
      fileSizeBytes: number;
      storageUrl: string;
      evidenceType: string;
      description?: string;
      uploadedBy: string;
    },
  ) {
    return this.accreditationService.uploadEvidence(id, body);
  }

  @Post('applications/:id/submit')
  @ApiOperation({ summary: 'Submit the application for formal review' })
  @ApiResponse({ status: 200, description: 'Application submitted for review' })
  @ApiResponse({ status: 400, description: 'Application not ready for submission' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async submitApplication(@Param('id', ParseUUIDPipe) id: string) {
    return this.accreditationService.submitApplication(id);
  }

  @Post('applications/:id/reviewers')
  @Roles('admin', 'reviewer')
  @ApiOperation({ summary: 'Assign a reviewer to an application' })
  @ApiResponse({ status: 200, description: 'Reviewer assigned successfully' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async assignReviewers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reviewerId: string },
  ) {
    return this.accreditationService.assignReviewers(id, body.reviewerId);
  }

  @Post('applications/:id/review')
  @Roles('admin', 'reviewer')
  @ApiOperation({ summary: 'Submit a reviewer assessment for the application' })
  @ApiResponse({ status: 200, description: 'Review submitted successfully' })
  @ApiResponse({ status: 400, description: 'Application not in reviewable status' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async submitReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReviewApplicationDto,
  ) {
    return this.accreditationService.submitReview(id, dto);
  }

  @Post('applications/:id/approve')
  @Roles('admin', 'reviewer')
  @ApiOperation({ summary: 'Approve an accreditation application' })
  @ApiResponse({ status: 200, description: 'Application approved successfully' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async approveApplication(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reviewerId: string },
  ) {
    return this.accreditationService.approveApplication(id, body.reviewerId);
  }

  @Get('applications/:id/nudges')
  @ApiOperation({ summary: 'Retrieve gentle nudges (contextual suggestions) for an application' })
  @ApiResponse({ status: 200, description: 'Nudges generated successfully' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async getNudges(@Param('id', ParseUUIDPipe) id: string) {
    return this.accreditationService.generateGentleNudges(id);
  }

  @Get('applications/:id/compliance-score')
  @ApiOperation({ summary: 'Calculate and return the current compliance score' })
  @ApiResponse({ status: 200, description: 'Compliance score calculated successfully' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  async getComplianceScore(@Param('id', ParseUUIDPipe) id: string) {
    return this.accreditationService.calculateComplianceScore(id);
  }
}
