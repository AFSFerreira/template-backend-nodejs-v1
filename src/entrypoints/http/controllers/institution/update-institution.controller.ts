import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateInstitutionBodyType } from '@custom-types/http/schemas/institution/update-institution-body-schema'
import type { UpdateInstitutionParamsType } from '@custom-types/http/schemas/institution/update-institution-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { InstitutionDefaultPresenter } from '@http/presenters/institution/institution-default.presenter'
import { UpdateInstitutionUseCase } from '@use-cases/institution/update-institution'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateInstitutionController implements IController {
  constructor(
    @inject(UpdateInstitutionUseCase)
    private readonly useCase: UpdateInstitutionUseCase,

    @inject(InstitutionDefaultPresenter)
    private readonly institutionDefaultPresenter: InstitutionDefaultPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateInstitutionBodyType; params: UpdateInstitutionParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const { institution } = await this.useCase.execute({ publicId, data: request.body })

    const formattedReply = this.institutionDefaultPresenter.toHTTP(institution)

    return await reply.sendResponse(formattedReply)
  }
}
