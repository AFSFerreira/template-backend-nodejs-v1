import type {
  ReviewMembershipStatusUseCaseRequest,
  ReviewMembershipStatusUseCaseResponse,
} from '@custom-types/use-cases/user/review-membership-status'
import { MembershipStatusType } from '@prisma/client'
import type { UsersRepository } from '@repositories/users-repository'
import { MembershipStatusNotPending } from '@use-cases/errors/user/membership-status-not-pending-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/guards/ensure'

export class ReviewMembershipStatusUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    publicId,
    membershipStatusReview,
  }: ReviewMembershipStatusUseCaseRequest): Promise<ReviewMembershipStatusUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    if (user.membershipStatus !== MembershipStatusType.PENDING) {
      throw new MembershipStatusNotPending()
    }

    if (membershipStatusReview === 'REJECTED') {
      // TODO: Verificar se enviamos um email?
      await this.usersRepository.delete(user.id)

      return {}
    }

    const updatedUser = await this.usersRepository.update({
      id: user.id,
      data: {
        user: { membershipStatus: membershipStatusReview },
      },
    })

    return { user: updatedUser }
  }
}
