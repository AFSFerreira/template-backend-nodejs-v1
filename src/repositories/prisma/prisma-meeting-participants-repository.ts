import type { CreateMeetingParticipationForGuestQuery } from '@custom-types/repository/meeting-participants/create-meeting-participation-for-guest-query'
import type { CreateMeetingParticipationForUserQuery } from '@custom-types/repository/meeting-participants/create-meeting-participation-for-user-query'
import type { FindByGuestEmailAndMeetingId } from '@custom-types/repository/meeting-participants/find-by-guest-email-and-meeting-id'
import type { FindByUserIdAndMeetingIdInput } from '@custom-types/repository/meeting-participants/find-by-user-id-and-meeting-id-input'
import type { ListMeetingParticipantsQuery } from '@custom-types/repository/meeting-participants/list-meeting-participants-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import { meetingParticipationWithDetails } from '@custom-types/validator/meeting-participation-with-details'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
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

  async listMeetingParticipants(query: ListMeetingParticipantsQuery) {
    const orderBy: Prisma.MeetingParticipationOrderByWithRelationInput[] = [{ createdAt: 'desc' }, { id: 'asc' }]

    const where: Prisma.MeetingParticipationWhereInput = {
      meetingId: query.meetingId,
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, meetingParticipations] = await Promise.all([
      this.dbContext.client.meetingParticipation.count({ where }),
      this.dbContext.client.meetingParticipation.findMany({
        where,
        skip,
        take,
        orderBy,
        include: meetingParticipationWithDetails.include,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult
    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: meetingParticipations,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }
}
