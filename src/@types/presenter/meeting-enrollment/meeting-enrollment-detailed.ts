import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import type { EducationLevelType, OccupationType } from '@prisma/client'

export interface MeetingEnrollmentPresenterInput extends MeetingEnrollmentWithDetails {}

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

export interface HTTPMeetingEnrollmentDetailed {
  id: string
  createdAt: Date
  user: UserParticipantInfo | null
  guest: GuestParticipantInfo | null
}
