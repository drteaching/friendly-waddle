// Registry types for EPHECT SSF/EPQ and COMET outcome submissions
// Supports de-identification methods and national/international registry submissions

import { EnzianScore } from './surgical-case';

export interface RegistryEntry {
  id: string;
  ephectSsf: {
    surgicalDate: Date;
    indication: string[];
    priorSurgeries: number;
    asrmStage: string;
    enzianScore: EnzianScore;
    lesionLocations: LesionLocation[];
    proceduresPerformed: string[];
    complications: string[];
    histopathology: string[];
  };
  ephectEpq: {
    demographics: Record<string, unknown>;
    painScores: Record<string, unknown>;
    fertilityHistory: Record<string, unknown>;
    qualityOfLife: Record<string, unknown>;
    treatmentHistory: Record<string, unknown>;
  };
  cometOutcomes: {
    overallPain: number;
    mostTroublesomeSymptom: string;
    symptomImprovement: number;
    qualityOfLife: number;
    adverseEvents: string[];
    patientSatisfaction: number;
  };
  deIdentified: boolean;
  deIdentificationMethod: 'k_anonymity' | 'differential_privacy' | 'safe_harbour';
  submittedToNational: boolean;
  submittedToEphect: boolean;
  submittedAt?: Date;
}

export interface LesionLocation {
  site: string;
  laterality?: 'left' | 'right' | 'bilateral' | 'midline';
  size?: number;
  depth?: 'superficial' | 'deep';
}
