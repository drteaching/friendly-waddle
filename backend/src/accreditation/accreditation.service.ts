import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AccreditationApplication,
  FeatureAssessment,
  GentleNudge,
} from './entities/accreditation-application.entity';
import { EvidenceUpload } from './entities/evidence-upload.entity';

/**
 * ASPIRE feature definitions per accreditation tier.
 * These represent the key quality features that endometriosis centres
 * must demonstrate to achieve each tier of accreditation.
 */
const ASPIRE_FEATURES: Record<string, { tier: string; name: string; description: string }> = {
  'GOV-01': { tier: 'bronze', name: 'Clinical Governance Structure', description: 'Established governance framework with named clinical lead for endometriosis services' },
  'GOV-02': { tier: 'bronze', name: 'MDT Arrangements', description: 'Regular multidisciplinary team meetings with documented attendance and outcomes' },
  'GOV-03': { tier: 'bronze', name: 'Clinical Protocols', description: 'Written clinical protocols for diagnosis, management, and referral pathways' },
  'GOV-04': { tier: 'silver', name: 'Audit Programme', description: 'Systematic clinical audit programme with evidence of completed audit cycles' },
  'GOV-05': { tier: 'gold', name: 'Research Participation', description: 'Active participation in endometriosis research programmes or clinical trials' },
  'SURG-01': { tier: 'bronze', name: 'Surgical Expertise', description: 'Named surgeons with documented advanced laparoscopic skills for endometriosis excision' },
  'SURG-02': { tier: 'silver', name: 'Surgical Volume', description: 'Minimum annual surgical case volume for complex endometriosis procedures' },
  'SURG-03': { tier: 'silver', name: 'Surgical Outcomes Tracking', description: 'Systematic recording and review of surgical outcomes including complications' },
  'SURG-04': { tier: 'gold', name: 'Video Review Programme', description: 'Regular video review of surgical cases for quality improvement and training' },
  'PATH-01': { tier: 'bronze', name: 'Patient Pathway', description: 'Defined patient pathway from referral to treatment and follow-up' },
  'PATH-02': { tier: 'silver', name: 'PROMS Collection', description: 'Systematic collection of patient-reported outcome measures pre- and post-operatively' },
  'PATH-03': { tier: 'gold', name: 'Patient Experience Programme', description: 'Formal patient experience feedback programme with evidence of service improvement' },
  'NURSE-01': { tier: 'bronze', name: 'Specialist Nursing', description: 'Named endometriosis specialist nurse with dedicated clinic time' },
  'NURSE-02': { tier: 'silver', name: 'Nurse-Led Services', description: 'Nurse-led pre-assessment and follow-up clinics for endometriosis patients' },
  'EDU-01': { tier: 'bronze', name: 'Staff Training', description: 'Documented training programme for all staff involved in endometriosis care' },
  'EDU-02': { tier: 'silver', name: 'CPD Programme', description: 'Structured continuing professional development programme for the endometriosis team' },
  'EDU-03': { tier: 'gold', name: 'Teaching Centre', description: 'Active teaching and mentorship programme for external practitioners' },
};

/** Features required per tier (cumulative: gold includes silver and bronze). */
const TIER_FEATURES: Record<string, string[]> = {
  bronze: Object.entries(ASPIRE_FEATURES).filter(([, v]) => v.tier === 'bronze').map(([k]) => k),
  silver: Object.entries(ASPIRE_FEATURES).filter(([, v]) => ['bronze', 'silver'].includes(v.tier)).map(([k]) => k),
  gold: Object.keys(ASPIRE_FEATURES),
};

@Injectable()
export class AccreditationService {
  constructor(
    @InjectRepository(AccreditationApplication)
    private readonly applicationRepo: Repository<AccreditationApplication>,
    @InjectRepository(EvidenceUpload)
    private readonly evidenceRepo: Repository<EvidenceUpload>,
  ) {}

