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
import { RegistryService } from './registry.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Registry')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Post('entries')
  @ApiOperation({ summary: 'Create a new registry entry' })
  @ApiResponse({ status: 201, description: 'Registry entry created successfully' })
  async createEntry(@Body() body: any) {
    return this.registryService.createEntry(body);
  }

  @Get('entries')
  @ApiOperation({ summary: 'List registry entries with optional filtering' })
  @ApiResponse({ status: 200, description: 'Registry entries retrieved successfully' })
  @ApiQuery({ name: 'organisationId', required: false })
  @ApiQuery({ name: 'registryType', required: false })
  async getEntries(
    @Query('organisationId') organisationId?: string,
    @Query('registryType') registryType?: string,
  ) {
    return this.registryService.getEntries({ organisationId, registryType });
  }

  @Get('entries/:id')
  @ApiOperation({ summary: 'Retrieve a registry entry by ID' })
  @ApiResponse({ status: 200, description: 'Registry entry retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Registry entry not found' })
  @ApiParam({ name: 'id', description: 'Registry entry UUID' })
  async getEntryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.registryService.getEntryById(id);
  }

  @Patch('entries/:id')
  @ApiOperation({ summary: 'Update a registry entry' })
  @ApiResponse({ status: 200, description: 'Registry entry updated successfully' })
  @ApiParam({ name: 'id', description: 'Registry entry UUID' })
  async updateEntry(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.registryService.updateEntry(id, body);
  }

  @Get('benchmarks')
  @ApiOperation({ summary: 'Retrieve benchmarking data across participating centres' })
  @ApiResponse({ status: 200, description: 'Benchmarking data retrieved successfully' })
  @ApiQuery({ name: 'registryType', required: false })
  async getBenchmarks(@Query('registryType') registryType?: string) {
    return this.registryService.getBenchmarks(registryType);
  }
}
