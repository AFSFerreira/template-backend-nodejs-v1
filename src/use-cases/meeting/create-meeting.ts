import type {
  CreateMeetingUseCaseRequest,
  CreateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/create-meeting'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { PaymentInfoRepository } from '@repositories/payment-info-repository'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_CREATION_ERROR, MEETING_CREATION_SUCCESSFUL } from '@messages/loggings/models/meeting-loggings'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingAgendaUrl } from '@services/builders/urls/build-meeting-agenda-url'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { moveFile } from '@services/files/move-file'
import { moveFiles } from '@services/files/move-files'
import { ActiveMeetingAlreadyExistsError } from '@use-cases/errors/meeting/active-meeting-already-exists-error'
import { MeetingAgendaPersistError } from '@use-cases/errors/meeting/meeting-agenda-persist-error'
import { MeetingBannerPersistError } from '@use-cases/errors/meeting/meeting-banner-persist-error'
import { PaymentInfoNotFoundError } from '@use-cases/errors/payment-info/payment-info-not-found-error'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.paymentInfo)
    private readonly paymentInfo: PaymentInfoRepository,

    @inject(tsyringeTokens.infra.database)
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
        ensureNotExists({
          value: await this.meetingsRepository.findActiveMeeting(),
          error: new ActiveMeetingAlreadyExistsError(),
        })

        const paymentInfo = ensureExists({
          value: await this.paymentInfo.getPaymentInfo(),
          error: new PaymentInfoNotFoundError(),
        })

        await this.paymentInfo.update({
          id: paymentInfo.id,
          data: data.paymentInfo,
        })

        const meeting = await this.meetingsRepository.create({
          title: data.title,
          bannerImage: data.bannerImage,
          agenda: data.agenda,
          description: data.description,
          location: data.location,
          lastDate: getArrayMaxDate(nonRepeatingDates),
          dates: nonRepeatingDates,
          meetingPaymentInfo: data.meetingPaymentInfo,
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