  /** Create a new accreditation application for an organisation. */
  async createApplication(
    organisationId: string,
    targetTier: 'bronze' | 'silver' | 'gold',
    leadApplicantId: string,
  ): Promise<AccreditationApplication> {
    const application = this.applicationRepo.create({
      organisationId,
      targetTier,
      leadApplicantId,
      status: 'draft',
      featureAssessments: {},
      gentleNudges: [],
    });
    return this.applicationRepo.save(application);
  }

  /** Retrieve applications with optional filtering by organisation or status. */
  async getApplications(filters: {
    organisationId?: string;
    status?: string;
  }): Promise<AccreditationApplication[]> {
    const query = this.applicationRepo.createQueryBuilder('app');

    if (filters.organisationId) {
      query.andWhere('app.organisationId = :organisationId', {
        organisationId: filters.organisationId,
      });
    }
    if (filters.status) {
      query.andWhere('app.status = :status', { status: filters.status });
    }

    return query.orderBy('app.createdAt', 'DESC').getMany();
  }

  /** Retrieve a single application by its UUID. */
  async getApplicationById(id: string): Promise<AccreditationApplication> {
    const application = await this.applicationRepo.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException(`Accreditation application ${id} not found`);
    }
    return application;
  }

  /** Submit or update a feature self-assessment within an application. */
  async submitFeatureAssessment(
    applicationId: string,
    assessment: {
      featureCode: string;
      featureName: string;
      selfScore: 'not_met' | 'partially_met' | 'fully_met' | 'not_applicable';
      selfNarrative: string;
      evidenceIds?: string[];
    },
  ): Promise<AccreditationApplication> {
    const application = await this.getApplicationById(applicationId);

    if (!['draft', 'self_assessment', 'revision_requested'].includes(application.status)) {
      throw new BadRequestException(
        'Feature assessments can only be modified whilst the application is in draft, self-assessment, or revision-requested status',
      );
    }

    const featureAssessments = { ...application.featureAssessments };
    featureAssessments[assessment.featureCode] = {
      featureCode: assessment.featureCode,
      featureName: assessment.featureName,
      selfScore: assessment.selfScore,
      selfNarrative: assessment.selfNarrative,
      evidenceIds: assessment.evidenceIds || [],
    };

    application.featureAssessments = featureAssessments;
    application.status = 'self_assessment';

    return this.applicationRepo.save(application);
  }

  /** Upload evidence to support a feature assessment. */
  async uploadEvidence(
    applicationId: string,
    evidenceData: {
      featureCode: string;
      fileName: string;
      mimeType: string;
      fileSizeBytes: number;
      storageUrl: string;
      evidenceType: string;
      description?: string;
      uploadedBy: string;
    },
  ): Promise<EvidenceUpload> {
    // Verify the application exists
    await this.getApplicationById(applicationId);

    const evidence = this.evidenceRepo.create({
      applicationId,
      ...evidenceData,
    });
    return this.evidenceRepo.save(evidence);
  }

  /** Submit the application for formal review by ASPIRE assessors. */
  async submitApplication(id: string): Promise<AccreditationApplication> {
    const application = await this.getApplicationById(id);

    if (!['self_assessment', 'evidence_upload', 'revision_requested'].includes(application.status)) {
      throw new BadRequestException(
        'Application can only be submitted from self-assessment, evidence-upload, or revision-requested status',
      );
    }

    // Validate that all required features for the target tier have been assessed
    const requiredFeatures = TIER_FEATURES[application.targetTier] || [];
    const assessedFeatures = Object.keys(application.featureAssessments);
    const missingFeatures = requiredFeatures.filter(
      (f) => !assessedFeatures.includes(f),
    );

    if (missingFeatures.length > 0) {
      throw new BadRequestException(
        `The following features must be assessed before submission: ${missingFeatures.join(', ')}`,
      );
    }

    application.status = 'submitted';
    application.submittedAt = new Date();

    // Calculate compliance score upon submission
    const scoreResult = this.calculateComplianceScoreInternal(application);
    application.complianceScore = scoreResult.overallScore;

    return this.applicationRepo.save(application);
  }

  /** Assign reviewers to an application. */
  async assignReviewers(
    applicationId: string,
    reviewerId: string,
  ): Promise<AccreditationApplication> {
    const application = await this.getApplicationById(applicationId);
    application.assignedReviewerId = reviewerId;
    application.status = 'under_review';
    return this.applicationRepo.save(application);
  }

  /** Submit a reviewer's assessment of the application. */
  async submitReview(
    applicationId: string,
    review: {
      reviewerId: string;
      featureReviews: Record<
        string,
        { reviewerScore: string; reviewerComment: string }
      >;
      overallNotes: string;
      decision: 'approved' | 'rejected' | 'revision_requested';
    },
  ): Promise<AccreditationApplication> {
    const application = await this.getApplicationById(applicationId);

    if (application.status !== 'under_review' && application.status !== 'submitted') {
      throw new BadRequestException(
        'Reviews can only be submitted for applications that are under review or submitted',
      );
    }

    // Apply reviewer scores to feature assessments
    const featureAssessments = { ...application.featureAssessments };
    for (const [featureCode, reviewData] of Object.entries(review.featureReviews)) {
      if (featureAssessments[featureCode]) {
        featureAssessments[featureCode] = {
          ...featureAssessments[featureCode],
          reviewerScore: reviewData.reviewerScore as FeatureAssessment['reviewerScore'],
          reviewerComment: reviewData.reviewerComment,
        };
      }
    }

    application.featureAssessments = featureAssessments;
    application.reviewerNotes = review.overallNotes;
    application.reviewedAt = new Date();
    application.assignedReviewerId = review.reviewerId;

    if (review.decision === 'approved') {
      application.status = 'approved';
      application.approvedAt = new Date();
      // Set expiry to 3 years from approval
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 3);
      application.expiryDate = expiry;
    } else {
      application.status = review.decision;
    }

    return this.applicationRepo.save(application);
  }

  /**
   * Calculate the compliance score for an application.
   * Scores are based on the proportion of applicable features
   * rated as 'fully_met' relative to the total required for the target tier.
   */
  async calculateComplianceScore(
    applicationId: string,
  ): Promise<{
    overallScore: number;
    featureBreakdown: Record<string, { score: string; weight: number }>;
    totalApplicable: number;
    totalFullyMet: number;
    totalPartiallyMet: number;
    totalNotMet: number;
  }> {
    const application = await this.getApplicationById(applicationId);
    return this.calculateComplianceScoreInternal(application);
  }

  /** Internal compliance score calculation logic. */
  private calculateComplianceScoreInternal(application: AccreditationApplication): {
    overallScore: number;
    featureBreakdown: Record<string, { score: string; weight: number }>;
    totalApplicable: number;
    totalFullyMet: number;
    totalPartiallyMet: number;
    totalNotMet: number;
  } {
    const requiredFeatures = TIER_FEATURES[application.targetTier] || [];
    const assessments = application.featureAssessments;

    let totalApplicable = 0;
    let totalFullyMet = 0;
    let totalPartiallyMet = 0;
    let totalNotMet = 0;
    const featureBreakdown: Record<string, { score: string; weight: number }> = {};

    for (const featureCode of requiredFeatures) {
      const assessment = assessments[featureCode];
      if (!assessment || assessment.selfScore === 'not_applicable') {
        continue;
      }

      totalApplicable++;
      let weight = 0;

      // Use the reviewer score if available, otherwise use the self-assessment score
      const effectiveScore = assessment.reviewerScore || assessment.selfScore;

      switch (effectiveScore) {
        case 'fully_met':
          totalFullyMet++;
          weight = 1.0;
          break;
        case 'partially_met':
          totalPartiallyMet++;
          weight = 0.5;
          break;
        case 'not_met':
          totalNotMet++;
          weight = 0;
          break;
        default:
          break;
      }

      featureBreakdown[featureCode] = { score: effectiveScore, weight };
    }

    const overallScore =
      totalApplicable > 0
        ? Math.round(
            ((totalFullyMet + totalPartiallyMet * 0.5) / totalApplicable) * 100 * 100,
          ) / 100
        : 0;

    return {
      overallScore,
      featureBreakdown,
      totalApplicable,
      totalFullyMet,
      totalPartiallyMet,
      totalNotMet,
    };
  }

  /**
   * Generate gentle nudges (contextual suggestions) for an application.
   * Analyses the current state of feature assessments and evidence to
   * provide helpful, non-judgemental guidance to applicants.
   */
  async generateGentleNudges(applicationId: string): Promise<GentleNudge[]> {
    const application = await this.getApplicationById(applicationId);
    const requiredFeatures = TIER_FEATURES[application.targetTier] || [];
    const assessments = application.featureAssessments;
    const nudges: GentleNudge[] = [];

    // Retrieve evidence uploads for this application
    const evidenceUploads = await this.evidenceRepo.find({
      where: { applicationId },
    });
    const evidenceByFeature = new Map<string, EvidenceUpload[]>();
    for (const ev of evidenceUploads) {
      const list = evidenceByFeature.get(ev.featureCode) || [];
      list.push(ev);
      evidenceByFeature.set(ev.featureCode, list);
    }

    for (const featureCode of requiredFeatures) {
      const featureDef = ASPIRE_FEATURES[featureCode];
      if (!featureDef) continue;

      const assessment = assessments[featureCode];

      // Nudge for features not yet assessed
      if (!assessment) {
        nudges.push({
          featureCode,
          message: `You haven't yet completed the self-assessment for "${featureDef.name}". This feature is required for ${application.targetTier} tier accreditation. Would you like to start?`,
          priority: 'high',
          category: 'incomplete_narrative',
        });
        continue;
      }

      // Nudge for missing evidence
      const featureEvidence = evidenceByFeature.get(featureCode) || [];
      if (
        assessment.selfScore !== 'not_applicable' &&
        featureEvidence.length === 0 &&
        assessment.evidenceIds.length === 0
      ) {
        nudges.push({
          featureCode,
          message: `No evidence has been uploaded for "${featureDef.name}". Reviewers will look for supporting documentation such as policies, audit reports, or training records. Consider uploading relevant artefacts.`,
          priority: 'high',
          category: 'missing_evidence',
        });
      }

      // Nudge for short narratives
      if (
        assessment.selfNarrative &&
        assessment.selfNarrative.length < 50 &&
        assessment.selfScore !== 'not_applicable'
      ) {
        nudges.push({
          featureCode,
          message: `Your narrative for "${featureDef.name}" is quite brief. A more detailed description of how your centre meets this feature will strengthen your application. Consider describing specific examples, processes, or outcomes.`,
          priority: 'medium',
          category: 'incomplete_narrative',
        });
      }

      // Nudge for score mismatches (self-assessed as fully met but reviewer scored lower)
      if (
        assessment.reviewerScore &&
        assessment.selfScore === 'fully_met' &&
        assessment.reviewerScore !== 'fully_met'
      ) {
        nudges.push({
          featureCode,
          message: `The reviewer has assessed "${featureDef.name}" differently from your self-assessment. Consider reviewing the feedback and providing additional evidence or clarification.`,
          priority: 'high',
          category: 'score_mismatch',
        });
      }

      // Nudge for growth opportunities (partially met features)
      if (assessment.selfScore === 'partially_met') {
        nudges.push({
          featureCode,
          message: `You've indicated "${featureDef.name}" is partially met. This is a great opportunity for growth. ${featureDef.description}. What steps could your centre take to fully meet this feature?`,
          priority: 'low',
          category: 'growth_opportunity',
        });
      }
    }

    // Persist the generated nudges
    application.gentleNudges = nudges;
    await this.applicationRepo.save(application);

    return nudges;
  }

  /** Approve an application (shorthand for review with approval decision). */
  async approveApplication(applicationId: string, reviewerId: string): Promise<AccreditationApplication> {
    const application = await this.getApplicationById(applicationId);
    application.status = 'approved';
    application.approvedAt = new Date();
    application.assignedReviewerId = reviewerId;
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 3);
    application.expiryDate = expiry;
    return this.applicationRepo.save(application);
  }
}
