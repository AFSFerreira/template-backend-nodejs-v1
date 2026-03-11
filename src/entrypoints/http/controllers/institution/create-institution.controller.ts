import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateInstitutionBodyType } from '@custom-types/http/schemas/institution/create-institution-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { InstitutionDefaultPresenter } from '@http/presenters/institution/institution-default.presenter'
import { CreateInstitutionUseCase } from '@use-cases/institution/create-institution'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateInstitutionController implements IController {
  constructor(
    @inject(CreateInstitutionUseCase)
    private readonly useCase: CreateInstitutionUseCase,

    @inject(InstitutionDefaultPresenter)
    private readonly institutionDefaultPresenter: InstitutionDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateInstitutionBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { institution } = await this.useCase.execute(parsedBody)

    const formattedReply = this.institutionDefaultPresenter.toHTTP(institution)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
