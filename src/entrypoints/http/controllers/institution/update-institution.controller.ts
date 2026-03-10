import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateInstitutionBodyType } from '@custom-types/http/schemas/institution/update-institution-body-schema'
import type { UpdateInstitutionParamsType } from '@custom-types/http/schemas/institution/update-institution-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateInstitutionUseCase } from '@use-cases/institution/update-institution'
import type { FastifyReply } from 'fastify'
import { InstitutionDefaultPresenter } from '@http/presenters/institution/institution-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateInstitutionController implements IController {
  constructor(private useCase: UpdateInstitutionUseCase) {}

  async handle(
    request: ZodRequest<{ body: UpdateInstitutionBodyType; params: UpdateInstitutionParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { institution } = await this.useCase.execute({ publicId, data: parsedBody })

    const formattedReply = InstitutionDefaultPresenter.toHTTP(institution)

    return await reply.sendResponse(formattedReply)
  }
}
