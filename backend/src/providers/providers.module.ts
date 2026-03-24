import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { Organisation } from './entities/organisation.entity';
import { Practitioner } from './entities/practitioner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organisation, Practitioner])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
