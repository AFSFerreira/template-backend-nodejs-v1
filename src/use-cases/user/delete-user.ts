import type { DeleteUserUseCaseRequest, DeleteUserUseCaseResponse } from '@custom-types/use-cases/user/delete-user'
import type { UsersRepository } from '@repositories/users-repository'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_DELETION_EMAIL_SUBJECT } from '@messages/emails/user-emails'
import { USER_DELETION_EMAIL_SEND_ERROR, USER_DELETION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { DeleteUserRenderer } from '@services/renderers/user/emails/delete-user-renderer'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
export class DeleteUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(DeleteUserRenderer)
    private readonly deleteUserRenderer: DeleteUserRenderer,
  ) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const deletedUser = ensureExists({
      value: await this.usersRepository.findById(id),
      error: new UserNotFoundError(),
    })

    await this.usersRepository.delete(deletedUser.id)

    const { html, text, attachments } = await this.deleteUserRenderer.render(
      {
        fullName: deletedUser.fullName,
        email: deletedUser.email,
      },
      { minify: 'email' },
    )

    await sendEmailEnqueued({
      to: deletedUser.email,
      subject: USER_DELETION_EMAIL_SUBJECT,
      message: text,
      html,
      attachments,
      logging: {
        errorMessage: USER_DELETION_EMAIL_SEND_ERROR,
        context: { userId: deletedUser.id, userEmail: deletedUser.email },
      },
    })

    logger.info(
      {
        id: deletedUser.id,
        email: deletedUser.email,
      },
      USER_DELETION_SUCCESSFUL,
    )

    return {}
  }
}
