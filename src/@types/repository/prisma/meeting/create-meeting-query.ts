import type { Prisma } from '@prisma/generated/client'

export interface CreateMeetingQuery extends Prisma.MeetingCreateInput {
  dates: Date[]
  meetingPaymentInfo: Prisma.MeetingPaymentInfoCreateWithoutMeetingInput
}
