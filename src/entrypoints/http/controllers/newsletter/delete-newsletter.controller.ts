import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteNewsletterParamsType } from '@custom-types/http/schemas/newsletter/delete-newsletter-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DeleteNewsletterUseCase } from '@use-cases/newsletters/delete-newsletter'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteNewsletterController implements IController {
  constructor(
    @inject(DeleteNewsletterUseCase)
    private readonly useCase: DeleteNewsletterUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteNewsletterParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
