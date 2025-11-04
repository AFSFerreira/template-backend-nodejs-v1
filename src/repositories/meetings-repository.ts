import type { MeetingWithDetails } from '@custom-types/meeting-with-details'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { Meeting } from '@prisma/client'
import type { GetAllMeetingsQuerySchemaType } from '@schemas/meeting/get-all-meetings-query-schema'
import type { ListOngoingMeetingsQuerySchemaType } from '@schemas/meeting/list-ongoing-meetings-query-schema'

export interface ListAllMeetingsQuery extends GetAllMeetingsQuerySchemaType {}

export interface ListOngoingMeetingsQuery extends ListOngoingMeetingsQuerySchemaType {}

export interface MeetingsRepository {
  // create: (data: Prisma.MeetingCreateInput) => Promise<Meeting> // WIP
  findByPublicId: (publicId: string) => Promise<MeetingWithDetails | null>
  listAllMeetings: (query?: ListAllMeetingsQuery) => Promise<PaginatedResult<Meeting[]>>
  listOngoingMeetings: (query?: ListOngoingMeetingsQuery) => Promise<PaginatedResult<MeetingWithDetails[]>>
}
