import type { UpdateMeetingBodySchemaType } from '@custom-types/http/schemas/meeting/update-meeting-body-schema'
import type { UpdateMeetingParamsSchemaType } from '@custom-types/http/schemas/meeting/update-meeting-params-schema'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface UpdateMeetingUseCaseRequest {
  publicId: UpdateMeetingParamsSchemaType['publicId']
  body: UpdateMeetingBodySchemaType
}

export interface UpdateMeetingUseCaseResponse {
  meeting: MeetingWithDetails
}
