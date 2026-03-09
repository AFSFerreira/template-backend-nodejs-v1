import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletterTemplate,
  NewsletterTemplateDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter-template/newsletter-template-default'
import type { FindNewsletterTemplateByPublicIdParamsType } from '@custom-types/http/schemas/newsletter-template/find-newsletter-template-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterTemplatePresenter } from '@http/presenters/newsletter-template-presenter'
import { FindNewsletterTemplateByPublicIdUseCase } from '@use-cases/newsletters/find-newsletter-template-by-public-id'
import { container } from 'tsyringe'

export async function findNewsletterTemplateByPublicId(
  request: ZodRequest<{ params: FindNewsletterTemplateByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(FindNewsletterTemplateByPublicIdUseCase)

  const { newsletterTemplate } = await useCase.execute({ publicId })

  const formattedReply = NewsletterTemplatePresenter.toHTTP<
    NewsletterTemplateDefaultPresenterInput,
    HTTPNewsletterTemplate
  >(newsletterTemplate)

  return await reply.sendResponse(formattedReply)
}
