import type { HTTPNewsletter } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { Newsletter } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@presenters/newsletter-presenter'
import { updateNewsletterBodySchema } from '@schemas/newsletter/update-newsletter-body-schema'
import { updateNewsletterParamsSchema } from '@schemas/newsletter/update-newsletter-params-schema'
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
    data: NewsletterPresenter.toHTTP<Newsletter, HTTPNewsletter>(newsletter),
  })
}
