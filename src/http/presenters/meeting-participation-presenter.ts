import type { MeetingParticipation } from '@prisma/client'

interface HTTPMeetingParticipation {
  id: number
  createdAt: Date
  userId: number | null
  guestId: number | null
  meetingId: number
}

export class MeetingParticipationPresenter {
  static toHTTP(meetingParticipation: MeetingParticipation): HTTPMeetingParticipation
  static toHTTP(meetingParticipations: MeetingParticipation[]): HTTPMeetingParticipation[]
  static toHTTP(input: MeetingParticipation | MeetingParticipation[]): HTTPMeetingParticipation | HTTPMeetingParticipation[] {
    if (Array.isArray(input)) {
      return input.map((participation) => MeetingParticipationPresenter.toHTTP(participation))
    }

    return {
      id: input.id,
      createdAt: input.createdAt,
      userId: input.userId,
      guestId: input.guestId,
      meetingId: input.meetingId,
    }
  }
}
