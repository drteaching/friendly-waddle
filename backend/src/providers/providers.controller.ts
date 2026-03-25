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
} from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Providers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  // ---- Organisation endpoints ----

  @Post('organisations')
  @Roles('admin')
  @ApiOperation({ summary: 'Register a new healthcare organisation' })
  @ApiResponse({ status: 201, description: 'Organisation registered successfully' })
  async createOrganisation(@Body() body: any) {
    return this.providersService.createOrganisation(body);
  }

  @Get('organisations')
  @ApiOperation({ summary: 'List all organisations' })
  @ApiResponse({ status: 200, description: 'Organisations retrieved successfully' })
  async getOrganisations(@Query('search') search?: string) {
    return this.providersService.getOrganisations(search);
  }

  @Get('organisations/:id')
  @ApiOperation({ summary: 'Retrieve an organisation by ID' })
  @ApiResponse({ status: 200, description: 'Organisation retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Organisation not found' })
  async getOrganisationById(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.getOrganisationById(id);
  }

  @Patch('organisations/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update organisation details' })
  @ApiResponse({ status: 200, description: 'Organisation updated successfully' })
  async updateOrganisation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.providersService.updateOrganisation(id, body);
  }

  @Delete('organisations/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Soft-delete an organisation' })
  @ApiResponse({ status: 200, description: 'Organisation deleted successfully' })
  async deleteOrganisation(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.deleteOrganisation(id);
  }

  // ---- Practitioner endpoints ----

  @Post('practitioners')
  @Roles('admin')
  @ApiOperation({ summary: 'Register a new practitioner' })
  @ApiResponse({ status: 201, description: 'Practitioner registered successfully' })
  async createPractitioner(@Body() body: any) {
    return this.providersService.createPractitioner(body);
  }

  @Get('practitioners')
  @ApiOperation({ summary: 'List practitioners, optionally filtered by organisation' })
  @ApiResponse({ status: 200, description: 'Practitioners retrieved successfully' })
  async getPractitioners(@Query('organisationId') organisationId?: string) {
    return this.providersService.getPractitioners(organisationId);
  }

  @Get('practitioners/:id')
  @ApiOperation({ summary: 'Retrieve a practitioner by ID' })
  @ApiResponse({ status: 200, description: 'Practitioner retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Practitioner not found' })
  async getPractitionerById(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.getPractitionerById(id);
  }

  @Patch('practitioners/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update practitioner details' })
  @ApiResponse({ status: 200, description: 'Practitioner updated successfully' })
  async updatePractitioner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ) {
    return this.providersService.updatePractitioner(id, body);
  }

  @Delete('practitioners/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Soft-delete a practitioner' })
  @ApiResponse({ status: 200, description: 'Practitioner deleted successfully' })
  async deletePractitioner(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.deletePractitioner(id);
  }
}
