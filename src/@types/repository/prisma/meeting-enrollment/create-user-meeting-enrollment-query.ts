import type { RegisterUserMeetingBodySchemaType } from '@custom-types/http/schemas/meeting/register-user-meeting-body-schema'

export interface CreateUserMeetingEnrollmentQuery extends RegisterUserMeetingBodySchemaType {
  meetingId: number
  userId: number
}
