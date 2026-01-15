import type { RegisterUserMeetingBodySchemaType } from '@custom-types/http/schemas/meeting/register-user-meeting-body-schema'
import type { MeetingEnrollment } from '@prisma/client'

export interface RegisterUserMeetingUseCaseRequest extends RegisterUserMeetingBodySchemaType {
  userPublicId: string
  meetingId: string
}

export interface RegisterUserMeetingUseCaseResponse {
  meetingEnrollment: MeetingEnrollment
}
