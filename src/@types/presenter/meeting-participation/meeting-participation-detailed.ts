import type { MeetingParticipationWithDetails } from '@custom-types/validator/meeting-participation-with-details'
import type { EducationLevelType } from '@prisma/client'

export interface MeetingParticipationPresenterInput extends MeetingParticipationWithDetails {}

export interface UserParticipantInfo {
  id: string
  fullName: string
  email: string
  profileImage: string
  educationLevel: EducationLevelType
  occupation?: string | null
  wantsNewsletter: boolean
}

export interface GuestParticipantInfo {
  fullName: string
  email: string
  institutionName: string
  departmentName: string
  occupation: string
  educationLevel: EducationLevelType
  wantsNewsletter: boolean
}

export interface HTTPMeetingParticipationDetailed {
  createdAt: Date
  user: UserParticipantInfo | null
  guest: GuestParticipantInfo | null
}
