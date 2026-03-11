import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoForAdminPresenter } from '@http/presenters/institutional-info/institutional-info-for-admin.presenter'
import { GetInstitutionalInfoForAdminUseCase } from '@use-cases/institutional-info/get-institutional-info-for-admin'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetInstitutionalInfoForAdminController implements IController {
  constructor(
    @inject(GetInstitutionalInfoForAdminUseCase)
    private readonly useCase: GetInstitutionalInfoForAdminUseCase,

    @inject(InstitutionalInfoForAdminPresenter)
    private readonly institutionalInfoForAdminPresenter: InstitutionalInfoForAdminPresenter,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { institutionalInfo } = await this.useCase.execute()

    const formattedReply = this.institutionalInfoForAdminPresenter.toHTTP(institutionalInfo)

    return await reply.sendResponse(formattedReply)
  }
}
