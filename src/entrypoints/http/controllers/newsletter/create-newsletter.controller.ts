import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { CreateNewsletterBodyType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { CreateNewsletterUseCase } from '@use-cases/newsletters/create-newsletter'
import { container } from 'tsyringe'

export async function createNewsletter(request: ZodRequest<{ body: CreateNewsletterBodyType }>, reply: FastifyReply) {
  const createNewsletterInput = request.body

  const useCase = container.resolve(CreateNewsletterUseCase)

  const { newsletter } = await useCase.execute(createNewsletterInput)

  return await reply.status(201).send({
    data: NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(newsletter),
  })
}
