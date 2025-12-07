import type { CreateMeetingParticipationForGuestQuery } from '@custom-types/repositories/meeting-participants/create-meeting-participation-for-guest-query'
import type { CreateMeetingParticipationForUserQuery } from '@custom-types/repositories/meeting-participants/create-meeting-participation-for-user-query'
import type { FindByGuestEmailAndMeetingId } from '@custom-types/repositories/meeting-participants/find-by-guest-email-and-meeting-id'
import type { FindByUserIdAndMeetingIdInput } from '@custom-types/repositories/meeting-participants/find-by-user-id-and-meeting-id-input'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaMeetingParticipantsRepository implements MeetingParticipantsRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async createForUser(query: CreateMeetingParticipationForUserQuery) {
    const meetingParticipation = await this.dbContext.client.meetingParticipation.create({
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

    const meetingParticipation = await this.dbContext.client.meetingParticipation.create({
      data: {
        Presentation: {
          create: meetingPresentationData,
        },
        Meeting: {
          connect: { id: query.meetingId },
        },
        Guest: {
          create: {
            ...guestData,
            wantsNewsletter: query.wantsNewsletter ?? false,
          },
        },
      },
    })
    return meetingParticipation
  }

  async findByUserIdAndMeetingId(query: FindByUserIdAndMeetingIdInput) {
    const meetingParticipation = await this.dbContext.client.meetingParticipation.findUnique({
      where: {
        meetingId_userId: query,
      },
    })
    return meetingParticipation
  }

  async findByGuestEmailAndMeetingId(query: FindByGuestEmailAndMeetingId) {
    const meetingParticipation = await this.dbContext.client.meetingParticipation.findFirst({
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
    const participants = await this.dbContext.client.meetingParticipation.findMany({
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
