import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllMeetingsQuerySchemaType } from '@custom-types/http/schemas/meeting/get-all-meetings-query-schema'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface GetAllMeetingsUseCaseRequest extends GetAllMeetingsQuerySchemaType {}

export interface GetAllMeetingsUseCaseResponse extends PaginatedResult<MeetingWithDetails[]> {}
