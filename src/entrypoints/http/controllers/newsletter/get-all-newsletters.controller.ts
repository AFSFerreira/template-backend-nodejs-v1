import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { GetAllNewslettersQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletters-query-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { GetAllNewslettersUseCase } from '@use-cases/newsletters/get-all-newsletters'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllNewsletters(
  request: ZodRequest<{ querystring: GetAllNewslettersQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllNewslettersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(data)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
