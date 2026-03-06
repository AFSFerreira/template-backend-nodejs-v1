import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteNewsletterParamsType } from '@custom-types/http/schemas/newsletter/delete-newsletter-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteNewsletterUseCase } from '@use-cases/newsletters/delete-newsletter'
import { container } from 'tsyringe'

export async function deleteNewsletter(
  request: ZodRequest<{ params: DeleteNewsletterParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteNewsletterUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
