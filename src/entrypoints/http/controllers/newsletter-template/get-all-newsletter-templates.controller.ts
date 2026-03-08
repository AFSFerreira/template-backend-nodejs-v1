import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletterTemplate,
  NewsletterTemplateDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter-template/newsletter-template-default'
import type { GetAllNewsletterTemplatesQueryType } from '@custom-types/http/schemas/newsletter/get-all-newsletter-templates-query-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterTemplatePresenter } from '@http/presenters/newsletter-template-presenter'
import { GetAllNewsletterTemplatesUseCase } from '@use-cases/newsletters/get-all-newsletter-templates'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getAllNewsletterTemplates(
  request: ZodRequest<{ querystring: GetAllNewsletterTemplatesQueryType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllNewsletterTemplatesUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = NewsletterTemplatePresenter.toHTTP<
    NewsletterTemplateDefaultPresenterInput,
    HTTPNewsletterTemplate
  >(data)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
