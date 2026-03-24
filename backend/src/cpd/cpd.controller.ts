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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CpdService } from './cpd.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('CPD')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cpd')
export class CpdController {
  constructor(private readonly cpdService: CpdService) {}

  @Post('activities')
  @ApiOperation({ summary: 'Log a new CPD activity' })
  @ApiResponse({ status: 201, description: 'CPD activity logged successfully' })
  async logActivity(@Body() body: any) {
    return this.cpdService.logActivity(body);
  }

  @Get('activities')
  @ApiOperation({ summary: 'List CPD activities for a practitioner' })
  @ApiResponse({ status: 200, description: 'CPD activities retrieved successfully' })
  @ApiQuery({ name: 'practitionerId', required: false })
  @ApiQuery({ name: 'organisationId', required: false })
  async getActivities(
    @Query('practitionerId') practitionerId?: string,
    @Query('organisationId') organisationId?: string,
  ) {
    return this.cpdService.getActivities({ practitionerId, organisationId });
  }

  @Get('activities/:id')
  @ApiOperation({ summary: 'Retrieve a CPD activity by ID' })
  @ApiResponse({ status: 200, description: 'CPD activity retrieved successfully' })
  @ApiResponse({ status: 404, description: 'CPD activity not found' })
  @ApiParam({ name: 'id', description: 'CPD activity UUID' })
  async getActivityById(@Param('id', ParseUUIDPipe) id: string) {
    return this.cpdService.getActivityById(id);
  }

  @Patch('activities/:id')
  @ApiOperation({ summary: 'Update a CPD activity' })
  @ApiResponse({ status: 200, description: 'CPD activity updated successfully' })
  @ApiParam({ name: 'id', description: 'CPD activity UUID' })
  async updateActivity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.cpdService.updateActivity(id, body);
  }

  @Delete('activities/:id')
  @ApiOperation({ summary: 'Soft-delete a CPD activity' })
  @ApiResponse({ status: 200, description: 'CPD activity deleted successfully' })
  @ApiParam({ name: 'id', description: 'CPD activity UUID' })
  async deleteActivity(@Param('id', ParseUUIDPipe) id: string) {
    return this.cpdService.deleteActivity(id);
  }

  @Get('record/:practitionerId')
  @ApiOperation({ summary: 'Get full CPD record for a practitioner' })
  @ApiResponse({ status: 200, description: 'CPD record retrieved successfully' })
  @ApiParam({ name: 'practitionerId', description: 'Practitioner UUID' })
  async getRecord(@Param('practitionerId', ParseUUIDPipe) practitionerId: string) {
    return this.cpdService.getRecord(practitionerId);
  }

  @Get('quarterly-report/:practitionerId')
  @ApiOperation({ summary: 'Generate a quarterly CPD report for a practitioner' })
  @ApiResponse({ status: 200, description: 'Quarterly report generated successfully' })
  @ApiParam({ name: 'practitionerId', description: 'Practitioner UUID' })
  async generateQuarterlyReport(
    @Param('practitionerId', ParseUUIDPipe) practitionerId: string,
    @Query('quarter') quarter?: string,
    @Query('year') year?: string,
  ) {
    return this.cpdService.generateQuarterlyReport(
      practitionerId,
      quarter ? parseInt(quarter, 10) : undefined,
      year ? parseInt(year, 10) : undefined,
    );
  }
}
