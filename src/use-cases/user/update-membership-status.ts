import type {
  UpdateMembershipStatusUseCaseRequest,
  UpdateMembershipStatusUseCaseResponse,
} from '@custom-types/use-cases/user/update-membership-status'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UserActionAuditsRepository } from '@repositories/user-action-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MembershipStatusType, SystemActionType, UserRoleType } from '@prisma/generated/enums'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { AdminCannotBeInactivatedError } from '@use-cases/errors/user/admin-cannot-be-inactivated-error'
import { CannotUpdateMembershipStatusVerifyingOrPendingError } from '@use-cases/errors/user/cannot-update-membership-status-verifying-or-pending-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateMembershipStatusUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.userActionAudits)
    private readonly userActionAuditsRepository: UserActionAuditsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    membershipStatus,
    audit,
  }: UpdateMembershipStatusUseCaseRequest): Promise<UpdateMembershipStatusUseCaseResponse> {
    const foundUser = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    if (
      foundUser.membershipStatus === MembershipStatusType.VERIFYING ||
      foundUser.membershipStatus === MembershipStatusType.PENDING
    ) {
      throw new CannotUpdateMembershipStatusVerifyingOrPendingError()
    }

    if (foundUser.role === UserRoleType.ADMIN && membershipStatus === MembershipStatusType.INACTIVE) {
      throw new AdminCannotBeInactivatedError()
    }

    const actor = ensureExists({
      value: await this.usersRepository.findByPublicId(audit.actorPublicId),
      error: new UserNotFoundError(),
    })

    const actionType =
      membershipStatus === MembershipStatusType.ACTIVE
        ? SystemActionType.ACCOUNT_ACTIVATED
        : SystemActionType.ACCOUNT_INACTIVATED

    const user = await this.dbContext.runInTransaction(async () => {
      const user = await this.usersRepository.update({
        id: foundUser.id,
        data: {
          user: { membershipStatus },
        },
      })

      await this.userActionAuditsRepository.create({
        actionType,
        actorId: actor.id,
        targetId: foundUser.id,
        ipAddress: audit.ipAddress,
      })

      return user
    })

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
