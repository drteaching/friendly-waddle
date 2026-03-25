import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';
import { RegistryEntry } from './entities/registry-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistryEntry])],
  controllers: [RegistryController],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
