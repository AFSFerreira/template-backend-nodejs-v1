import type { HTTPNewsletter } from '@custom-types/presenter/newsletter/newsletter-default'
import type { Newsletter } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@presenters/newsletter-presenter'
import { findNewsletterByPublicIdParamsSchema } from '@schemas/newsletter/find-newsletter-by-public-id-params-schema'
import { FindNewsletterByPublicIdUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id'
import { container } from 'tsyringe'

export async function findNewsletterByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findNewsletterByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindNewsletterByPublicIdUseCase)

  const { newsletter } = await useCase.execute({ publicId })

  const formattedReply = NewsletterPresenter.toHTTP<Newsletter, HTTPNewsletter>(newsletter)

  return await reply.status(200).send({ data: formattedReply })
}
