import type { FastifyReply, FastifyRequest } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { findNewsletterByPublicIdParamsSchema } from '@schemas/newsletter/find-newsletter-by-public-id-params-schema'
import { GetNewsletterHtmlContentUseCase } from '@use-cases/newsletters/get-newsletter-content'
import { container } from 'tsyringe'

export async function getNewsletterHtmlContent(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findNewsletterByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(GetNewsletterHtmlContentUseCase)

  const { content } = await useCase.execute({ publicId })

  return await reply.type(HTML_HEADER).send(content)
}
