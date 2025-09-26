import type { MeetingParticipationWithDetails } from '@custom-types/meeting-participation-with-details'
import type { MeetingParticipation } from '@prisma/client'
import type { RegisterGuestMeetingBodySchemaType } from '@schemas/meeting/register-guest-meeting-body-schema'
import type { RegisterUserMeetingBodySchemaType } from '@schemas/meeting/register-user-meeting-body-schema'

export interface CreateMeetingParticipationForUserQuery extends RegisterUserMeetingBodySchemaType {
  meetingId: number
  userId: number
}

export interface CreateMeetingParticipationForGuestQuery extends RegisterGuestMeetingBodySchemaType {
  meetingId: number
}

export interface FindByUserAndMeetingInput {
  userId: number
  meetingId: number
}

export interface MeetingParticipantsRepository {
  createForUser: (query: CreateMeetingParticipationForUserQuery) => Promise<MeetingParticipation>
  createForGuest: (query: CreateMeetingParticipationForGuestQuery) => Promise<MeetingParticipation>
  findByUserAndMeeting: (query: FindByUserAndMeetingInput) => Promise<MeetingParticipation | null>
  listParticipants: (meetingId: number) => Promise<MeetingParticipationWithDetails[]>
}
