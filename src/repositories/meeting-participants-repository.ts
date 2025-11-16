import type { CreateMeetingParticipationForGuestQuery } from '@custom-types/repositories/meeting-participants/create-meeting-participation-for-guest-query'
import type { CreateMeetingParticipationForUserQuery } from '@custom-types/repositories/meeting-participants/create-meeting-participation-for-user-query'
import type { FindByGuestEmailAndMeetingId } from '@custom-types/repositories/meeting-participants/find-by-guest-email-and-meeting-id'
import type { FindByUserIdAndMeetingIdInput } from '@custom-types/repositories/meeting-participants/find-by-user-id-and-meeting-id-input'
import type { MeetingParticipationWithDetails } from '@custom-types/validator/meeting-participation-with-details'
import type { MeetingParticipation } from '@prisma/client'

export interface MeetingParticipantsRepository {
  createForUser: (query: CreateMeetingParticipationForUserQuery) => Promise<MeetingParticipation>
  createForGuest: (query: CreateMeetingParticipationForGuestQuery) => Promise<MeetingParticipation>
  findByUserIdAndMeetingId: (query: FindByUserIdAndMeetingIdInput) => Promise<MeetingParticipation | null>
  findByGuestEmailAndMeetingId: (query: FindByGuestEmailAndMeetingId) => Promise<MeetingParticipation | null>
  listAllParticipants: (meetingId: number) => Promise<MeetingParticipationWithDetails[]>
}
