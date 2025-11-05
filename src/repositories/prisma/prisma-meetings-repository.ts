import { meetingWithDetails } from '@custom-types/meeting-with-details'
import type { OrderableType } from '@custom-types/orderable'
import { prisma } from '@lib/prisma'
import type { ListAllMeetingsQuery, MeetingsRepository } from '@repositories/meetings-repository'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'
import { mapMeetingStatusToDateFilter } from '@utils/map-status-to-date-filter'

export class PrismaMeetingsRepository implements MeetingsRepository {
  async findByPublicId(publicId: string) {
    const meeting = await prisma.meeting.findUnique({
      where: { publicId },
      include: meetingWithDetails.include,
    })
    return meeting
  }

  async listAllMeetings(query?: ListAllMeetingsQuery) {
    const orderBy = [
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

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const where = {
      lastDate: lastDateConstraint,
    }

    const [countResult, meetings] = await Promise.all([
      prisma.meeting.count({ where: {} }),
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
