import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateGuestMeetingEnrollmentQuery } from '@custom-types/repository/prisma/meeting-enrollment/create-guest-meeting-enrollment-query'
import type { CreateUserMeetingEnrollmentQuery } from '@custom-types/repository/prisma/meeting-enrollment/create-user-meeting-enrollment-query'
import type { FindByGuestEmailAndMeetingIdQuery } from '@custom-types/repository/prisma/meeting-enrollment/find-by-guest-email-and-meeting-id-query'
import type { FindByUserIdAndMeetingIdQuery } from '@custom-types/repository/prisma/meeting-enrollment/find-by-user-id-and-meeting-id-query'
import type { ListMeetingEnrollmentsQuery } from '@custom-types/repository/prisma/meeting-enrollment/list-meeting-enrollments-query'
import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import type { MeetingEnrollment } from '@prisma/client'

export interface MeetingEnrollmentsRepository {
  createForUser: (data: CreateUserMeetingEnrollmentQuery) => Promise<MeetingEnrollment>
  createForGuest: (data: CreateGuestMeetingEnrollmentQuery) => Promise<MeetingEnrollment>
  findByPublicId: (publicId: string) => Promise<MeetingEnrollmentWithDetails | null>
  findByUserIdAndMeetingId: (query: FindByUserIdAndMeetingIdQuery) => Promise<MeetingEnrollment | null>
  findByGuestEmailAndMeetingId: (query: FindByGuestEmailAndMeetingIdQuery) => Promise<MeetingEnrollment | null>
  listMeetingEnrollments: (
    query: ListMeetingEnrollmentsQuery,
  ) => Promise<PaginatedResult<MeetingEnrollmentWithDetails[]>>
  deleteById: (id: number) => Promise<void>
}
