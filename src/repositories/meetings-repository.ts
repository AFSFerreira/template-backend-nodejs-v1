import type { MeetingWithDetails } from '@custom-types/meeting-with-details'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { Meeting } from '@prisma/client'
import type { GetAllMeetingsQuerySchemaType } from '@schemas/meeting/get-all-meetings-query-schema'

export interface ListAllMeetingsQuery extends GetAllMeetingsQuerySchemaType {}

export interface MeetingRepository {
  // create: (data: Prisma.MeetingCreateInput) => Promise<Meeting> // Em Criação
  findByPublicId: (publicId: string) => Promise<MeetingWithDetails | null>
  listAllMeetings: (query?: ListAllMeetingsQuery) => Promise<PaginatedResult<Meeting[]>>
}
