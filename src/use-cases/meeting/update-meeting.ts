import type { UpdateMeetingQuery } from '@custom-types/repository/prisma/meeting/update-meeting-query'
import type {
  UpdateMeetingUseCaseRequest,
  UpdateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/update-meeting'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { deleteFileEnqueued, moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingAgendaUrl } from '@services/builders/urls/build-meeting-agenda-url'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { InvalidMeetingDateError } from '@use-cases/errors/meeting/invalid-meeting-date-error'
import { InvalidPaymentLimitDateError } from '@use-cases/errors/meeting/invalid-payment-limit-date-error'
import { MeetingDateConflictError } from '@use-cases/errors/meeting/meeting-date-conflict-error'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { toDateOnlyUTC } from '@utils/formatters/to-date-only'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,
  ) {}

  async execute({ publicId, body }: UpdateMeetingUseCaseRequest): Promise<UpdateMeetingUseCaseResponse> {
    const today = toDateOnlyUTC(new Date())

    const updateData: UpdateMeetingQuery['data'] = {}

    let newBannerImage: string | undefined
    let newAgenda: string | undefined

    const foundMeeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(publicId),
      error: new MeetingNotFoundError(),
    })

    if (body.bannerImage) {
      const bannerImageSanitized = sanitizeUrlFilename(body.bannerImage)

      newBannerImage =
        bannerImageSanitized && bannerImageSanitized !== foundMeeting.bannerImage ? bannerImageSanitized : undefined
    }

    if (body.agenda) {
      const agendaSanitized = sanitizeUrlFilename(body.agenda)

      newAgenda = agendaSanitized && agendaSanitized !== foundMeeting.agenda ? agendaSanitized : undefined
    }

    if (body.title) {
      updateData.title = body.title
    }

    if (body.description) {
      updateData.description = body.description
    }

    if (body.location) {
      updateData.location = body.location
    }

    if (body.paymentMeetingInfo) {
      if (body.paymentMeetingInfo?.limitDate) {
        if (toDateOnlyUTC(body.paymentMeetingInfo.limitDate) < today) {
          throw new InvalidPaymentLimitDateError()
        }
      }

      updateData.meetingPaymentInfo = body.paymentMeetingInfo
    }

    if (body.dates) {
      for (const date of body.dates) {
        if (toDateOnlyUTC(date) < today) {
          throw new InvalidMeetingDateError()
        }
      }

      const nonRepeatingDates = Array.from<Date>(new Set<Date>(body.dates))

      updateData.lastDate = getArrayMaxDate(nonRepeatingDates)

      if (updateData.lastDate >= today) {
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

    const shouldUpdate = Object.keys(updateData).length > 0

    const meeting = shouldUpdate
      ? await this.meetingsRepository.update({
          id: foundMeeting.id,
          data: updateData,
        })
      : foundMeeting

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

    if (meetingBannerPaths) {
      await moveFileEnqueued(meetingBannerPaths)

      await deleteFileEnqueued({
        filePath: buildMeetingBannerPath(meeting.bannerImage),
      })
    }

    if (meetingAgendaPaths) {
      await moveFileEnqueued(meetingAgendaPaths)

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
