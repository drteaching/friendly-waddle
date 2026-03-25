import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PatientPassportService } from './patient-passport.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Patient Passport')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient-passport')
export class PatientPassportController {
  constructor(private readonly patientPassportService: PatientPassportService) {}

  // ---- Patient endpoints ----

  @Post('patients')
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiResponse({ status: 201, description: 'Patient registered successfully' })
  async createPatient(@Body() body: any) {
    return this.patientPassportService.createPatient(body);
  }

  @Get('patients/:id/passport')
  @ApiOperation({ summary: 'Retrieve the patient passport (summary view)' })
  @ApiResponse({ status: 200, description: 'Patient passport retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  @ApiParam({ name: 'id', description: 'Patient UUID' })
  async getPassport(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientPassportService.getPassport(id);
  }

  @Patch('patients/:id')
  @ApiOperation({ summary: 'Update patient details' })
  @ApiResponse({ status: 200, description: 'Patient updated successfully' })
  @ApiParam({ name: 'id', description: 'Patient UUID' })
  async updatePatient(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.patientPassportService.updatePatient(id, body);
  }

  // ---- Consent endpoints ----

  @Post('patients/:patientId/consent')
  @ApiOperation({ summary: 'Record or update a consent decision for a patient' })
  @ApiResponse({ status: 201, description: 'Consent recorded successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  async updateConsent(
    @Param('patientId', ParseUUIDPipe) patientId: string,
    @Body() body: any,
  ) {
    return this.patientPassportService.updateConsent(patientId, body);
  }

  @Get('patients/:patientId/consent')
  @ApiOperation({ summary: 'Retrieve all consent records for a patient' })
  @ApiResponse({ status: 200, description: 'Consent records retrieved successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  async getConsents(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.patientPassportService.getConsents(patientId);
  }

  // ---- Journey timeline endpoints ----

  @Post('patients/:patientId/journey')
  @ApiOperation({ summary: 'Add a journey entry to the patient timeline' })
  @ApiResponse({ status: 201, description: 'Journey entry added successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  async addJourneyEntry(
    @Param('patientId', ParseUUIDPipe) patientId: string,
    @Body() body: any,
  ) {
    return this.patientPassportService.addJourneyEntry(patientId, body);
  }

  @Get('patients/:patientId/journey')
  @ApiOperation({ summary: 'Retrieve the patient journey timeline' })
  @ApiResponse({ status: 200, description: 'Journey timeline retrieved successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  async getJourney(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.patientPassportService.getJourneyTimeline(patientId);
  }

  // ---- Provider sharing endpoints ----

  @Get('patients/:patientId/providers')
  @ApiOperation({ summary: 'List providers the patient has shared data with' })
  @ApiResponse({ status: 200, description: 'Provider list retrieved successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  async getMyProviders(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.patientPassportService.getMyProviders(patientId);
  }

  @Post('patients/:patientId/providers/:organisationId/share')
  @ApiOperation({ summary: 'Share patient data with a provider organisation' })
  @ApiResponse({ status: 200, description: 'Data shared with provider successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  @ApiParam({ name: 'organisationId', description: 'Organisation UUID' })
  async shareWithProvider(
    @Param('patientId', ParseUUIDPipe) patientId: string,
    @Param('organisationId', ParseUUIDPipe) organisationId: string,
    @Body() body: { dataCategories: string[] },
  ) {
    return this.patientPassportService.shareWithProvider(patientId, organisationId, body.dataCategories);
  }

  @Delete('patients/:patientId/providers/:organisationId')
  @ApiOperation({ summary: 'Revoke data access for a provider organisation' })
  @ApiResponse({ status: 200, description: 'Provider access revoked successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  @ApiParam({ name: 'organisationId', description: 'Organisation UUID' })
  async revokeProviderAccess(
    @Param('patientId', ParseUUIDPipe) patientId: string,
    @Param('organisationId', ParseUUIDPipe) organisationId: string,
  ) {
    return this.patientPassportService.revokeProviderAccess(patientId, organisationId);
  }

  // ---- Data export endpoint ----

  @Get('patients/:patientId/export')
  @ApiOperation({ summary: 'Export all patient data (data portability)' })
  @ApiResponse({ status: 200, description: 'Patient data exported successfully' })
  @ApiParam({ name: 'patientId', description: 'Patient UUID' })
  async exportMyData(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.patientPassportService.exportMyData(patientId);
  }
}
