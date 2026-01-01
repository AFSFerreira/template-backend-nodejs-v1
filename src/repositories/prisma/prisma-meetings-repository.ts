import type { CreateMeetingQuery } from '@custom-types/repository/meeting/create-meeting-query'
import type { ListAllMeetingsQuery } from '@custom-types/repository/meeting/list-all-meetings-query'
import type { OrderableType } from '@custom-types/validators/orderable'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { meetingWithDetails } from '@custom-types/validators/meeting-with-details'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { mapMeetingStatusToDateFilter } from '@utils/mappers/map-status-to-date-filter'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaMeetingsRepository implements MeetingsRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateMeetingQuery) {
    const { dates, paymentInfo, ...meetingData } = data

    const meeting = await this.dbContext.client.meeting.create({
      data: {
        ...meetingData,
        MeetingDate: {
          create: dates.map((date) => ({ date })),
        },
        MeetingPaymentInfo: paymentInfo
          ? {
              create: {
                value: paymentInfo.value,
                limitDate: paymentInfo.limitDate,
              },
            }
          : undefined,
      },
      include: meetingWithDetails.include,
    })

    return meeting
  }

  async findByPublicId(publicId: string) {
    const meeting = await this.dbContext.client.meeting.findUnique({
      where: { publicId },
      include: meetingWithDetails.include,
    })
    return meeting
  }

  async listAllMeetings(query?: ListAllMeetingsQuery) {
    const orderBy: Prisma.MeetingOrderByWithRelationInput[] = [
      { lastDate: 'desc' as OrderableType },
      { title: 'asc' as OrderableType },
      { id: 'asc' as OrderableType },
    ]

    if (!query) {
      const meetings = await this.dbContext.client.meeting.findMany({
        orderBy,
        include: meetingWithDetails.include,
      })

      return {
        data: meetings,
        meta: {
          totalItems: meetings.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: meetings.length,
        },
      }
    }

    const lastDateConstraint = mapMeetingStatusToDateFilter(query.status)

    const where: Prisma.MeetingWhereInput = {
      lastDate: lastDateConstraint,
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, meetings] = await Promise.all([
      this.dbContext.client.meeting.count({ where }),
      this.dbContext.client.meeting.findMany({
        where,
        skip,
        take,
        orderBy,
        include: meetingWithDetails.include,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: meetings,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }
}
