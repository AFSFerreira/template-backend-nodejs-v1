import type {
  DeleteMeetingUseCaseRequest,
  DeleteMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/delete-meeting'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_DELETED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { buildMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,
  ) {}

  async execute({ publicId }: DeleteMeetingUseCaseRequest): Promise<DeleteMeetingUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(publicId),
      error: new MeetingNotFoundError(),
    })

    await this.meetingsRepository.delete(meeting.id)

    // Enfileirando a remoção da imagem de banner da reunião:
    await deleteFileEnqueued({
      filePath: buildMeetingBannerPath(meeting.bannerImage),
    })

    // Enfileirando a remoção do programa da banner da reunião:
    await deleteFileEnqueued({
      filePath: buildMeetingAgendaPath(meeting.agenda),
    })

    logger.info({ meetingId: meeting.publicId }, MEETING_DELETED_SUCCESSFULLY)

    return {}
  }
}
