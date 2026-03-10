import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetInstitutionalInfoForAdminUseCase } from '@use-cases/institutional-info/get-institutional-info-for-admin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoForAdminPresenter } from '@http/presenters/institutional-info/institutional-info-for-admin.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoForAdminController implements IController {
  constructor(private useCase: GetInstitutionalInfoForAdminUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { institutionalInfo } = await this.useCase.execute()

    const formattedReply = InstitutionalInfoForAdminPresenter.toHTTP(institutionalInfo)

    return await reply.sendResponse(formattedReply)
  }
}
