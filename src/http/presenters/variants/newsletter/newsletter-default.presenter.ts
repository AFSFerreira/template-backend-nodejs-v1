import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPNewsletter } from '@custom-types/presenter/newsletter/newsletter-default'
import type { Newsletter } from '@prisma/client'

export class NewsletterDefaultPresenter implements IPresenterStrategy<Newsletter, HTTPNewsletter> {
  public toHTTP(input: Newsletter): HTTPNewsletter {
    return {
      id: input.publicId,
      content: input.content,
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      volume: input.volume,
      commentsQuantity: input.commentsQuantity,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
