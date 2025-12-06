import type { ListAllMeetingsQuery } from '@custom-types/repositories/meeting/list-all-meetings-query'
import { meetingWithDetails } from '@custom-types/validator/meeting-with-details'
import type { OrderableType } from '@custom-types/validator/orderable'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { mapMeetingStatusToDateFilter } from '@utils/mappers/map-status-to-date-filter'
import { injectable } from 'tsyringe'

@injectable()
export class PrismaMeetingsRepository implements MeetingsRepository {
  async findByPublicId(publicId: string) {
    const meeting = await prisma.meeting.findUnique({
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
      const meetings = await prisma.meeting.findMany({
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
      prisma.meeting.count({ where }),
      prisma.meeting.findMany({
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
