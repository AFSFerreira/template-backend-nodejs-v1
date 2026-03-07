import type { DependencyContainer } from 'tsyringe'
import { NewsletterTemplateDefaultPresenter } from '@http/presenters/newsletter-template/newsletter-template-default.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerNewsletterTemplatePresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.newsletterTemplate.newsletterTemplateDefault,
    container,
    target: NewsletterTemplateDefaultPresenter,
  })
}
