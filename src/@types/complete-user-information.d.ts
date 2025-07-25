import { Prisma } from '@prisma/client'

export const userWithDetails = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    address: true,
    enrolledCourse: true,
    activityArea: true,
    academicPublication: true,
    keyword: true,
  },
})

export type UserWithDetails = Prisma.UserGetPayload<typeof userWithDetails>
