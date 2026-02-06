import type {
  ReviewMembershipStatusUseCaseRequest,
  ReviewMembershipStatusUseCaseResponse,
} from '@custom-types/use-cases/user/review-membership-status'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEMBERSHIP_ACCEPTED_EMAIL_SUBJECT, MEMBERSHIP_REJECTED_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import {
  MEMBERSHIP_ACCEPTED_EMAIL_SEND_ERROR,
  MEMBERSHIP_REJECTED_EMAIL_SEND_ERROR,
} from '@messages/loggings/models/user-loggings'
import { MembershipStatusType, UserRoleType } from '@prisma/generated/enums'
import { buildUserProfileImagePath } from '@services/builders/paths/build-user-profile-image-path'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { membershipApprovedHtmlTemplate } from '@templates/user/membership-accepted/membership-accepted-html'
import { membershipApprovedTextTemplate } from '@templates/user/membership-accepted/membership-accepted-text'
import { membershipRejectedHtmlTemplate } from '@templates/user/membership-rejected/membership-rejected-html'
import { membershipRejectedTextTemplate } from '@templates/user/membership-rejected/membership-rejected-text'
import { AdminCannotDeactivateSelfError } from '@use-cases/errors/user/admin-cannot-deactivate-self-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ReviewMembershipStatusUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
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

      const emailInfo = {
        fullName: user.fullName,
        email: user.email,
      }

      if (user.role === UserRoleType.ADMIN && membershipStatusReview === MembershipStatusType.INACTIVE) {
        throw new AdminCannotDeactivateSelfError()
      }

      if (membershipStatusReview === 'REJECTED') {
        await this.usersRepository.delete(user.id)

        const { html, attachments } = membershipRejectedHtmlTemplate(emailInfo)

        await sendEmailEnqueued({
          to: user.email,
          subject: MEMBERSHIP_REJECTED_EMAIL_SUBJECT,
          message: membershipRejectedTextTemplate(emailInfo),
          html,
          attachments,
          logging: {
            errorMessage: MEMBERSHIP_REJECTED_EMAIL_SEND_ERROR,
            context: { userPublicId: user.publicId, userEmail: user.email },
          },
        })

        // Removendo a imagem de perfil do usuário:
        if (user.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
          await deleteFileEnqueued({
            filePath: buildUserProfileImagePath(user.profileImage),
          })
        }

        return user
      }

      if (membershipStatusReview === MembershipStatusType.ACTIVE) {
        await this.usersRepository.update({
          id: user.id,
          data: {
            user: {
              membershipStatus: MembershipStatusType.ACTIVE,
            },
          },
        })

        const { html, attachments } = membershipApprovedHtmlTemplate(emailInfo)

        await sendEmailEnqueued({
          to: user.email,
          subject: MEMBERSHIP_ACCEPTED_EMAIL_SUBJECT,
          message: membershipApprovedTextTemplate(emailInfo),
          html,
          attachments,
          logging: {
            errorMessage: MEMBERSHIP_ACCEPTED_EMAIL_SEND_ERROR,
            context: { userPublicId: user.publicId, userEmail: user.email },
          },
        })

        return user
      }

      const updatedUser = await this.usersRepository.update({
        id: user.id,
        data: {
          user: { membershipStatus: membershipStatusReview },
        },
      })

      return updatedUser
    })

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
