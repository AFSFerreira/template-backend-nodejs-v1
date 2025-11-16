import { Prisma } from '@prisma/client'

export const meetingParticipationWithDetails = Prisma.validator<Prisma.MeetingParticipationDefaultArgs>()({
  include: {
    Guest: true,
    User: true,
  },
})

export type MeetingParticipationWithDetails = Prisma.MeetingParticipationGetPayload<
  typeof meetingParticipationWithDetails
>
