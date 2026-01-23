import type {
  DeleteMeetingUseCaseRequest,
  DeleteMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/delete-meeting'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_DELETED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteMeetingUseCaseRequest): Promise<DeleteMeetingUseCaseResponse> {
    const { meeting } = await this.dbContext.runInTransaction(async () => {
      const meeting = ensureExists({
        value: await this.meetingsRepository.findByPublicId(publicId),
        error: new MeetingNotFoundError(),
      })

      await this.meetingsRepository.delete(meeting.id)

      return { meeting }
    })

    logger.info({ meetingId: meeting.publicId }, MEETING_DELETED_SUCCESSFULLY)

    return {}
  }
}
