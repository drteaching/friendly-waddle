// Video Vault types for secure surgical video storage and teaching clip management
// Supports retention policies, de-identification, and teaching approval workflows

import { VideoAnnotation } from './ai-orchestration';

export interface SurgicalVideo {
  id: string;
  caseRef: string;
  surgeonRef: string;
  rawVideoUrl: string;
  duration: number;
  resolution: string;
  fileSize: number;
  annotations: VideoAnnotation[];
  teachingClips: TeachingClip[];
  patientConsentRef: string;
  surgeonConsentRef: string;
  teamConsentRef?: string;
  retentionPolicy: 'standard_24h_audio' | 'extended_teaching' | 'research_archive';
  scheduledDeletionDate?: Date;
}

export interface TeachingClip {
  id: string;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  deIdentified: boolean;
  approvedForTeaching: boolean;
  approvedBy: string;
  tags: string[];
}

// Re-export VideoAnnotation from ai-orchestration
export type { VideoAnnotation } from './ai-orchestration';
