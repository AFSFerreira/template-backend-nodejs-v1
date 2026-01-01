import type { HTTPNewsletter } from '@custom-types/presenter/newsletter/newsletter-default'
import type { Newsletter } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@presenters/variants/newsletter-presenter'
import { getAllNewslettersQuerySchema } from '@schemas/newsletter/get-all-newsletters-query-schema'
import { GetAllNewslettersUseCase } from '@use-cases/newsletters/get-all-newsletters'
import { container } from 'tsyringe'

export async function getAllNewsletters(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllNewslettersQuerySchema.parse(request.query)

  const useCase = container.resolve(GetAllNewslettersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = NewsletterPresenter.toHTTP<Newsletter, HTTPNewsletter>(data)

  return await reply.status(200).send({ data: formattedReply, meta })
}
