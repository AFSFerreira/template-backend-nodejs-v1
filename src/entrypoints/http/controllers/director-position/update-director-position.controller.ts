import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateDirectorPositionBodyType } from '@custom-types/http/schemas/director-position/update-director-position-body-schema'
import type { UpdateDirectorPositionParamsType } from '@custom-types/http/schemas/director-position/update-director-position-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { UpdateDirectorPositionUseCase } from '@use-cases/director-position/update-director-position'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateDirectorPositionController implements IController {
  constructor(
    @inject(UpdateDirectorPositionUseCase)
    private readonly useCase: UpdateDirectorPositionUseCase,

    @inject(DirectorPositionDefaultPresenter)
    private readonly directorPositionDefaultPresenter: DirectorPositionDefaultPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateDirectorPositionBodyType; params: UpdateDirectorPositionParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const { directorPosition } = await this.useCase.execute({ publicId, data: request.body })

    const formattedReply = this.directorPositionDefaultPresenter.toHTTP(directorPosition)

    return await reply.sendResponse(formattedReply)
  }
}
