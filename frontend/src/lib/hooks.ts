'use client';

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_PREFIX = '/api/v1';

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('aspire_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${API_PREFIX}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

/** Login and store the token. */
export async function login(email: string, password: string) {
  const data = await apiFetch<{ accessToken: string; refreshToken: string }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) },
  );
  localStorage.setItem('aspire_token', data.accessToken);
  localStorage.setItem('aspire_refresh_token', data.refreshToken);
  return data;
}

export function logout() {
  localStorage.removeItem('aspire_token');
  localStorage.removeItem('aspire_refresh_token');
}

export function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('aspire_token') : null;
}

// ── Generic hook ─────────────────────────────────────────────

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(endpoint: string | null): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<T>(endpoint);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Typed API functions ──────────────────────────────────────

export interface SurgicalCase {
  id: string;
  organisationId: string;
  surgeonId: string;
  patientId?: string;
  procedureType: string;
  procedureDescription?: string;
  procedureDate: string;
  endometriosisStage?: string;
  enzianScore?: Record<string, number>;
  diseaseLocations?: string[];
  operativeTimeMinutes?: number;
  estimatedBloodLossMl?: number;
  conversionToOpen: boolean;
  complications: string[];
  complicationGrade: string;
  operativeNotes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseDiscussion {
  id: string;
  title: string;
  patientReference?: string;
  status: string;
  mdtScheduledDate?: string;
  mdtOutcome?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CpdActivity {
  id: string;
  practitionerId: string;
  organisationId: string;
  title: string;
  description?: string;
  activityType: string;
  category: string;
  cpdHours: number;
  hours: number;
  activityDate: string;
  ranzcogCategory?: string;
  evidenceUrl?: string;
  status: string;
  createdAt: string;
}

export interface AccreditationApplication {
  id: string;
  organisationId: string;
  targetTier: string;
  status: string;
  featureAssessments?: Record<string, unknown>;
  overallScore?: number;
  submittedAt?: string;
  createdAt: string;
}

export interface Organisation {
  id: string;
  name: string;
  type: string;
  address: Record<string, string>;
  contactEmail: string;
  contactPhone: string;
  active: boolean;
}

export interface Practitioner {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  role: string;
  specialty?: string;
  registrationNumber?: string;
  active: boolean;
}

export interface Patient {
  id: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  diagnosisDate?: string;
  journeyTimeline?: JourneyEvent[];
  currentProviders?: string[];
  createdAt: string;
}

export interface JourneyEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  description?: string;
  provider?: string;
  createdAt: string;
}

export interface PatientConsent {
  id: string;
  patientId: string;
  consentType: string;
  granted: boolean;
  grantedAt?: string;
  revokedAt?: string;
}

// ── Typed hooks ──────────────────────────────────────────────

export function useSurgicalCases() {
  return useApi<SurgicalCase[]>('/surgical-cases');
}

export function useSurgicalCase(id: string) {
  return useApi<SurgicalCase>(`/surgical-cases/${id}`);
}

export function useCaseDiscussions() {
  return useApi<CaseDiscussion[]>('/case-hub/discussions');
}

export function useCpdActivities() {
  return useApi<CpdActivity[]>('/cpd/activities');
}

export function useAccreditationApplications() {
  return useApi<AccreditationApplication[]>('/accreditation/applications');
}

export function useOrganisations() {
  return useApi<Organisation[]>('/providers/organisations');
}

export function usePractitioners() {
  return useApi<Practitioner[]>('/providers/practitioners');
}

// ── Mutation functions ───────────────────────────────────────

export async function createSurgicalCase(data: Record<string, unknown>) {
  return apiFetch<SurgicalCase>('/surgical-cases', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSurgicalCase(id: string, data: Record<string, unknown>) {
  return apiFetch<SurgicalCase>(`/surgical-cases/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function createCaseDiscussion(data: Record<string, unknown>) {
  return apiFetch<CaseDiscussion>('/case-hub/discussions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createCpdActivity(data: Record<string, unknown>) {
  return apiFetch<CpdActivity>('/cpd/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createAccreditationApplication(data: Record<string, unknown>) {
  return apiFetch<AccreditationApplication>('/accreditation/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createPatient(data: Record<string, unknown>) {
  return apiFetch<Patient>('/patient-passport/patients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
