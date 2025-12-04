import type { RegisterUserMeetingBodySchemaType } from '@custom-types/schemas/meeting/register-user-meeting-body-schema'

export interface CreateMeetingParticipationForUserQuery extends RegisterUserMeetingBodySchemaType {
  meetingId: number
  userId: number
}
