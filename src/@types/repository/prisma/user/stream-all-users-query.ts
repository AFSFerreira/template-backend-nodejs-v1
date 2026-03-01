import type { Prisma } from '@prisma/generated/client'

export interface StreamAllUsersQuery {
  where?: Prisma.UserWhereInput
  batchSize?: number
}
