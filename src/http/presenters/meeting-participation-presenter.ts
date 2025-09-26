import type { MeetingParticipation } from '@prisma/client'

interface HTTPMeetingParticipation {
  createdAt: Date
  userId: number | null
  guestId: number | null
  meetingId: number
}

// TODO: Verificar posteriormente se este presenter é necessário e, se não for, removê-lo
export class MeetingParticipationPresenter {
  static toHTTP(meetingParticipation: MeetingParticipation): HTTPMeetingParticipation
  static toHTTP(meetingParticipants: MeetingParticipation[]): HTTPMeetingParticipation[]
  static toHTTP(input: MeetingParticipation | MeetingParticipation[]): HTTPMeetingParticipation | HTTPMeetingParticipation[] {
    if (Array.isArray(input)) {
      return input.map((participation) => MeetingParticipationPresenter.toHTTP(participation))
    }

    return {
      createdAt: input.createdAt,
      userId: input.userId,
      guestId: input.guestId,
      meetingId: input.meetingId,
    }
  }
}
