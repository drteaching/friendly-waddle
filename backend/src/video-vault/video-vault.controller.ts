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
import { VideoVaultService } from './video-vault.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Video Vault')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('video-vault')
export class VideoVaultController {
  constructor(private readonly videoVaultService: VideoVaultService) {}

  @Post('videos')
  @ApiOperation({ summary: 'Register a new surgical video upload' })
  @ApiResponse({ status: 201, description: 'Video registered successfully' })
  async createVideo(@Body() body: any) {
    return this.videoVaultService.createVideo(body);
  }

  @Get('videos')
  @ApiOperation({ summary: 'List surgical videos with optional filtering' })
  @ApiResponse({ status: 200, description: 'Videos retrieved successfully' })
  @ApiQuery({ name: 'organisationId', required: false })
  @ApiQuery({ name: 'surgeonId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async getVideos(
    @Query('organisationId') organisationId?: string,
    @Query('surgeonId') surgeonId?: string,
    @Query('status') status?: string,
  ) {
    return this.videoVaultService.getVideos({ organisationId, surgeonId, status });
  }

  @Get('videos/:id')
  @ApiOperation({ summary: 'Retrieve video metadata by ID' })
  @ApiResponse({ status: 200, description: 'Video metadata retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({ name: 'id', description: 'Video UUID' })
  async getVideoById(@Param('id', ParseUUIDPipe) id: string) {
    return this.videoVaultService.getVideoById(id);
  }

  @Patch('videos/:id')
  @ApiOperation({ summary: 'Update video metadata or status' })
  @ApiResponse({ status: 200, description: 'Video updated successfully' })
  @ApiParam({ name: 'id', description: 'Video UUID' })
  async updateVideo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.videoVaultService.updateVideo(id, body);
  }

  @Delete('videos/:id')
  @ApiOperation({ summary: 'Soft-delete a surgical video' })
  @ApiResponse({ status: 200, description: 'Video deleted successfully' })
  @ApiParam({ name: 'id', description: 'Video UUID' })
  async deleteVideo(@Param('id', ParseUUIDPipe) id: string) {
    return this.videoVaultService.deleteVideo(id);
  }

  @Post('videos/:id/generate-sas')
  @ApiOperation({ summary: 'Generate a time-limited SAS URL for secure video streaming' })
  @ApiResponse({ status: 200, description: 'SAS URL generated successfully' })
  @ApiParam({ name: 'id', description: 'Video UUID' })
  async generateStreamingUrl(@Param('id', ParseUUIDPipe) id: string) {
    return this.videoVaultService.generateStreamingUrl(id);
  }
}
