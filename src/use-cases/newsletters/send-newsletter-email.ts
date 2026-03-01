import type { SendNewsletterEmailUseCaseRequest } from '@custom-types/use-cases/newsletters/send-newsletter-email'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { setTimeout } from 'node:timers/promises'
import { BATCH_PROCESSING_DELAY } from '@constants/timing-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_EMAIL_FAILED, NEWSLETTER_EMAIL_SUBJECT } from '@messages/emails/newsletter-emails'
import {
  NEWSLETTER_EMAIL_DISPATCH_COMPLETED,
  NEWSLETTER_EMAIL_DISPATCH_STARTED,
} from '@messages/loggings/models/newsletter-loggings'
import { MembershipStatusType } from '@prisma/generated/enums'
import { NewsletterRenderer } from '@services/renderers/newsletters/newsletter-renderer'
import { generateHTML } from '@tiptap/html'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { InvalidNewsletterContentError } from '../errors/newsletter/invalid-newsletter-content-error'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@injectable()
export class SendNewsletterEmailUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ publicId }: SendNewsletterEmailUseCaseRequest): Promise<void> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    const proseContent = ensureExists({
      value: newsletter.proseContent,
      error: new InvalidNewsletterContentError(),
    })

    const bodyContent = generateHTML(proseContent as JSONContent, tiptapConfiguration)

    const activeMeeting = await this.meetingsRepository.findActiveMeeting()

    const { html, text } = new NewsletterRenderer().render({
      newsletterInfo: {
        htmlBody: bodyContent,
        createdAt: newsletter.createdAt,
        editionNumber: newsletter.editionNumber,
        sequenceNumber: newsletter.sequenceNumber,
        volume: newsletter.volume,
      },
      meetingInfo: activeMeeting
        ? {
            title: activeMeeting.title,
            location: activeMeeting.location,
            dates: activeMeeting.MeetingDate.map((meetingDate) => meetingDate.date),
          }
        : undefined,
    })

    const subject = `${NEWSLETTER_EMAIL_SUBJECT} ${newsletter.sequenceNumber}`

    const usersStream = this.usersRepository.streamAllUsers({
      where: {
        membershipStatus: MembershipStatusType.ACTIVE,
        wantsNewsletter: true,
      },
    })

    logger.info({ newsletterPublicId: publicId }, NEWSLETTER_EMAIL_DISPATCH_STARTED)

    let emailCount = 0
    let batchCount = 0

    for await (const user of usersStream) {
      await sendEmailEnqueued({
        to: user.email,
        subject,
        message: text,
        html,
        logging: {
          errorMessage: NEWSLETTER_EMAIL_FAILED,
          context: { newsletterPublicId: publicId, userPublicId: user.publicId },
        },
      })

      emailCount++
      batchCount++

      if (batchCount >= 500) {
        await setTimeout(BATCH_PROCESSING_DELAY)
        batchCount = 0
      }
    }

    logger.info({ newsletterPublicId: publicId, totalEmails: emailCount }, NEWSLETTER_EMAIL_DISPATCH_COMPLETED)
  }
}
