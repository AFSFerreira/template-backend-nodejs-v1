import type { RegisterUserMeetingBodySchemaType } from '@custom-types/schemas/meeting/register-user-meeting-body-schema'
import type { MeetingParticipation } from '@prisma/client'

export interface RegisterUserMeetingUseCaseRequest extends RegisterUserMeetingBodySchemaType {
  userPublicId: string
  meetingId: string
}

export interface RegisterUserMeetingUseCaseResponse {
  meetingParticipation: MeetingParticipation
}
