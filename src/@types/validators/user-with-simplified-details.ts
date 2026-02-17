import type { Prisma } from '@prisma/generated/client'

export const userWithSimplifiedDetails = {
  include: {
    Address: true,
    Institution: true,
  },
} as const satisfies Prisma.UserDefaultArgs

export type UserWithSimplifiedDetails = Prisma.UserGetPayload<typeof userWithSimplifiedDetails>
