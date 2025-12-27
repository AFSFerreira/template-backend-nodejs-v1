import type {
  CreateNewsletterUseCaseRequest,
  CreateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/create-newsletter'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_CREATED_SUCCESSFULLY } from '@messages/loggings/newsletter-loggings'
import { buildNewsletterTempHtmlPath } from '@services/files/build-newsletter-temp-html-path'
import { deleteFile } from '@utils/files/delete-file'
import { readFile } from '@utils/files/read-file'
import { inject, injectable } from 'tsyringe'
import { NewsletterHtmlReadError } from '../errors/newsletter/newsletter-html-read-error'

@injectable()
export class CreateNewsletterUseCase {
  constructor(
    @inject(tokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute(createNewsletterInput: CreateNewsletterUseCaseRequest): Promise<CreateNewsletterUseCaseResponse> {
    const { contentFileName, ...filteredCreatedNewsletterInput } = createNewsletterInput

    const tempFilePath = buildNewsletterTempHtmlPath(contentFileName)
    const htmlContent = await readFile(tempFilePath)

    if (!htmlContent) {
      throw new NewsletterHtmlReadError()
    }

    const newsletter = await this.newslettersRepository.create({
      ...filteredCreatedNewsletterInput,
      content: htmlContent,
    })

    await deleteFile(tempFilePath)

    logger.info(
      {
        newsletterPublicId: newsletter.publicId,
        title: newsletter.title,
        sequenceNumber: newsletter.sequenceNumber,
      },
      NEWSLETTER_CREATED_SUCCESSFULLY,
    )

    return { newsletter }
  }
}
