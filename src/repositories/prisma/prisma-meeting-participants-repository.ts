import { prisma } from '@lib/prisma'
import type {
  CreateMeetingParticipationForGuestQuery,
  CreateMeetingParticipationForUserQuery,
  FindByUserAndMeetingInput,
  MeetingParticipantsRepository,
} from '@repositories/meeting-participants-repository'

export class PrismaMeetingParticipantsRepository implements MeetingParticipantsRepository {
  async createForUser(query: CreateMeetingParticipationForUserQuery) {
    const meetingParticipation = await prisma.meetingParticipation.create({
      data: {
        Presentation: {
          create: query.meetingPresentationData,
        },
        Meeting: {
          connect: { id: query.meetingId },
        },
        User: {
          connect: { id: query.userId },
        },
      },
    })
    return meetingParticipation
  }

  async createForGuest(query: CreateMeetingParticipationForGuestQuery) {
    const meetingParticipation = await prisma.meetingParticipation.create({
      data: {
        Presentation: {
          create: query.meetingPresentationData,
        },
        Meeting: {
          connect: { id: query.meetingId },
        },
        Guest: {
          create: {
            fullName: query.guestFullName,
            email: query.guestEmail,
          },
        },
      },
    })
    return meetingParticipation
  }

  async findByUserAndMeeting(query: FindByUserAndMeetingInput) {
    const meetingParticipation = await prisma.meetingParticipation.findUnique({
      where: {
        meetingId_userId: query,
      },
    })
    return meetingParticipation
  }

  async listParticipants(meetingId: number) {
    const participants = await prisma.meetingParticipation.findMany({
      where: { meetingId },
      include: {
        Guest: true,
        User: true,
      },
    })
    return participants
  }
}
