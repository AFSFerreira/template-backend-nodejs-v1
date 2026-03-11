import type { SendNewsletterEmailUseCaseRequest } from '@custom-types/use-cases/newsletters/send-newsletter-email'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_EMAIL_FAILED, NEWSLETTER_EMAIL_SUBJECT } from '@messages/emails/newsletter-emails'
import {
  NEWSLETTER_EMAIL_DISPATCH_COMPLETED,
  NEWSLETTER_EMAIL_DISPATCH_STARTED,
} from '@messages/loggings/models/newsletter-loggings'
import { MembershipStatusType } from '@prisma/generated/enums'
import { NewsletterContentRenderService } from '@services/renderers/newsletters/newsletter-content-render-service'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@singleton()
export class SendNewsletterEmailUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(NewsletterContentRenderService)
    private readonly newsletterContentRenderService: NewsletterContentRenderService,
  ) {}

  async execute({ publicId }: SendNewsletterEmailUseCaseRequest): Promise<void> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    const { html, text } = await this.newsletterContentRenderService.render(newsletter, 'email')

    const subject = `${NEWSLETTER_EMAIL_SUBJECT} ${newsletter.sequenceNumber}`

    const usersStream = this.usersRepository.streamAllUsers({
      where: {
        membershipStatus: [MembershipStatusType.ACTIVE],
        wantsNewsletter: true,
      },
    })

    logger.info({ newsletterPublicId: publicId }, NEWSLETTER_EMAIL_DISPATCH_STARTED)

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
    }

    logger.info({ newsletterPublicId: publicId }, NEWSLETTER_EMAIL_DISPATCH_COMPLETED)
  }
}
