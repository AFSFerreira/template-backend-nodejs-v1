import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { createNewsletterBodySchema } from '@http/schemas/newsletter/create-newsletter-body-schema'
import { CreateNewsletterUseCase } from '@use-cases/newsletters/create-newsletter'
import { container } from 'tsyringe'

export async function createNewsletter(request: FastifyRequest, reply: FastifyReply) {
  const createNewsletterInput = createNewsletterBodySchema.parse(request.body)

  const useCase = container.resolve(CreateNewsletterUseCase)

  const { newsletter } = await useCase.execute(createNewsletterInput)

  return await reply.status(201).send({
    data: NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(newsletter),
  })
}
