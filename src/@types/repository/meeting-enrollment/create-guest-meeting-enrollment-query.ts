import type { RegisterGuestMeetingBodySchemaType } from '@custom-types/schemas/meeting/register-guest-meeting-body-schema'

export interface CreateGuestMeetingEnrollmentQuery extends RegisterGuestMeetingBodySchemaType {
  meetingId: number
}
