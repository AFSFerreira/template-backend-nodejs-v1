import type { CreateMeetingBodySchemaType } from '@custom-types/schemas/meeting/create-meeting-body-schema'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface CreateMeetingUseCaseRequest extends CreateMeetingBodySchemaType {}

export interface CreateMeetingUseCaseResponse {
  meeting: MeetingWithDetails
}
