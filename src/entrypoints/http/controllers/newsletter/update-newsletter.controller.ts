import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { UpdateNewsletterBodyType } from '@custom-types/http/schemas/newsletter/update-newsletter-body-schema'
import type { UpdateNewsletterParamsType } from '@custom-types/http/schemas/newsletter/update-newsletter-params-schema'
import type { FastifyReply } from 'fastify'
import { NewsletterPresenter } from '@http/presenters/newsletter-presenter'
import { UpdateNewsletterUseCase } from '@use-cases/newsletters/update-newsletter'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function updateNewsletter(
  request: ZodRequest<{ body: UpdateNewsletterBodyType; params: UpdateNewsletterParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body

  const useCase = container.resolve(UpdateNewsletterUseCase)

  const { newsletter } = await useCase.execute({
    publicId,
    body: parsedBody,
  })

  return await reply.status(StatusCodes.OK).send({
    data: NewsletterPresenter.toHTTP<NewsletterDefaultPresenterInput, HTTPNewsletter>(newsletter),
  })
}
