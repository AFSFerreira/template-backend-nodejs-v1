import type { OrderableType } from '@custom-types/custom/orderable'
import type { CreateMeetingQuery } from '@custom-types/repository/prisma/meeting/create-meeting-query'
import type { ListAllMeetingsQuery } from '@custom-types/repository/prisma/meeting/list-all-meetings-query'
import type { UpdateMeetingQuery } from '@custom-types/repository/prisma/meeting/update-meeting-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { meetingWithDetails } from '@custom-types/validators/meeting-with-details'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { mapMeetingStatusToDateFilter } from '@utils/mappers/map-status-to-date-filter'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaMeetingsRepository implements MeetingsRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateMeetingQuery) {
    const { dates, meetingPaymentInfo, ...meetingData } = data

    const meeting = await this.dbContext.client.meeting.create({
      data: {
        ...meetingData,
        MeetingDate: {
          create: dates.map((date) => ({ date })),
        },
        MeetingPaymentInfo: meetingPaymentInfo
          ? {
              create: meetingPaymentInfo,
            }
          : undefined,
      },
      include: meetingWithDetails.include,
    })

    return meeting
  }

  async findActiveMeeting() {
    const meeting = await this.dbContext.client.meeting.findFirst({
      where: {
        lastDate: {
          gte: new Date(),
        },
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

  async update(query: UpdateMeetingQuery) {
    const meeting = await this.dbContext.client.meeting.update({
      where: { id: query.id },
      data: query.data,
      include: meetingWithDetails.include,
    })
    return meeting
  }

  async listAllMeetings(query: ListAllMeetingsQuery) {
    const orderBy: Prisma.MeetingOrderByWithRelationInput[] = [
      ...(query.orderBy?.lastDateOrder ? [{ lastDate: query.orderBy.lastDateOrder }] : []),
      ...(query.orderBy?.titleOrder ? [{ title: query.orderBy.titleOrder }] : []),
      { id: 'asc' as OrderableType },
    ]

    const lastDateConstraint = mapMeetingStatusToDateFilter(query.status)

    const where: Prisma.MeetingWhereInput = {
      title: {
        contains: query.title,
        mode: 'insensitive',
      },
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

  async delete(id: number): Promise<void> {
    await this.dbContext.client.meeting.delete({
      where: { id },
    })
  }
}
