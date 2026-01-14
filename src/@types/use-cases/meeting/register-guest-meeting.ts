import type { RegisterGuestMeetingBodySchemaType } from '@custom-types/http/schemas/meeting/register-guest-meeting-body-schema'
import type { MeetingEnrollment } from '@prisma/client'

export interface RegisterGuestMeetingUseCaseRequest extends RegisterGuestMeetingBodySchemaType {
  meetingId: string
}

export interface RegisterGuestMeetingUseCaseResponse {
  meetingEnrollment: MeetingEnrollment
}
