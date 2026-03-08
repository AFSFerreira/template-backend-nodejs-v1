import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { SendNewsletterEmailUseCase } from '@use-cases/newsletters/send-newsletter-email'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function sendNewsletterEmail(
  request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(SendNewsletterEmailUseCase)

  await useCase.execute({ publicId })

  return await reply.status(StatusCodes.NO_CONTENT).send()
}
