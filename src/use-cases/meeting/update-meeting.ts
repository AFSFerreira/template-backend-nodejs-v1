import type {
  UpdateMeetingUseCaseRequest,
  UpdateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/update-meeting'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_UPDATED_SUCCESSFULLY } from '@messages/loggings/meeting-loggings'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { moveFile } from '@services/files/move-file'
import { MeetingAgendaPersistError } from '@use-cases/errors/meeting/meeting-agenda-persist-error'
import { MeetingBannerPersistError } from '@use-cases/errors/meeting/meeting-banner-persist-error'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateMeetingUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, body }: UpdateMeetingUseCaseRequest): Promise<UpdateMeetingUseCaseResponse> {
    const { meeting } = await this.dbContext.runInTransaction(async () => {
      try {
        const meeting = ensureExists({
          value: await this.meetingsRepository.findByPublicId(publicId),
          error: new MeetingNotFoundError(),
        })

        const updateData: Prisma.MeetingUpdateInput = {}

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
          updateData.lastDate = getArrayMaxDate(body.dates)
          updateData.MeetingDate = {
            deleteMany: {},
            create: body.dates.map((date) => ({ date })),
          }
        }

        if (body.paymentInfo) {
          updateData.MeetingPaymentInfo = {
            upsert: {
              create: {
                value: body.paymentInfo.value,
                limitDate: body.paymentInfo.limitDate,
              },
              update: {
                value: body.paymentInfo.value,
                limitDate: body.paymentInfo.limitDate,
              },
            },
          }
        }

        if (body.bannerImage && body.bannerImage !== meeting.bannerImage) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildTempMeetingBannerPath(body.bannerImage),
              newFilePath: buildMeetingBannerPath(body.bannerImage),
            }),
            error: new MeetingBannerPersistError(),
          })

          updateData.bannerImage = body.bannerImage
        }

        if (body.agenda && body.agenda !== meeting.agenda) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildTempMeetingAgendaPath(body.agenda),
              newFilePath: buildMeetingAgendaPath(body.agenda),
            }),
            error: new MeetingAgendaPersistError(),
          })

          updateData.agenda = body.agenda
        }

        const updatedMeeting = await this.meetingsRepository.update({
          id: meeting.id,
          data: updateData,
        })

        // Remove a imagem antiga somente após persistir a nova e atualizar a reunião:
        if (body.bannerImage && body.bannerImage !== meeting.bannerImage) {
          await deleteFile(buildMeetingBannerPath(meeting.bannerImage))
        }

        // Remove a agenda antiga somente após persistir a nova e atualizar a reunião:
        if (body.agenda && body.agenda !== meeting.agenda) {
          await deleteFile(buildMeetingAgendaPath(meeting.agenda))
        }

        return { meeting: updatedMeeting }
      } catch (error) {
        // Restaurando os arquivos incorretamente persistidos:
        if (body.bannerImage) {
          await moveFile({
            oldFilePath: buildMeetingBannerPath(body.bannerImage),
            newFilePath: buildTempMeetingBannerPath(body.bannerImage),
          })
        }

        if (body.agenda) {
          await moveFile({
            oldFilePath: buildMeetingAgendaPath(body.agenda),
            newFilePath: buildTempMeetingAgendaPath(body.agenda),
          })
        }

        throw error
      }
    })

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
        bannerImage: buildMeetingBannerUrl(meeting.bannerImage),
      },
    }
  }
}
