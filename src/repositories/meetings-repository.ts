import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateMeetingQuery } from '@custom-types/repository/meeting/create-meeting-query'
import type { ListAllMeetingsQuery } from '@custom-types/repository/meeting/list-all-meetings-query'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface MeetingsRepository {
  create: (data: CreateMeetingQuery) => Promise<MeetingWithDetails>
  findByPublicId: (publicId: string) => Promise<MeetingWithDetails | null>
  listAllMeetings: (query?: ListAllMeetingsQuery) => Promise<PaginatedResult<MeetingWithDetails[]>>
}
