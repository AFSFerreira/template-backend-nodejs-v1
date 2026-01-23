import type { Prisma } from '@prisma/client'

export interface CreateMeetingQuery extends Prisma.MeetingCreateInput {
  dates: Date[]
  meetingPaymentInfo: Prisma.MeetingPaymentInfoCreateWithoutMeetingInput
}
