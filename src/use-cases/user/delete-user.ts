import type {
  DeleteUserUseCaseRequest,
  DeleteUserUseCaseResponse,
} from '@custom-types/use-cases/user/delete-own-account'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { emailQueue } from '@jobs/queues/definitions/email-queue'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_DELETION_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import { FAILED_TO_ENQUEUE_EMAIL_JOB } from '@messages/loggings/jobs/queues/emails'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
import { USER_DELETION_EMAIL_SEND_ERROR, USER_DELETION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { UserRoleType } from '@prisma/client'
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

    @inject(tsyringeTokens.infra.database)
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

      emailQueue.add(bullmqTokens.tasksNames.email, {
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
    } catch (error) {
      logError({
        error,
        message: FAILED_TO_ENQUEUE_EMAIL_JOB,
      })
    }

    // Enfileirando a remoção da antiga foto de perfil do usuário:
    if (deletedUser.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
      try {
        fileQueue.add('delete', {
          type: 'delete',
          filePath: buildUserProfileImagePath(deletedUser.profileImage),
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_FILE_JOB,
        })
      }
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
