import type {
  UpdateMeetingUseCaseRequest,
  UpdateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/update-meeting'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { PaymentInfoRepository } from '@repositories/payment-info-repository'
import { deleteFileEnqueued, moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingAgendaUrl } from '@services/builders/urls/build-meeting-agenda-url'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { InactiveMeetingPaymentInfoUpdateForbiddenError } from '@use-cases/errors/meeting/inactive-meeting-payment-info-update-forbidden-error'
import { MeetingAgendaPersistError } from '@use-cases/errors/meeting/meeting-agenda-persist-error'
import { MeetingBannerPersistError } from '@use-cases/errors/meeting/meeting-banner-persist-error'
import { MeetingDateConflictError } from '@use-cases/errors/meeting/meeting-date-conflict-error'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { PaymentInfoNotFoundError } from '@use-cases/errors/payment-info/payment-info-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.paymentInfo)
    private readonly paymentInfoRepository: PaymentInfoRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, body }: UpdateMeetingUseCaseRequest): Promise<UpdateMeetingUseCaseResponse> {
    const updateData: Prisma.MeetingUpdateInput = {}

    let newBannerImage: string | undefined
    let newAgenda: string | undefined

    const { meeting } = await this.dbContext.runInTransaction(async () => {
      const meeting = ensureExists({
        value: await this.meetingsRepository.findByPublicId(publicId),
        error: new MeetingNotFoundError(),
      })

      if (body.bannerImage) {
        const bannerImageSanitized = sanitizeUrlFilename(body.bannerImage)

        newBannerImage =
          bannerImageSanitized && bannerImageSanitized !== meeting.bannerImage ? bannerImageSanitized : undefined
      }

      if (body.agenda) {
        const agendaSanitized = sanitizeUrlFilename(body.agenda)

        newAgenda = agendaSanitized && agendaSanitized !== meeting.agenda ? agendaSanitized : undefined
      }

      const activeMeeting = await this.meetingsRepository.findActiveMeeting()

      if (body.title) {
        updateData.title = body.title
      }

      if (body.description) {
        updateData.description = body.description
      }

      if (body.location) {
        updateData.location = body.location
      }

      if (body.dates) {
        const nonRepeatingDates = Array.from<Date>(new Set<Date>(body.dates))

        updateData.lastDate = getArrayMaxDate(nonRepeatingDates)

        if (activeMeeting && updateData.lastDate >= activeMeeting.lastDate) {
          throw new MeetingDateConflictError()
        }

        updateData.MeetingDate = {
          deleteMany: {},
          create: nonRepeatingDates.map((date) => ({ date })),
        }
      }

      if (newBannerImage) {
        updateData.bannerImage = newBannerImage
      }

      if (newAgenda) {
        updateData.agenda = newAgenda
      }

      if (body.paymentInfo) {
        if (activeMeeting && activeMeeting.id !== meeting.id) {
          throw new InactiveMeetingPaymentInfoUpdateForbiddenError()
        }

        const paymentInfo = ensureExists({
          value: await this.paymentInfoRepository.getPaymentInfo(),
          error: new PaymentInfoNotFoundError(),
        })

        await this.paymentInfoRepository.update({
          id: paymentInfo?.id,
          data: body.paymentInfo,
        })
      }

      const updatedMeeting = await this.meetingsRepository.update({
        id: meeting.id,
        data: updateData,
      })

      return { meeting: updatedMeeting }
    })

    const meetingBannerPaths = newBannerImage
      ? {
          oldFilePath: buildTempMeetingBannerPath(newBannerImage),
          newFilePath: buildMeetingBannerPath(newBannerImage),
        }
      : undefined

    const meetingAgendaPaths = newAgenda
      ? {
          oldFilePath: buildTempMeetingAgendaPath(newAgenda),
          newFilePath: buildMeetingAgendaPath(newAgenda),
        }
      : undefined

    try {
      if (meetingBannerPaths) {
        ensureExists({
          value: await moveFileEnqueued(meetingBannerPaths),
          error: new MeetingBannerPersistError(),
        })

        await deleteFileEnqueued({
          filePath: buildMeetingBannerPath(meeting.bannerImage),
        })
      }

      if (meetingAgendaPaths) {
        ensureExists({
          value: await moveFileEnqueued(meetingAgendaPaths),
          error: new MeetingAgendaPersistError(),
        })

        await deleteFileEnqueued({
          filePath: buildMeetingAgendaPath(meeting.agenda),
        })
      }
    } catch (error) {
      // Enfileirando a restauração dos arquivos incorretamente persistidos:
      if (meetingBannerPaths) {
        await moveFileEnqueued({
          oldFilePath: meetingBannerPaths.newFilePath,
          newFilePath: meetingBannerPaths.oldFilePath,
        })
      }

      if (meetingAgendaPaths) {
        await moveFileEnqueued({
          oldFilePath: meetingAgendaPaths.newFilePath,
          newFilePath: meetingAgendaPaths.oldFilePath,
        })
      }

      throw error
    }

    logger.info(
      {
        meetingId: meeting.publicId,
        title: meeting.title,
      },
      MEETING_UPDATED_SUCCESSFULLY,
    )

    return {
      meeting: {
        ...meeting,
        agenda: buildMeetingAgendaUrl(meeting.agenda),
        bannerImage: buildMeetingBannerUrl(meeting.bannerImage),
      },
    }
  }
}
