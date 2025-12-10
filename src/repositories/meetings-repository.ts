import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllMeetingsQuery } from '@custom-types/repository/meeting/list-all-meetings-query'
import type { MeetingWithDetails } from '@custom-types/validator/meeting-with-details'

export interface MeetingsRepository {
  // create: (data: Prisma.MeetingCreateInput) => Promise<Meeting> // WIP
  findByPublicId: (publicId: string) => Promise<MeetingWithDetails | null>
  listAllMeetings: (query?: ListAllMeetingsQuery) => Promise<PaginatedResult<MeetingWithDetails[]>>
}
