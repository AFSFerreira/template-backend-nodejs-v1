import { Prisma } from '@prisma/client'

export const userWithRestrictedDetails =
  Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
      Address: true,
      Institution: true,
    },
  })

export type UserWithRestrictedDetails = Prisma.UserGetPayload<
  typeof userWithRestrictedDetails
>
