import type { Prisma } from '@prisma/generated/client'

export interface UpdateMeetingQuery {
  id: number
  data: Prisma.MeetingUpdateWithoutMeetingPaymentInfoInput & {
    meetingPaymentInfo?: Prisma.MeetingPaymentInfoCreateWithoutMeetingInput
  }
}
