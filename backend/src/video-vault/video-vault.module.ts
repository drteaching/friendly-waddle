import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoVaultController } from './video-vault.controller';
import { VideoVaultService } from './video-vault.service';
import { SurgicalVideo } from './entities/surgical-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurgicalVideo])],
  controllers: [VideoVaultController],
  providers: [VideoVaultService],
  exports: [VideoVaultService],
})
export class VideoVaultModule {}
