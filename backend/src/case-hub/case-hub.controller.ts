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
import { CaseHubService } from './case-hub.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Case Hub')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('case-hub')
export class CaseHubController {
  constructor(private readonly caseHubService: CaseHubService) {}

  @Post('discussions')
  @ApiOperation({ summary: 'Create a new case discussion thread' })
  @ApiResponse({ status: 201, description: 'Discussion created successfully' })
  async createDiscussion(@Body() body: any) {
    return this.caseHubService.createDiscussion(body);
  }

  @Get('discussions')
  @ApiOperation({ summary: 'List case discussions with optional filtering' })
  @ApiResponse({ status: 200, description: 'Discussions retrieved successfully' })
  @ApiQuery({ name: 'organisationId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async getDiscussions(
    @Query('organisationId') organisationId?: string,
    @Query('status') status?: string,
  ) {
    return this.caseHubService.getDiscussions({ organisationId, status });
  }

  @Get('discussions/:id')
  @ApiOperation({ summary: 'Retrieve a case discussion with its contributions' })
  @ApiResponse({ status: 200, description: 'Discussion retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Discussion not found' })
  @ApiParam({ name: 'id', description: 'Discussion UUID' })
  async getDiscussionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.caseHubService.getDiscussionById(id);
  }

  @Post('discussions/:id/contributions')
  @ApiOperation({ summary: 'Add a contribution to a case discussion' })
  @ApiResponse({ status: 201, description: 'Contribution added successfully' })
  @ApiParam({ name: 'id', description: 'Discussion UUID' })
  async addContribution(
    @Param('id', ParseUUIDPipe) discussionId: string,
    @Body() body: any,
  ) {
    return this.caseHubService.addContribution(discussionId, body);
  }

  @Get('discussions/:id/contributions')
  @ApiOperation({ summary: 'List contributions for a case discussion' })
  @ApiResponse({ status: 200, description: 'Contributions retrieved successfully' })
  @ApiParam({ name: 'id', description: 'Discussion UUID' })
  async getContributions(@Param('id', ParseUUIDPipe) discussionId: string) {
    return this.caseHubService.getContributions(discussionId);
  }

  @Post('discussions/:id/schedule-mdt')
  @ApiOperation({ summary: 'Schedule an MDT meeting for this case discussion' })
  @ApiResponse({ status: 200, description: 'MDT meeting scheduled successfully' })
  @ApiParam({ name: 'id', description: 'Discussion UUID' })
  async scheduleMdtMeeting(
    @Param('id', ParseUUIDPipe) discussionId: string,
    @Body() body: { scheduledAt: string; location?: string; agenda?: string },
  ) {
    return this.caseHubService.scheduleMdtMeeting(discussionId, body);
  }

  @Post('discussions/:id/close-mdt')
  @ApiOperation({ summary: 'Close an MDT meeting and record outcomes' })
  @ApiResponse({ status: 200, description: 'MDT meeting closed successfully' })
  @ApiParam({ name: 'id', description: 'Discussion UUID' })
  async closeMdtMeeting(
    @Param('id', ParseUUIDPipe) discussionId: string,
    @Body() body: { outcomes: string; attendeeIds: string[] },
  ) {
    return this.caseHubService.closeMdtMeeting(discussionId, body);
  }
}
