import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteNewsletterParamsType } from '@custom-types/http/schemas/newsletter/delete-newsletter-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { DeleteNewsletterUseCase } from '@use-cases/newsletters/delete-newsletter'
import type { FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class DeleteNewsletterController implements IController {
  constructor(private useCase: DeleteNewsletterUseCase) {}

  async handle(request: ZodRequest<{ params: DeleteNewsletterParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
