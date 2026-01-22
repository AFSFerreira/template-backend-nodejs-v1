import type {
  DeleteUserUseCaseRequest,
  DeleteUserUseCaseResponse,
} from '@custom-types/use-cases/user/delete-own-account'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { USER_DELETION_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import { USER_DELETION_EMAIL_SEND_ERROR, USER_DELETION_SUCCESSFUL } from '@messages/loggings/user-loggings'
import { UserRoleType } from '@prisma/client'
import { buildUserProfileImagePath } from '@services/builders/paths/build-user-profile-image-path'
import { sendEmail } from '@services/external/send-email'
import { deleteUserHtmlTemplate } from '@templates/user/delete-user/delete-user-html'
import { deleteUserTextTemplate } from '@templates/user/delete-user/delete-user-text'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { AdminCannotDeleteSelfError } from '../errors/user/admin-cannot-delete-self-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const { deletedUser } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(publicId),
        error: new UserNotFoundError(),
      })

      if (user.role === UserRoleType.ADMIN) {
        throw new AdminCannotDeleteSelfError()
      }

      await this.usersRepository.delete(user.id)

      return { deletedUser: user }
    })

    const emailInfo = {
      fullName: deletedUser.fullName,
      email: deletedUser.email,
    }

    try {
      const { html, attachments } = deleteUserHtmlTemplate(emailInfo)

      await sendEmail({
        to: deletedUser.email,
        subject: USER_DELETION_EMAIL_SUBJECT,
        message: deleteUserTextTemplate(emailInfo),
        html,
        attachments,
      })
    } catch (error) {
      logError({
        error,
        context: { userPublicId: deletedUser.publicId, userEmail: deletedUser.email },
        message: USER_DELETION_EMAIL_SEND_ERROR,
      })
    }

    // Removendo a antiga foto de perfil do usuário:
    if (deletedUser.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
      await deleteFile(buildUserProfileImagePath(deletedUser.profileImage))
    }

    logger.info(
      {
        publicId: deletedUser.publicId,
        email: deletedUser.email,
      },
      USER_DELETION_SUCCESSFUL,
    )

    return {}
  }
}
