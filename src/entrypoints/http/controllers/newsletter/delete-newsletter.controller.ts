import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteNewsletterParamsSchema } from '@http/schemas/newsletter/delete-newsletter-params-schema'
import { DeleteNewsletterUseCase } from '@use-cases/newsletters/delete-newsletter'
import { container } from 'tsyringe'

export async function deleteNewsletter(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = deleteNewsletterParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteNewsletterUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
