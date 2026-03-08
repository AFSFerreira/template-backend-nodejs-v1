import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletterDetailedWithContent,
  NewsletterDetailedWithContentPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-detailed-with-content'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindNewsletterByPublicIdRestrictedUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id-restricted'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function findNewsletterByPublicIdRestricted(
  request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(FindNewsletterByPublicIdRestrictedUseCase)

  const { newsletter } = await useCase.execute({ publicId })

  const formattedReply = NewsletterPresenter.toHTTP<
    NewsletterDetailedWithContentPresenterInput,
    HTTPNewsletterDetailedWithContent
  >(newsletter, tsyringeTokens.presenters.newsletter.newsletterDetailedWithContent)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
