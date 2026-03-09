import type {
  CreateMeetingUseCaseRequest,
  CreateMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/create-meeting'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_CREATION_SUCCESSFUL } from '@messages/loggings/models/meeting-loggings'
import { hasValidMxRecord } from '@services/validators/validate-mx-record'
import { ActiveMeetingAlreadyExistsError } from '@use-cases/errors/meeting/active-meeting-already-exists-error'
import { InvalidPaymentLimitDateError } from '@use-cases/errors/meeting/invalid-payment-limit-date-error'
import { buildMeetingAgendaPath, buildTempMeetingAgendaPath } from '@utils/builders/paths/build-meeting-agenda-path'
import { buildMeetingBannerPath, buildTempMeetingBannerPath } from '@utils/builders/paths/build-meeting-banner-path'
import { toDateOnlyUTC } from '@utils/formatters/to-date-only'
import { getArrayMaxDate } from '@utils/generics/get-array-max-date'
import { ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { InvalidEmailDomainError } from '../errors/user/invalid-email-domain-error'

@injectable()
export class CreateMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,
  ) {}

  async execute(data: CreateMeetingUseCaseRequest): Promise<CreateMeetingUseCaseResponse> {
    const isValidBillingEmailDomain = await hasValidMxRecord(data.meetingPaymentInfo.billingEmail)

    if (!isValidBillingEmailDomain) {
      throw new InvalidEmailDomainError()
    }

    const nonRepeatingDates = Array.from<Date>(new Set<Date>(data.dates))

    const firstMeetingDayValue = Math.min(...nonRepeatingDates.map((date) => date.valueOf()))

    const firstMeetingDay = new Date(firstMeetingDayValue)

    if (toDateOnlyUTC(data.meetingPaymentInfo.limitDate) < toDateOnlyUTC(firstMeetingDay)) {
      throw new InvalidPaymentLimitDateError()
    }

    ensureNotExists({
      value: await this.meetingsRepository.findActiveMeeting(),
      error: new ActiveMeetingAlreadyExistsError(),
    })

    const createdMeeting = await this.meetingsRepository.create({
      title: data.title,
      bannerImage: data.bannerImage,
      agenda: data.agenda,
      description: data.description,
      location: data.location,
      lastDate: getArrayMaxDate(nonRepeatingDates),
      dates: nonRepeatingDates,
      meetingPaymentInfo: data.meetingPaymentInfo,
    })

    const meetingBannerPaths = {
      oldFilePath: buildTempMeetingBannerPath(data.bannerImage),
      newFilePath: buildMeetingBannerPath(data.bannerImage),
    }

    const meetingAgendaPaths = {
      oldFilePath: buildTempMeetingAgendaPath(data.agenda),
      newFilePath: buildMeetingAgendaPath(data.agenda),
    }

    await moveFileEnqueued(meetingBannerPaths)

    await moveFileEnqueued(meetingAgendaPaths)

    logger.info({ meetingId: createdMeeting.publicId }, MEETING_CREATION_SUCCESSFUL)

    return { meeting: createdMeeting }
  }
}
