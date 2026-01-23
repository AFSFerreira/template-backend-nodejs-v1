import type {
  UpdateMeetingUseCaseRequest,
  UpdateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/update-meeting'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
import { MEETING_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@services/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@services/builders/paths/build-meeting-banner-path'
import { buildMeetingAgendaUrl } from '@services/builders/urls/build-meeting-agenda-url'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { moveFile } from '@services/files/move-file'
import { MeetingAgendaPersistError } from '@use-cases/errors/meeting/meeting-agenda-persist-error'
import { MeetingBannerPersistError } from '@use-cases/errors/meeting/meeting-banner-persist-error'
import { MeetingDateConflictError } from '@use-cases/errors/meeting/meeting-date-conflict-error'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.infra.database)
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
          const nonRepeatingDates = Array.from<Date>(new Set<Date>(body.dates))

          updateData.lastDate = getArrayMaxDate(nonRepeatingDates)

          const activeMeeting = await this.meetingsRepository.findActiveMeeting()

          if (activeMeeting && updateData.lastDate >= activeMeeting.lastDate) {
            throw new MeetingDateConflictError()
          }

          updateData.MeetingDate = {
            deleteMany: {},
            create: nonRepeatingDates.map((date) => ({ date })),
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

        return { meeting: updatedMeeting }
      } catch (error) {
        // Enfileirando a restauração dos arquivos incorretamente persistidos:
        if (body.bannerImage) {
          try {
            fileQueue.add('move', {
              type: 'move',
              oldFilePath: buildMeetingBannerPath(body.bannerImage),
              newFilePath: buildTempMeetingBannerPath(body.bannerImage),
            })
          } catch (fileError) {
            logError({
              error: fileError,
              message: FAILED_TO_ENQUEUE_FILE_JOB,
            })
          }
        }

        if (body.agenda) {
          try {
            fileQueue.add('move', {
              type: 'move',
              oldFilePath: buildMeetingAgendaPath(body.agenda),
              newFilePath: buildTempMeetingAgendaPath(body.agenda),
            })
          } catch (fileError) {
            logError({
              error: fileError,
              message: FAILED_TO_ENQUEUE_FILE_JOB,
            })
          }
        }

        throw error
      }
    })

    // Enfileirando a remoção da imagem antiga somente após persistir a nova e atualizar a reunião:
    if (body.bannerImage && body.bannerImage !== meeting.bannerImage) {
      try {
        fileQueue.add('delete', {
          type: 'delete',
          filePath: buildMeetingBannerPath(meeting.bannerImage),
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_FILE_JOB,
        })
      }
    }

    // Enfileirando a remoção da agenda antiga somente após persistir a nova e atualizar a reunião:
    if (body.agenda && body.agenda !== meeting.agenda) {
      try {
        fileQueue.add('delete', {
          type: 'delete',
          filePath: buildMeetingAgendaPath(meeting.agenda),
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_FILE_JOB,
        })
      }
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
