import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { FindNewsletterByPublicIdUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id'
import { container } from 'tsyringe'

export async function findNewsletterByPublicId(
  request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(FindNewsletterByPublicIdUseCase)

  const { newsletter } = await useCase.execute({ publicId })

  const formattedReply = NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(newsletter)

  return await reply.sendResponse(formattedReply)
}
