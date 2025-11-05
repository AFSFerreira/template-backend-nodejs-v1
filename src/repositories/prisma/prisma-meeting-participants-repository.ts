import { prisma } from '@lib/prisma'
import type {
  CreateMeetingParticipationForGuestQuery,
  CreateMeetingParticipationForUserQuery,
  FindByGuestEmailAndMeetingId,
  FindByUserIdAndMeetingIdInput,
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
    const { meetingPresentationData, ...guestData } = query

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
            ...guestData,
            wantsNewsletter: query.wantsNewsletter,
          },
        },
      },
    })
    return meetingParticipation
  }

  async findByUserIdAndMeetingId(query: FindByUserIdAndMeetingIdInput) {
    const meetingParticipation = await prisma.meetingParticipation.findUnique({
      where: {
        meetingId_userId: query,
      },
    })
    return meetingParticipation
  }

  async findByGuestEmailAndMeetingId(query: FindByGuestEmailAndMeetingId) {
    const meetingParticipation = await prisma.meetingParticipation.findFirst({
      where: {
        meetingId: query.meetingId,
        Guest: {
          email: query.email,
        },
      },
    })
    return meetingParticipation
  }

  async listAllParticipants(meetingId: number) {
    const participants = await prisma.meetingParticipation.findMany({
      where: { meetingId },
      include: {
        Guest: true,
        User: true,
      },
      orderBy: [{ Meeting: { lastDate: 'desc' } }, { Guest: { fullName: 'asc' } }, { id: 'asc' }],
    })
    return participants
  }
}
