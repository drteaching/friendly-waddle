/**
 * Provider and organisation types for the ASPIRE EndoExpertise Platform.
 * Modelled on FHIR Organization and PractitionerRole resources, adapted
 * for the endometriosis centre accreditation context.
 */

import { AccreditationTier } from './accreditation';
import { Role } from './auth';

/**
 * Represents an organisation (hospital, clinic, or network) participating
 * in the ASPIRE accreditation programme. Organisations may hold a current
 * accreditation tier and belong to a broader network of centres.
 */
export interface EndoOrganization {
  /** Unique identifier for the organisation. */
  id: string;
  /** Human-readable name of the organisation. */
  name: string;
  /** The accreditation tier currently held, if any. */
  currentTier?: AccreditationTier;
  /** Identifier of the parent network organisation, if this centre is part of one. */
  networkId?: string;
  /** Physical address of the organisation. */
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  /** Primary contact email for accreditation correspondence. */
  contactEmail: string;
  /** Primary contact phone number. */
  contactPhone: string;
  /** Whether the organisation is currently active in the programme. */
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a practitioner's role within a specific organisation.
 * A single practitioner may hold multiple roles across different organisations
 * (e.g., a surgeon operating at two network centres).
 */
export interface EndoPractitionerRole {
  /** Unique identifier for this practitioner-role assignment. */
  id: string;
  /** Reference to the practitioner's user account. */
  practitionerId: string;
  /** Reference to the organisation in which this role is held. */
  organisationId: string;
  /** The role held by the practitioner within the organisation. */
  role: Role;
  /** Medical specialty or subspecialty (e.g., 'advanced laparoscopic surgery'). */
  specialty?: string;
  /** Professional registration number (e.g., AHPRA registration in Australia). */
  registrationNumber?: string;
  /** Whether this practitioner-role assignment is currently active. */
  active: boolean;
  /** Date the practitioner commenced this role. */
  startDate: Date;
  /** Date the practitioner ceased this role, if applicable. */
  endDate?: Date;
}
