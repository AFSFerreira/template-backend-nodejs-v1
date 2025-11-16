import type { RegisterGuestMeetingBodySchemaType } from '@schemas/meeting/register-guest-meeting-body-schema'

export interface CreateMeetingParticipationForGuestQuery extends RegisterGuestMeetingBodySchemaType {
  meetingId: number
}
