import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoDefaultPresenter } from '@http/presenters/institutional-info/institutional-info.presenter'
import { GetInstitutionalInfoUseCase } from '@use-cases/institutional-info/get-institutional-info'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetInstitutionalInfoController implements IController {
  constructor(
    @inject(GetInstitutionalInfoUseCase)
    private readonly useCase: GetInstitutionalInfoUseCase,

    @inject(InstitutionalInfoDefaultPresenter)
    private readonly institutionalInfoDefaultPresenter: InstitutionalInfoDefaultPresenter,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { institutionalInfo } = await this.useCase.execute()

    const formattedReply = this.institutionalInfoDefaultPresenter.toHTTP(institutionalInfo)

    return await reply.sendResponse(formattedReply)
  }
}
