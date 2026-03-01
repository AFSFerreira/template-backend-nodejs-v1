import type { Prisma } from '@prisma/generated/client'

export interface StreamAllEnrollmentsQuery {
  where?: Prisma.MeetingEnrollmentWhereInput
  batchSize?: number
}
