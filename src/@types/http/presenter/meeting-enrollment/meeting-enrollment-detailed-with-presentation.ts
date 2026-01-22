import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import type { EducationLevelType, OccupationType, PresentationType } from '@prisma/client'

export interface MeetingEnrollmentDetailedWithPresentationPresenterInput extends MeetingEnrollmentWithDetails {}

export interface UserParticipantInfo {
  id: string
  fullName: string
  email: string
  institutionName?: string
  departmentName: string | null
  educationLevel: EducationLevelType
  occupation?: OccupationType | null
  wantsNewsletter: boolean
}

export interface GuestParticipantInfo {
  fullName: string
  email: string
  institutionName: string
  departmentName: string
  occupation: OccupationType
  educationLevel: EducationLevelType
  wantsNewsletter: boolean
}

export interface PresentationAuthorInfo {
  name: string
}

export interface PresentationAffiliationInfo {
  name: string
}

export interface PresentationInfo {
  title: string
  description: string
  presentationType: PresentationType
  authors: PresentationAuthorInfo[]
  affiliations: PresentationAffiliationInfo[]
}

export interface HTTPMeetingEnrollmentDetailedWithPresentation {
  id: string
  createdAt: Date
  user: UserParticipantInfo | null
  guest: GuestParticipantInfo | null
  presentation: PresentationInfo | null
}
