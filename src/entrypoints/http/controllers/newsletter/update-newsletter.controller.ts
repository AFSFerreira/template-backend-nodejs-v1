import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { updateNewsletterBodySchema } from '@http/schemas/newsletter/update-newsletter-body-schema'
import { updateNewsletterParamsSchema } from '@http/schemas/newsletter/update-newsletter-params-schema'
import { UpdateNewsletterUseCase } from '@use-cases/newsletters/update-newsletter'
import { container } from 'tsyringe'

export async function updateNewsletter(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateNewsletterParamsSchema.parse(request.params)
  const parsedBody = updateNewsletterBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateNewsletterUseCase)

  const { newsletter } = await useCase.execute({
    publicId,
    body: parsedBody,
  })

  return await reply.status(200).send({
    data: NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(newsletter),
  })
}
