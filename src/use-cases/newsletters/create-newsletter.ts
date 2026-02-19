import type {
  CreateNewsletterUseCaseRequest,
  CreateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/create-newsletter'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_CREATED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import {
  buildNewsletterHtmlPath,
  buildNewsletterTempHtmlPath,
} from '@services/builders/paths/build-newsletter-html-path'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'
import { ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterAlreadyExistsError } from '../errors/newsletter/newsletter-already-exists-error'

@injectable()
export class CreateNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute(createNewsletterInput: CreateNewsletterUseCaseRequest): Promise<CreateNewsletterUseCaseResponse> {
    const { contentFilename, ...filteredCreatedNewsletterInput } = createNewsletterInput

    ensureNotExists({
      value: await this.newslettersRepository.findConflictingNewsletter({
        editionNumber: createNewsletterInput.editionNumber,
        sequenceNumber: createNewsletterInput.sequenceNumber,
        volume: createNewsletterInput.volume,
      }),
      error: new NewsletterAlreadyExistsError(),
    })

    const newsletter = await this.newslettersRepository.create({
      ...filteredCreatedNewsletterInput,
      content: contentFilename,
    })

    const newsletterHtmlPaths = {
      oldFilePath: buildNewsletterTempHtmlPath(contentFilename),
      newFilePath: buildNewsletterHtmlPath(contentFilename),
    }

    await moveFileEnqueued(newsletterHtmlPaths)

    logger.info(
      {
        newsletterPublicId: newsletter.publicId,
        sequenceNumber: newsletter.sequenceNumber,
      },
      NEWSLETTER_CREATED_SUCCESSFULLY,
    )

    return {
      newsletter: {
        ...newsletter,
        content: buildNewsletterHtmlUrl(newsletter.publicId),
      },
    }
  }
}
