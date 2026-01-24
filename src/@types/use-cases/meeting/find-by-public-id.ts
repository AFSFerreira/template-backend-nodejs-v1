import type { FindMeetingByPublicIdParamsSchemaType } from '@custom-types/http/schemas/meeting/find-meeting-by-public-id-params-schema'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface FindMeetingByPublicIdUseCaseRequest extends FindMeetingByPublicIdParamsSchemaType {}

export interface FindMeetingByPublicIdUseCaseResponse {
  meeting: MeetingWithDetails
}
