import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseDiscussion } from './entities/case-discussion.entity';
import { CaseContribution } from './entities/case-contribution.entity';

@Injectable()
export class CaseHubService {
  constructor(
    @InjectRepository(CaseDiscussion)
    private readonly discussionRepo: Repository<CaseDiscussion>,
    @InjectRepository(CaseContribution)
    private readonly contributionRepo: Repository<CaseContribution>,
  ) {}

  /** Create a new case discussion thread. */
  async createDiscussion(data: Partial<CaseDiscussion>): Promise<CaseDiscussion> {
    const discussion = this.discussionRepo.create(data);
    return this.discussionRepo.save(discussion);
  }

  /** List case discussions with optional filtering. */
  async getDiscussions(filters: {
    organisationId?: string;
    status?: string;
  }): Promise<CaseDiscussion[]> {
    const where: any = {};
    if (filters.organisationId) where.organisationId = filters.organisationId;
    if (filters.status) where.status = filters.status;
    return this.discussionRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  /** Retrieve a case discussion by ID. */
  async getDiscussionById(id: string): Promise<CaseDiscussion> {
    const discussion = await this.discussionRepo.findOne({ where: { id } });
    if (!discussion) {
      throw new NotFoundException(`Case discussion ${id} not found`);
    }
    return discussion;
  }

  /** Add a contribution to a case discussion. */
  async addContribution(
    discussionId: string,
    data: Partial<CaseContribution>,
  ): Promise<CaseContribution> {
    await this.getDiscussionById(discussionId);
    const contribution = this.contributionRepo.create({
      ...data,
      discussionId,
    });
    return this.contributionRepo.save(contribution);
  }

  /** Retrieve all contributions for a discussion, ordered chronologically. */
  async getContributions(discussionId: string): Promise<CaseContribution[]> {
    return this.contributionRepo.find({
      where: { discussionId },
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * Schedule an MDT meeting for a case discussion.
   * Updates the discussion metadata with the scheduled time and agenda.
   */
  async scheduleMdtMeeting(
    discussionId: string,
    meetingDetails: {
      scheduledAt: string;
      location?: string;
      agenda?: string;
    },
  ): Promise<CaseDiscussion> {
    const discussion = await this.getDiscussionById(discussionId);
    discussion.status = 'in_progress';
    discussion.mdtScheduledAt = new Date(meetingDetails.scheduledAt);
    discussion.mdtLocation = meetingDetails.location || null;
    discussion.mdtAgenda = meetingDetails.agenda || null;
    return this.discussionRepo.save(discussion);
  }

  /**
   * Close an MDT meeting, recording the outcomes and attendees.
   * This marks the discussion as resolved and stores the meeting summary.
   */
  async closeMdtMeeting(
    discussionId: string,
    data: {
      outcomes: string;
      attendeeIds: string[];
    },
  ): Promise<CaseDiscussion> {
    const discussion = await this.getDiscussionById(discussionId);
    discussion.status = 'resolved';
    discussion.resolvedAt = new Date();
    discussion.mdtOutcomes = data.outcomes;
    discussion.mdtAttendeeIds = data.attendeeIds;
    return this.discussionRepo.save(discussion);
  }
}
