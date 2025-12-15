import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPNewsletter } from '@custom-types/presenter/newsletter/newsletter-default'
import type { Newsletter } from '@prisma/client'
import { NEWSLETTER_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(NEWSLETTER_DEFAULT_PRESENTER_KEY)
export class NewsletterDefaultPresenter implements IPresenterStrategy<Newsletter, HTTPNewsletter> {
  public toHTTP(input: Newsletter): HTTPNewsletter {
    return {
      publicId: input.publicId,
      title: input.title,
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      volume: input.volume,
      commentsQuantity: input.commentsQuantity,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
