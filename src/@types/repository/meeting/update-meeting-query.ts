import type { Prisma } from '@prisma/client'

export interface UpdateMeetingQuery {
  id: number
  data: Prisma.MeetingUpdateInput
}
