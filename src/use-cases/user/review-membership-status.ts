import type {
  ReviewMembershipStatusUseCaseRequest,
  ReviewMembershipStatusUseCaseResponse,
} from '@custom-types/use-cases/user/review-membership-status'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UserActionAuditsRepository } from '@repositories/user-action-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEMBERSHIP_ACCEPTED_EMAIL_SUBJECT, MEMBERSHIP_REJECTED_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import {
  MEMBERSHIP_ACCEPTED_EMAIL_SEND_ERROR,
  MEMBERSHIP_REJECTED_EMAIL_SEND_ERROR,
} from '@messages/loggings/models/user-loggings'
import { MembershipStatusType, SystemActionType } from '@prisma/generated/enums'
import { buildUserProfileImagePath } from '@services/builders/paths/build-user-profile-image-path'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { MembershipApprovedRenderer } from '@services/renderers/emails/membership-approved-renderer'
import { MembershipRejectedRenderer } from '@services/renderers/emails/membership-rejected-renderer'
import { MembershipStatusNotPending } from '@use-cases/errors/user/membership-status-not-pending-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ReviewMembershipStatusUseCase {
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
    membershipStatusReview,
    audit,
  }: ReviewMembershipStatusUseCaseRequest): Promise<ReviewMembershipStatusUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    if (user.membershipStatus !== MembershipStatusType.PENDING) {
      throw new MembershipStatusNotPending()
    }

    const actor = ensureExists({
      value: await this.usersRepository.findByPublicId(audit.actorPublicId),
      error: new UserNotFoundError(),
    })

    const emailInfo = {
      fullName: user.fullName,
      email: user.email,
    }

    switch (membershipStatusReview) {
      case 'ACTIVE': {
        // Aprova o pedido de associação
        await this.dbContext.runInTransaction(async () => {
          await this.usersRepository.update({
            id: user.id,
            data: {
              user: {
                membershipStatus: MembershipStatusType.ACTIVE,
              },
            },
          })

          await this.userActionAuditsRepository.create({
            actionType: SystemActionType.MEMBERSHIP_APPROVED,
            actorId: actor.id,
            targetId: user.id,
            ipAddress: audit.ipAddress,
          })
        })

        const { html, text, attachments } = await new MembershipApprovedRenderer().render(emailInfo, {
          minify: 'email',
        })

        await sendEmailEnqueued({
          to: user.email,
          subject: MEMBERSHIP_ACCEPTED_EMAIL_SUBJECT,
          message: text,
          html,
          attachments,
          logging: {
            errorMessage: MEMBERSHIP_ACCEPTED_EMAIL_SEND_ERROR,
            context: { userPublicId: user.publicId, userEmail: user.email },
          },
        })

        break
      }

      case 'REJECTED': {
        await this.dbContext.runInTransaction(async () => {
          await this.usersRepository.delete(user.id)

          await this.userActionAuditsRepository.create({
            actionType: SystemActionType.MEMBERSHIP_REJECTED,
            actorId: actor.id,
            targetId: user.id,
            ipAddress: audit.ipAddress,
          })
        })

        if (user.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
          // Removendo a imagem de perfil do usuário
          await deleteFileEnqueued({
            filePath: buildUserProfileImagePath(user.profileImage),
          })
        }

        const { html, text, attachments } = await new MembershipRejectedRenderer().render(emailInfo, {
          minify: 'email',
        })

        await sendEmailEnqueued({
          to: user.email,
          subject: MEMBERSHIP_REJECTED_EMAIL_SUBJECT,
          message: text,
          html,
          attachments,
          logging: {
            errorMessage: MEMBERSHIP_REJECTED_EMAIL_SEND_ERROR,
            context: { userPublicId: user.publicId, userEmail: user.email },
          },
        })

        break
      }

      default: {
        throw new UnreachableCaseError(membershipStatusReview satisfies never)
      }
    }

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
