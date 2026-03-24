import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurgicalVideo } from './entities/surgical-video.entity';

@Injectable()
export class VideoVaultService {
  constructor(
    @InjectRepository(SurgicalVideo)
    private readonly videoRepo: Repository<SurgicalVideo>,
  ) {}

  /** Register a new surgical video upload. */
  async createVideo(data: Partial<SurgicalVideo>): Promise<SurgicalVideo> {
    const video = this.videoRepo.create(data);
    return this.videoRepo.save(video);
  }

  /** List surgical videos with optional filtering. */
  async getVideos(filters: {
    organisationId?: string;
    surgeonId?: string;
    status?: string;
  }): Promise<SurgicalVideo[]> {
    const where: any = {};
    if (filters.organisationId) where.organisationId = filters.organisationId;
    if (filters.surgeonId) where.surgeonId = filters.surgeonId;
    if (filters.status) where.status = filters.status;
    return this.videoRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  /** Retrieve a video by ID. */
  async getVideoById(id: string): Promise<SurgicalVideo> {
    const video = await this.videoRepo.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Surgical video ${id} not found`);
    }
    return video;
  }

  /** Update video metadata or status. */
  async updateVideo(id: string, data: Partial<SurgicalVideo>): Promise<SurgicalVideo> {
    const video = await this.getVideoById(id);
    Object.assign(video, data);
    return this.videoRepo.save(video);
  }

  /** Soft-delete a surgical video. */
  async deleteVideo(id: string): Promise<void> {
    const video = await this.getVideoById(id);
    await this.videoRepo.softRemove(video);
  }

  /**
   * Generate a time-limited SAS URL for secure video streaming.
   * In production, this would use Azure Blob Storage to create
   * a shared access signature with a limited validity window.
   */
  async generateStreamingUrl(id: string): Promise<{
    videoId: string;
    streamingUrl: string;
    expiresAt: string;
  }> {
    const video = await this.getVideoById(id);

    // TODO: Implement Azure Blob Storage SAS token generation
    // using @azure/storage-blob BlobSASPermissions
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 4);

    return {
      videoId: video.id,
      streamingUrl: `${video.storageUrl}?sv=placeholder-sas-token`,
      expiresAt: expiresAt.toISOString(),
    };
  }
}
