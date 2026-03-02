import type { DependencyContainer } from 'tsyringe'
import { NewsletterDefaultPresenter } from '@http/presenters/newsletter/newsletter-default.presenter'
import { NewsletterDetailedWithContentPresenter } from '@http/presenters/newsletter/newsletter-detailed-with-content.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerNewsletterPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.newsletter.newsletterDefault,
    container,
    target: NewsletterDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.newsletter.newsletterDetailedWithContent,
    container,
    target: NewsletterDetailedWithContentPresenter,
  })
}
