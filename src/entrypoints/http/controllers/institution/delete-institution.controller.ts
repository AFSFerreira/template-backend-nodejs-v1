import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteInstitutionParamsType } from '@custom-types/http/schemas/institution/delete-institution-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DeleteInstitutionUseCase } from '@use-cases/institution/delete-institution'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteInstitutionController implements IController {
  constructor(
    @inject(DeleteInstitutionUseCase)
    private readonly useCase: DeleteInstitutionUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteInstitutionParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
