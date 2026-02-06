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
import { moveFile } from '@services/files/move-file'
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

    const bannerImageSanitized = sanitizeUrlFilename(body.bannerImage)
    const agendaSanitized = sanitizeUrlFilename(body.agenda)

    const { meeting } = await this.dbContext.runInTransaction(async () => {
      try {
        const meeting = ensureExists({
          value: await this.meetingsRepository.findByPublicId(publicId),
          error: new MeetingNotFoundError(),
        })

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

        if (body.bannerImage && bannerImageSanitized && bannerImageSanitized !== meeting.bannerImage) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildTempMeetingBannerPath(bannerImageSanitized),
              newFilePath: buildMeetingBannerPath(bannerImageSanitized),
            }),
            error: new MeetingBannerPersistError(),
          })

          updateData.bannerImage = bannerImageSanitized
        }

        if (body.agenda && agendaSanitized && agendaSanitized !== meeting.agenda) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildTempMeetingAgendaPath(agendaSanitized),
              newFilePath: buildMeetingAgendaPath(agendaSanitized),
            }),
            error: new MeetingAgendaPersistError(),
          })

          updateData.agenda = agendaSanitized
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
      } catch (error) {
        // Enfileirando a restauração dos arquivos incorretamente persistidos:
        if (body.bannerImage && bannerImageSanitized && bannerImageSanitized !== meeting.bannerImage) {
          await moveFileEnqueued({
            oldFilePath: buildMeetingBannerPath(bannerImageSanitized),
            newFilePath: buildTempMeetingBannerPath(bannerImageSanitized),
          })
        }

        if (body.agenda && agendaSanitized && agendaSanitized !== meeting.agenda) {
          await moveFileEnqueued({
            oldFilePath: buildMeetingAgendaPath(agendaSanitized),
            newFilePath: buildTempMeetingAgendaPath(agendaSanitized),
          })
        }

        throw error
      }
    })

    // Enfileirando a remoção da imagem antiga somente após persistir a nova e atualizar a reunião:
    if (body.bannerImage && bannerImageSanitized && bannerImageSanitized !== meeting.bannerImage) {
      await deleteFileEnqueued({
        filePath: buildMeetingBannerPath(meeting.bannerImage),
      })
    }

    // Enfileirando a remoção da agenda antiga somente após persistir a nova e atualizar a reunião:
    if (body.agenda && agendaSanitized && agendaSanitized !== meeting.agenda) {
      await deleteFileEnqueued({
        filePath: buildMeetingAgendaPath(meeting.agenda),
      })
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
