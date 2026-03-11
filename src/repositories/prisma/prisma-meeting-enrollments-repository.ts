import type { CreateGuestMeetingEnrollmentQuery } from '@custom-types/repository/prisma/meeting-enrollment/create-guest-meeting-enrollment-query'
import type { CreateUserMeetingEnrollmentQuery } from '@custom-types/repository/prisma/meeting-enrollment/create-user-meeting-enrollment-query'
import type { FindByGuestEmailAndMeetingIdQuery } from '@custom-types/repository/prisma/meeting-enrollment/find-by-guest-email-and-meeting-id-query'
import type { FindByUserIdAndMeetingIdQuery } from '@custom-types/repository/prisma/meeting-enrollment/find-by-user-id-and-meeting-id-query'
import type { ListMeetingEnrollmentsQuery } from '@custom-types/repository/prisma/meeting-enrollment/list-meeting-enrollments-query'
import type { StreamAllEnrollmentsQuery } from '@custom-types/repository/prisma/meeting-enrollment/stream-all-enrollments-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import { meetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PrismaMeetingEnrollmentsRepository implements MeetingEnrollmentsRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async createForUser(data: CreateUserMeetingEnrollmentQuery) {
    const { meetingId, userId, meetingPresentationData } = data

    const meetingEnrollment = await this.dbContext.client.meetingEnrollment.create({
      data: {
        Meeting: {
          connect: {
            id: meetingId,
          },
        },
        UserDetails: {
          create: {
            userId,
          },
        },
        MeetingPresentation: meetingPresentationData
          ? {
              create: {
                presentationType: meetingPresentationData.presentationType,
                title: meetingPresentationData.title,
                description: meetingPresentationData.description,
                Authors: {
                  create: meetingPresentationData.authors.map((name) => ({ name })),
                },
                Affiliations: {
                  create: meetingPresentationData.affiliations.map((name) => ({ name })),
                },
              },
            }
          : undefined,
      },
    })

    return meetingEnrollment
  }

  async createForGuest(data: CreateGuestMeetingEnrollmentQuery) {
    const { meetingId, meetingPresentationData, ...guestData } = data

    const meetingEnrollment = await this.dbContext.client.meetingEnrollment.create({
      data: {
        Meeting: {
          connect: {
            id: meetingId,
          },
        },
        GuestDetails: {
          create: guestData,
        },
        MeetingPresentation: meetingPresentationData
          ? {
              create: {
                presentationType: meetingPresentationData.presentationType,
                title: meetingPresentationData.title,
                description: meetingPresentationData.description,
                Authors: {
                  create: meetingPresentationData.authors.map((name) => ({ name })),
                },
                Affiliations: {
                  create: meetingPresentationData.affiliations.map((name) => ({ name })),
                },
              },
            }
          : undefined,
      },
    })

    return meetingEnrollment
  }

  async findByUserIdAndMeetingId(query: FindByUserIdAndMeetingIdQuery) {
    const { userId, meetingId } = query

    const meetingEnrollment = await this.dbContext.client.meetingEnrollment.findFirst({
      where: {
        meetingId,
        UserDetails: {
          userId,
        },
      },
    })

    return meetingEnrollment
  }

  async findByPublicId(publicId: string) {
    const meetingEnrollment = await this.dbContext.client.meetingEnrollment.findUnique({
      where: { publicId },
      include: meetingEnrollmentWithDetails.include,
    })
    return meetingEnrollment
  }

  async findByGuestEmailAndMeetingId(query: FindByGuestEmailAndMeetingIdQuery) {
    const { email, meetingId } = query

    const meetingEnrollment = await this.dbContext.client.meetingEnrollment.findFirst({
      where: {
        meetingId,
        GuestDetails: {
          email,
        },
      },
    })

    return meetingEnrollment
  }

  async listMeetingEnrollments(query: ListMeetingEnrollmentsQuery) {
    const { meetingId, page, limit } = query

    const where: Prisma.MeetingEnrollmentWhereInput = {
      meetingId,
    }

    const orderBy: Prisma.MeetingEnrollmentOrderByWithRelationInput[] = [
      ...(query.orderBy?.createdAtOrder ? [{ createdAt: query.orderBy.createdAtOrder }] : []),
      { id: 'asc' },
    ]

    const { offset: skip, limit: take } = evalOffset({ page, limit })

    const [countResult, enrollments] = await Promise.all([
      this.dbContext.client.meetingEnrollment.count({ where }),
      this.dbContext.client.meetingEnrollment.findMany({
        where,
        skip,
        take,
        orderBy,
        include: meetingEnrollmentWithDetails.include,
      }),
    ])

    const pageSize = limit
    const totalItems = countResult
    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: enrollments,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
      },
    }
  }

  async *streamAllEnrollments(query?: StreamAllEnrollmentsQuery) {
    const { where, batchSize = 500 } = query ?? {}

    let cursor: number | undefined

    while (true) {
      const batch = await this.dbContext.client.meetingEnrollment.findMany({
        where,
        take: batchSize,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        include: meetingEnrollmentWithDetails.include,
        orderBy: { id: 'asc' },
      })

      if (batch.length === 0) break

      for (const enrollment of batch) yield enrollment

      cursor = batch.at(-1)?.id
    }
  }

  async deleteById(id: number) {
    await this.dbContext.client.meetingEnrollment.delete({
      where: {
        id,
      },
    })
  }
}
