import type {
  DeleteUserUseCaseRequest,
  DeleteUserUseCaseResponse,
} from '@custom-types/use-cases/user/delete-own-account'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_DELETION_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import { USER_DELETION_EMAIL_SEND_ERROR, USER_DELETION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { UserRoleType } from '@prisma/generated/enums'
import { buildUserProfileImagePath } from '@services/builders/paths/build-user-profile-image-path'
import { deleteUserHtmlTemplate } from '@templates/user/delete-user/delete-user-html'
import { deleteUserTextTemplate } from '@templates/user/delete-user/delete-user-text'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { AdminCannotDeleteSelfError } from '../errors/user/admin-cannot-delete-self-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ publicId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const deletedUser = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    if (deletedUser.role === UserRoleType.ADMIN) {
      throw new AdminCannotDeleteSelfError()
    }

    await this.usersRepository.delete(deletedUser.id)

    const emailInfo = {
      fullName: deletedUser.fullName,
      email: deletedUser.email,
    }

    const { html, attachments } = deleteUserHtmlTemplate(emailInfo)

    await sendEmailEnqueued({
      to: deletedUser.email,
      subject: USER_DELETION_EMAIL_SUBJECT,
      message: deleteUserTextTemplate(emailInfo),
      html,
      attachments,
      logging: {
        errorMessage: USER_DELETION_EMAIL_SEND_ERROR,
        context: { userPublicId: deletedUser.publicId, userEmail: deletedUser.email },
      },
    })

    // Enfileirando a remoção da antiga foto de perfil do usuário:
    if (deletedUser.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
      await deleteFileEnqueued({
        filePath: buildUserProfileImagePath(deletedUser.profileImage),
      })
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
