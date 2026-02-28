import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NewsletterDefaultPresenter } from '@presenters/newsletter/newsletter-default.presenter'
import { NewsletterDetailedWithContentPresenter } from '@presenters/newsletter/newsletter-detailed-with-content.presenter'

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
