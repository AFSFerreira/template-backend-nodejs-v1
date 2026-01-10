import type {
  CreateMeetingUseCaseRequest,
  CreateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/create-meeting'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_CREATION_ERROR, MEETING_CREATION_SUCCESSFUL } from '@messages/loggings/meeting-loggings'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { moveFile } from '@services/files/move-file'
import { MeetingAgendaPersistError } from '@use-cases/errors/meeting/meeting-agenda-persist-error'
import { MeetingBannerPersistError } from '@use-cases/errors/meeting/meeting-banner-persist-error'
import { deleteFiles } from '@utils/files/delete-files'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateMeetingUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(data: CreateMeetingUseCaseRequest): Promise<CreateMeetingUseCaseResponse> {
    const persistedBannerPath = await moveFile({
      oldFilePath: buildTempMeetingBannerPath(data.bannerImage),
      newFilePath: buildMeetingBannerPath(data.bannerImage),
    })

    const persistedAgendaPath = await moveFile({
      oldFilePath: buildTempMeetingAgendaPath(data.agenda),
      newFilePath: buildMeetingAgendaPath(data.agenda),
    })

    try {
      if (!persistedBannerPath) {
        throw new MeetingBannerPersistError()
      }

      if (!persistedAgendaPath) {
        throw new MeetingAgendaPersistError()
      }

      const { meeting } = await this.dbContext.runInTransaction(async () => {
        const meeting = await this.meetingsRepository.create({
          title: data.title,
          bannerImage: data.bannerImage,
          agenda: data.agenda,
          description: data.description,
          location: data.location,
          lastDate: getArrayMaxDate(data.dates),
          dates: data.dates,
          paymentInfo: data.paymentInfo,
        })

        return { meeting }
      })

      logger.info({ meetingId: meeting.publicId }, MEETING_CREATION_SUCCESSFUL)

      return {
        meeting: {
          ...meeting,
          bannerImage: buildMeetingBannerUrl(meeting.bannerImage),
        },
      }
    } catch (error) {
      logError({ error, message: MEETING_CREATION_ERROR })

      await deleteFiles([persistedBannerPath ?? '', persistedAgendaPath ?? ''])

      throw error
    }
  }
}
