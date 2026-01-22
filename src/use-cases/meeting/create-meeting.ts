import type {
  CreateMeetingUseCaseRequest,
  CreateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/create-meeting'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_CREATION_ERROR, MEETING_CREATION_SUCCESSFUL } from '@messages/loggings/meeting-loggings'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingAgendaUrl } from '@services/builders/urls/build-meeting-agenda-url'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { moveFile } from '@services/files/move-file'
import { moveFiles } from '@services/files/move-files'
import { MeetingAgendaPersistError } from '@use-cases/errors/meeting/meeting-agenda-persist-error'
import { MeetingBannerPersistError } from '@use-cases/errors/meeting/meeting-banner-persist-error'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureExists } from '@utils/validators/ensure'
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
    try {
      ensureExists({
        value: await moveFile({
          oldFilePath: buildTempMeetingBannerPath(data.bannerImage),
          newFilePath: buildMeetingBannerPath(data.bannerImage),
        }),
        error: new MeetingBannerPersistError(),
      })

      ensureExists({
        value: await moveFile({
          oldFilePath: buildTempMeetingAgendaPath(data.agenda),
          newFilePath: buildMeetingAgendaPath(data.agenda),
        }),
        error: new MeetingAgendaPersistError(),
      })

      const nonRepeatingDates = Array.from<Date>(new Set<Date>(data.dates))

      const { meeting } = await this.dbContext.runInTransaction(async () => {
        const meeting = await this.meetingsRepository.create({
          title: data.title,
          bannerImage: data.bannerImage,
          agenda: data.agenda,
          description: data.description,
          location: data.location,
          lastDate: getArrayMaxDate(nonRepeatingDates),
          dates: nonRepeatingDates,
          paymentInfo: data.paymentInfo,
        })

        return { meeting }
      })

      logger.info({ meetingId: meeting.publicId }, MEETING_CREATION_SUCCESSFUL)

      return {
        meeting: {
          ...meeting,
          agenda: buildMeetingAgendaUrl(meeting.agenda),
          bannerImage: buildMeetingBannerUrl(meeting.bannerImage),
        },
      }
    } catch (error) {
      logError({ error, message: MEETING_CREATION_ERROR })

      // Restaurando os arquivos incorretamente persistidos:
      await moveFiles([
        {
          oldFilePath: buildMeetingBannerPath(data.bannerImage),
          newFilePath: buildTempMeetingBannerPath(data.bannerImage),
        },
        {
          oldFilePath: buildMeetingAgendaPath(data.agenda),
          newFilePath: buildTempMeetingAgendaPath(data.agenda),
        },
      ])

      throw error
    }
  }
}
