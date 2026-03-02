import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { getAllNewslettersQuerySchema } from '@http/schemas/newsletter/get-all-newsletters-query-schema'
import { GetAllNewslettersUseCase } from '@use-cases/newsletters/get-all-newsletters'
import { container } from 'tsyringe'

export async function getAllNewsletters(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllNewslettersQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllNewslettersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(data)

  return await reply.status(200).send({ data: formattedReply, meta })
}
