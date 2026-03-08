import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { PreviewNewsletterContentBodyType } from '@custom-types/http/schemas/newsletter/preview-newsletter-content-body-schema'
import type { FastifyReply } from 'fastify'
import { PreviewNewsletterContentUseCase } from '@use-cases/newsletters/preview-newsletter-content'
import { container } from 'tsyringe'

export async function previewNewsletterContent(
  request: ZodRequest<{ body: PreviewNewsletterContentBodyType }>,
  reply: FastifyReply,
) {
  const useCase = container.resolve(PreviewNewsletterContentUseCase)

  const { html } = await useCase.execute(request.body)

  return await reply.sendHtml(html)
}
