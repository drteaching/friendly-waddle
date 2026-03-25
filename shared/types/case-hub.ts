/**
 * Case Hub types for multidisciplinary team (MDT) discussions.
 * Supports case presentations, contributions from various disciplines,
 * video clip references, and CPD crediting for participants.
 *
 * MDT meetings are a cornerstone of quality endometriosis care,
 * bringing together surgical, pain management, fertility, and
 * allied health perspectives.
 */

/** Status of a case discussion within the MDT workflow. */
export type CaseDiscussionStatus = 'open' | 'scheduled' | 'discussed' | 'closed';

/**
 * A case presented for multidisciplinary discussion.
 * Tracks attendees, contributions, decisions, and CPD crediting.
 */
export interface CaseDiscussion {
  id: string;
  /** Reference to the surgical case being discussed. */
  caseRef: string;
  /** Reference to the clinician presenting the case. */
  presentedBy: string;
  /** Reference to the network in which the MDT meeting takes place. */
  networkRef: string;
  /** Current status of the discussion. */
  status: CaseDiscussionStatus;
  /** Contributions from MDT members. */
  contributions: CaseContribution[];
  /** References to imaging studies relevant to the case. */
  imagingStudies: string[];
  /** Surgical video clips referenced during the discussion. */
  videoClips: VideoClipReference[];
  /** The consensus decision reached by the MDT, if any. */
  mdtDecision?: string;
  /** References to practitioners who attended the MDT meeting. */
  mdtAttendees: string[];
  /** Date of the MDT meeting. */
  mdtDate?: Date;
  /** Whether CPD credit has been awarded for attendance. */
  cpdCredited: boolean;
  /** Number of CPD hours awarded. */
  cpdHours?: number;
}

/**
 * A contribution from an MDT member to a case discussion.
 * May include written input and attached documents.
 */
export interface CaseContribution {
  id: string;
  /** Reference to the contributing practitioner. */
  authorRef: string;
  /** The contributor's clinical role (e.g., 'pain_specialist', 'physiotherapist'). */
  authorRole: string;
  /** The content of the contribution. */
  content: string;
  /** References to any attached documents. */
  attachments: string[];
  createdAt: Date;
}

/** A reference to a segment of a surgical video used in MDT discussion. */
export interface VideoClipReference {
  /** Reference to the surgical video in the Video Vault. */
  videoId: string;
  /** Start time of the clip in seconds. */
  startTime: number;
  /** End time of the clip in seconds. */
  endTime: number;
  /** Descriptive title for the clip. */
  title: string;
}
