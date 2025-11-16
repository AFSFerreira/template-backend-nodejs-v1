import type { RegisterUserMeetingBodySchemaType } from '@schemas/meeting/register-user-meeting-body-schema'

export interface CreateMeetingParticipationForUserQuery extends RegisterUserMeetingBodySchemaType {
  meetingId: number
  userId: number
}
