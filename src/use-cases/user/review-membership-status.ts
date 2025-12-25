import type {
  ReviewMembershipStatusUseCaseRequest,
  ReviewMembershipStatusUseCaseResponse,
} from '@custom-types/use-cases/user/review-membership-status'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MembershipStatusType } from '@prisma/client'
import { MembershipStatusNotPending } from '@use-cases/errors/user/membership-status-not-pending-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ReviewMembershipStatusUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    membershipStatusReview,
  }: ReviewMembershipStatusUseCaseRequest): Promise<ReviewMembershipStatusUseCaseResponse> {
    const user = await this.dbContext.runInTransaction(async () => {
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

        return null
      }

      const updatedUser = await this.usersRepository.update({
        id: user.id,
        data: {
          user: { membershipStatus: membershipStatusReview },
        },
      })

      return updatedUser
    })

    return { user }
  }
}
