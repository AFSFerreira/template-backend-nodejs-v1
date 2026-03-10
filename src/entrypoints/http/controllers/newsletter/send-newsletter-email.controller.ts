import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindNewsletterByPublicIdParamsType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { SendNewsletterEmailUseCase } from '@use-cases/newsletters/send-newsletter-email'
import type { FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class SendNewsletterEmailController implements IController {
  constructor(private useCase: SendNewsletterEmailUseCase) {}

  async handle(request: ZodRequest<{ params: FindNewsletterByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
