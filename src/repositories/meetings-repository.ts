import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateMeetingQuery } from '@custom-types/repository/prisma/meeting/create-meeting-query'
import type { ListAllMeetingsQuery } from '@custom-types/repository/prisma/meeting/list-all-meetings-query'
import type { UpdateMeetingQuery } from '@custom-types/repository/prisma/meeting/update-meeting-query'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import type { Meeting } from '@prisma/generated/client'

export interface MeetingsRepository {
  create: (data: CreateMeetingQuery) => Promise<MeetingWithDetails>
  findActiveMeeting: () => Promise<Meeting | null>
  findByPublicId: (publicId: string) => Promise<MeetingWithDetails | null>
  update: (query: UpdateMeetingQuery) => Promise<MeetingWithDetails>
  listAllMeetings: (query?: ListAllMeetingsQuery) => Promise<PaginatedResult<MeetingWithDetails[]>>
  delete: (id: number) => Promise<void>
}
