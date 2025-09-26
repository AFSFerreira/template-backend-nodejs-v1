import { meetingWithDetails } from '@custom-types/meeting-with-details'
import { prisma } from '@lib/prisma'
import type { ListAllMeetingsQuery, MeetingsRepository } from '@repositories/meetings-repository'
import { evalOffset } from '@utils/eval-offset'
import { mapStatusToDateFilter } from '@utils/map-status-to-date-filter'

export class PrismaMeetingsRepository implements MeetingsRepository {
  async findByPublicId(publicId: string) {
    const meeting = await prisma.meeting.findUnique({
      where: { publicId },
      include: meetingWithDetails.include,
    })
    return meeting
  }

  async listAllMeetings(query?: ListAllMeetingsQuery) {
    if (!query) {
      const meetings = await prisma.meeting.findMany()

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

    const lastDateConstraint = mapStatusToDateFilter(query.status)

    const { offset: skip, limit: take, page } = evalOffset({ page: query.page, limit: query.limit })

    const where = { lastDate: lastDateConstraint }

    const [countResult, meetings] = await Promise.all([
      prisma.meeting.count({ where }),
      prisma.meeting.findMany({
        where,
        skip,
        take,
      }),
    ])

    const totalPages = Math.ceil(countResult / query.limit)

    return {
      data: meetings,
      meta: {
        totalItems: countResult,
        totalPages,
        currentPage: page,
        pageSize: take,
      },
    }
  }
}
