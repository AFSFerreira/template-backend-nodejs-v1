import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetMeetingParticipantsParamsSchemaType } from '@custom-types/schemas/meeting/get-meeting-participants-params-schema'
import type { GetMeetingParticipantsQuerySchemaType } from '@custom-types/schemas/meeting/get-meeting-participants-query-schema'
import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'

export interface GetMeetingParticipantsUseCaseRequest
  extends GetMeetingParticipantsQuerySchemaType,
    GetMeetingParticipantsParamsSchemaType {}

export interface GetMeetingParticipantsUseCaseResponse extends PaginatedResult<MeetingEnrollmentWithDetails[]> {}
