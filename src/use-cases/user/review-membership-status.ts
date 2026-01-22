import type {
  ReviewMembershipStatusUseCaseRequest,
  ReviewMembershipStatusUseCaseResponse,
} from '@custom-types/use-cases/user/review-membership-status'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MEMBERSHIP_REJECTED_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import { MEMBERSHIP_REJECTED_EMAIL_SEND_ERROR } from '@messages/loggings/user-loggings'
import { MembershipStatusType } from '@prisma/client'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { sendEmail } from '@services/external/send-email'
import { membershipRejectedHtmlTemplate } from '@templates/user/membership-rejected/membership-rejected-html'
import { membershipRejectedTextTemplate } from '@templates/user/membership-rejected/membership-rejected-text'
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
        await this.usersRepository.delete(user.id)

        const emailInfo = {
          fullName: user.fullName,
          email: user.email,
        }

        try {
          const { html, attachments } = membershipRejectedHtmlTemplate(emailInfo)

          await sendEmail({
            to: user.email,
            subject: MEMBERSHIP_REJECTED_EMAIL_SUBJECT,
            message: membershipRejectedTextTemplate(emailInfo),
            html,
            attachments,
          })
        } catch (error) {
          logError({
            error,
            context: { userPublicId: user.publicId, userEmail: user.email },
            message: MEMBERSHIP_REJECTED_EMAIL_SEND_ERROR,
          })
        }

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
