import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { NewsletterDefaultPresenter } from '@presenters/newsletter/newsletter-default.presenter'

export function registerNewsletterPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.newsletter.newsletterDefault,
    container,
    target: NewsletterDefaultPresenter,
  })
}
