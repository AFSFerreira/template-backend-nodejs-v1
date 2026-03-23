import type { Prisma } from '@prisma/generated/client'

export interface UpdateUserQuery {
  id: string
  data: Prisma.UserUpdateInput
}
