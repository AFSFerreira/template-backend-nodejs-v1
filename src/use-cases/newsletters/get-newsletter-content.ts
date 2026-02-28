import type {
  GetNewsletterHtmlContentUseCaseRequest,
  GetNewsletterHtmlContentUseCaseResponse,
} from '@custom-types/use-cases/newsletters/get-newsletter-content'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { JSONContent } from '@tiptap/core'
import { InvalidFileOperationTypeError } from '@jobs/queues/errors/invalid-file-operation-type-error'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NewsletterFormatType } from '@prisma/generated/enums'
import { buildNewsletterHtmlPath } from '@services/builders/paths/build-newsletter-html-path'
import { getNewsletterHTMLCached, setNewsletterHTMLCache } from '@services/cache/newsletters-html-cache'
import { NewsletterRenderer } from '@services/renderers/newsletters/newsletter-renderer'
import { generateHTML } from '@tiptap/html'
import { createFileReadStream } from '@utils/files/create-file-read-stream'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { InvalidNewsletterContentError } from '../errors/newsletter/invalid-newsletter-content-error'
import { NewsletterHtmlReadError } from '../errors/newsletter/newsletter-html-read-error'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@injectable()
export class GetNewsletterHtmlContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,
  ) {}

  async execute({
    publicId,
  }: GetNewsletterHtmlContentUseCaseRequest): Promise<GetNewsletterHtmlContentUseCaseResponse> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    switch (newsletter.format) {
      case NewsletterFormatType.PROSEMIRROR: {
        const cachedHtml = await getNewsletterHTMLCached({ newsletterId: newsletter.id, redis })

        if (cachedHtml) return { content: cachedHtml }

        const proseContent = ensureExists({
          value: newsletter.proseContent,
          error: new InvalidNewsletterContentError(),
        })

        const bodyContent = generateHTML(proseContent as JSONContent, tiptapConfiguration)

        const activeMeeting = await this.meetingsRepository.findActiveMeeting()

        const newsletterRenderer = new NewsletterRenderer()

        const newsletterContent = newsletterRenderer.render({
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

        await setNewsletterHTMLCache({ newsletterId: newsletter.id, htmlContent: newsletterContent, redis })

        return { content: newsletterContent }
      }

      case NewsletterFormatType.HTML_FILE: {
        const fileContent = ensureExists({
          value: newsletter.fileContent,
          error: new NewsletterHtmlReadError(),
        })

        const content = ensureExists({
          value: await createFileReadStream(buildNewsletterHtmlPath(fileContent)),
          error: new NewsletterHtmlReadError(),
        })

        return { content }
      }

      default: {
        throw new InvalidFileOperationTypeError(newsletter.format satisfies never)
      }
    }
  }
}
