import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetInstitutionalInfoUseCase } from '@use-cases/institutional-info/get-institutional-info'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { InstitutionalInfoDefaultPresenter } from '@http/presenters/institutional-info/institutional-info.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoController implements IController {
  constructor(private useCase: GetInstitutionalInfoUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const { institutionalInfo } = await this.useCase.execute()

    const formattedReply = InstitutionalInfoDefaultPresenter.toHTTP(institutionalInfo)

    return await reply.sendResponse(formattedReply)
  }
}
