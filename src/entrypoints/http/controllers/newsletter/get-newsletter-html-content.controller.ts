import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { GetNewsletterHtmlContentUseCase } from '@use-cases/newsletters/get-newsletter-content'
import { container } from 'tsyringe'

export async function getNewsletterHtmlContent(
  request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(GetNewsletterHtmlContentUseCase)

  const { content } = await useCase.execute({ publicId })

  return await reply.sendHtml(content)
}
