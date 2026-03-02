import type { FastifyReply, FastifyRequest } from 'fastify'
import { findNewsletterByPublicIdParamsSchema } from '@http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import { SendNewsletterEmailUseCase } from '@use-cases/newsletters/send-newsletter-email'
import { container } from 'tsyringe'

export async function sendNewsletterEmail(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findNewsletterByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(SendNewsletterEmailUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
