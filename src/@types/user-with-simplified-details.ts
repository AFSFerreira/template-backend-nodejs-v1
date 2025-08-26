import { Prisma } from '@prisma/client'

export const userWithSimplifiedDetails =
  Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
      Address: true,
      Institution: true,
    },
  })

export type UserWithSimplifiedDetails = Prisma.UserGetPayload<
  typeof userWithSimplifiedDetails
>
