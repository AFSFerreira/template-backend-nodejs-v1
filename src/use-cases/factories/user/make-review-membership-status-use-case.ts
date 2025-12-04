import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ReviewMembershipStatusUseCase } from '@use-cases/user/review-membership-status'

export function makeReviewMembershipStatusUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const reviewMembershipStatusUseCase = new ReviewMembershipStatusUseCase(usersRepository)

  return reviewMembershipStatusUseCase
}
