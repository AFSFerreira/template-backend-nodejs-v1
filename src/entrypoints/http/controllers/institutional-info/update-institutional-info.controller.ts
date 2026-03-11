import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateInstitutionalInfoBodyType } from '@custom-types/http/schemas/institutional-info/update-institutional-info-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { InstitutionalInfoDefaultPresenter } from '@http/presenters/institutional-info/institutional-info.presenter'
import { UpdateInstitutionalInfoUseCase } from '@use-cases/institutional-info/update-institutional-info'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateInstitutionalInfoController implements IController {
  constructor(
    @inject(UpdateInstitutionalInfoUseCase)
    private readonly useCase: UpdateInstitutionalInfoUseCase,

    @inject(InstitutionalInfoDefaultPresenter)
    private readonly institutionalInfoDefaultPresenter: InstitutionalInfoDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: UpdateInstitutionalInfoBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { institutionalInfo } = await this.useCase.execute({ data: parsedBody })

    const formattedReply = this.institutionalInfoDefaultPresenter.toHTTP(institutionalInfo)

    return await reply.sendResponse(formattedReply)
  }
}
