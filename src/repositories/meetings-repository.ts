import type { MeetingWithDetails } from '@custom-types/meeting-with-details'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { GetAllMeetingsQuerySchemaType } from '@schemas/meeting/get-all-meetings-query-schema'

export interface ListAllMeetingsQuery extends GetAllMeetingsQuerySchemaType {}

export interface MeetingsRepository {
  // create: (data: Prisma.MeetingCreateInput) => Promise<Meeting> // WIP
  findByPublicId: (publicId: string) => Promise<MeetingWithDetails | null>
  listAllMeetings: (query?: ListAllMeetingsQuery) => Promise<PaginatedResult<MeetingWithDetails[]>>
}
