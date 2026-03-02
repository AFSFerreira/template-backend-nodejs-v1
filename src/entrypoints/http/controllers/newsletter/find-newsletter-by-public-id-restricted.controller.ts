import type {
  HTTPNewsletterDetailedWithContent,
  NewsletterDetailedWithContentPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-detailed-with-content'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { findNewsletterByPublicIdParamsSchema } from '@http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FindNewsletterByPublicIdRestrictedUseCase } from '@use-cases/newsletters/find-newsletter-by-public-id-restricted'
import { container } from 'tsyringe'

export async function findNewsletterByPublicIdRestricted(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = findNewsletterByPublicIdParamsSchema.parse(request.params)

  const useCase = container.resolve(FindNewsletterByPublicIdRestrictedUseCase)

  const { newsletter } = await useCase.execute({ publicId })

  const formattedReply = NewsletterPresenter.toHTTP<
    NewsletterDetailedWithContentPresenterInput,
    HTTPNewsletterDetailedWithContent
  >(newsletter, tsyringeTokens.presenters.newsletter.newsletterDetailedWithContent)

  return await reply.status(200).send({ data: formattedReply })
}
