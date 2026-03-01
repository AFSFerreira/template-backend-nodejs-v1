import type { SendNewsletterEmailUseCaseRequest } from '@custom-types/use-cases/newsletters/send-newsletter-email'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { setTimeout } from 'node:timers/promises'
import { BATCH_PROCESSING_DELAY } from '@constants/timing-constants'
import { InvalidFileOperationTypeError } from '@jobs/queues/errors/invalid-file-operation-type-error'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_EMAIL_FAILED, NEWSLETTER_EMAIL_SUBJECT } from '@messages/emails/newsletter-emails'
import {
  NEWSLETTER_EMAIL_DISPATCH_COMPLETED,
  NEWSLETTER_EMAIL_DISPATCH_STARTED,
} from '@messages/loggings/models/newsletter-loggings'
import { MembershipStatusType, NewsletterFormatType } from '@prisma/generated/enums'
import { buildNewsletterHtmlPath } from '@services/builders/paths/build-newsletter-html-path'
import { PlainTextService } from '@services/formatters/plain-text-service'
import { NewsletterRenderer } from '@services/renderers/newsletters/newsletter-renderer'
import { generateHTML } from '@tiptap/html'
import { readFile } from '@utils/files/read-file'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { InvalidNewsletterContentError } from '../errors/newsletter/invalid-newsletter-content-error'
import { NewsletterHtmlReadError } from '../errors/newsletter/newsletter-html-read-error'
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

    let html: string
    let text: string

    const newsletterFormat = newsletter.format

    switch (newsletterFormat) {
      case NewsletterFormatType.PROSEMIRROR: {
        const proseContent = ensureExists({
          value: newsletter.proseContent,
          error: new InvalidNewsletterContentError(),
        })

        const bodyContent = generateHTML(proseContent as JSONContent, tiptapConfiguration)

        const activeMeeting = await this.meetingsRepository.findActiveMeeting()

        const rendered = new NewsletterRenderer().render({
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

        html = rendered.html
        text = rendered.text
        break
      }

      case NewsletterFormatType.HTML_FILE: {
        const fileContent = ensureExists({
          value: newsletter.fileContent,
          error: new NewsletterHtmlReadError(),
        })

        html = ensureExists({
          value: await readFile(buildNewsletterHtmlPath(fileContent)),
          error: new NewsletterHtmlReadError(),
        })

        text = PlainTextService.fromHtml(html)
        break
      }

      default: {
        throw new InvalidFileOperationTypeError(newsletterFormat satisfies never)
      }
    }

    const subject = `${NEWSLETTER_EMAIL_SUBJECT} ${newsletter.sequenceNumber}`

    const batchSize = 500

    const usersStream = this.usersRepository.streamAllUsers({
      batchSize,
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

      if (batchCount >= batchSize) {
        await setTimeout(BATCH_PROCESSING_DELAY)
        batchCount = 0
      }
    }

    logger.info({ newsletterPublicId: publicId, totalEmails: emailCount }, NEWSLETTER_EMAIL_DISPATCH_COMPLETED)
  }
}
