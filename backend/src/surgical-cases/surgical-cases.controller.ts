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
import { SurgicalCasesService } from './surgical-cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { EnzianScoreDto } from './dto/enzian-score.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Surgical Cases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('surgical-cases')
export class SurgicalCasesController {
  constructor(private readonly surgicalCasesService: SurgicalCasesService) {}

  @Post()
  @ApiOperation({ summary: 'Record a new surgical case' })
  @ApiResponse({ status: 201, description: 'Surgical case created successfully' })
  async createCase(@Body() dto: CreateCaseDto) {
    return this.surgicalCasesService.createCase(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List surgical cases with optional filtering' })
  @ApiResponse({ status: 200, description: 'Surgical cases retrieved successfully' })
  @ApiQuery({ name: 'organisationId', required: false })
  @ApiQuery({ name: 'surgeonId', required: false })
  async getCases(
    @Query('organisationId') organisationId?: string,
    @Query('surgeonId') surgeonId?: string,
  ) {
    return this.surgicalCasesService.getCases({ organisationId, surgeonId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a surgical case by ID' })
  @ApiResponse({ status: 200, description: 'Surgical case retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Surgical case not found' })
  @ApiParam({ name: 'id', description: 'Surgical case UUID' })
  async getCaseById(@Param('id', ParseUUIDPipe) id: string) {
    return this.surgicalCasesService.getCaseById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update surgical case details' })
  @ApiResponse({ status: 200, description: 'Surgical case updated successfully' })
  @ApiParam({ name: 'id', description: 'Surgical case UUID' })
  async updateCase(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.surgicalCasesService.updateCase(id, body);
  }

  // ---- PROMS endpoints ----

  @Post(':id/proms/schedule')
  @ApiOperation({ summary: 'Schedule PROMS collection for a surgical case' })
  @ApiResponse({ status: 201, description: 'PROMS collection scheduled successfully' })
  @ApiParam({ name: 'id', description: 'Surgical case UUID' })
  async scheduleProms(
    @Param('id', ParseUUIDPipe) caseId: string,
    @Body() body: { patientId: string; procedureDate: string; questionnaireType?: string },
  ) {
    return this.surgicalCasesService.scheduleProms(caseId, body);
  }

  @Post(':id/proms/:responseId')
  @ApiOperation({ summary: 'Record a PROMS response for a surgical case' })
  @ApiResponse({ status: 200, description: 'PROMS response recorded successfully' })
  @ApiParam({ name: 'id', description: 'Surgical case UUID' })
  @ApiParam({ name: 'responseId', description: 'PROMS response UUID' })
  async recordPromsResponse(
    @Param('id', ParseUUIDPipe) _caseId: string,
    @Param('responseId', ParseUUIDPipe) responseId: string,
    @Body() body: { responses: Record<string, any>; totalScore?: number },
  ) {
    return this.surgicalCasesService.recordPromsResponse(responseId, body);
  }

  @Get(':id/proms')
  @ApiOperation({ summary: 'Retrieve PROMS responses for a surgical case' })
  @ApiResponse({ status: 200, description: 'PROMS responses retrieved successfully' })
  @ApiParam({ name: 'id', description: 'Surgical case UUID' })
  async getPromsResponses(@Param('id', ParseUUIDPipe) caseId: string) {
    return this.surgicalCasesService.getPromsResponses(caseId);
  }

  @Get('dashboard/outcomes')
  @ApiOperation({ summary: 'Retrieve aggregated outcome dashboard data' })
  @ApiResponse({ status: 200, description: 'Outcome dashboard data retrieved' })
  @ApiQuery({ name: 'organisationId', required: false })
  async getOutcomeDashboard(@Query('organisationId') organisationId?: string) {
    return this.surgicalCasesService.getOutcomeDashboard(organisationId);
  }

  @Patch(':id/enzian-score')
  @ApiOperation({ summary: 'Record or update the ENZIAN classification score for a case' })
  @ApiResponse({ status: 200, description: 'ENZIAN score updated successfully' })
  @ApiParam({ name: 'id', description: 'Surgical case UUID' })
  async updateEnzianScore(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: EnzianScoreDto,
  ) {
    return this.surgicalCasesService.updateCase(id, { enzianScore: dto });
  }
}
