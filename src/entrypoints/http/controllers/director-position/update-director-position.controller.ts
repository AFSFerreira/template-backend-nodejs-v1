import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateDirectorPositionBodyType } from '@custom-types/http/schemas/director-position/update-director-position-body-schema'
import type { UpdateDirectorPositionParamsType } from '@custom-types/http/schemas/director-position/update-director-position-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateDirectorPositionUseCase } from '@use-cases/director-position/update-director-position'
import type { FastifyReply } from 'fastify'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorPositionController implements IController {
  constructor(private useCase: UpdateDirectorPositionUseCase) {}

  async handle(
    request: ZodRequest<{ body: UpdateDirectorPositionBodyType; params: UpdateDirectorPositionParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { directorPosition } = await this.useCase.execute({ publicId, data: parsedBody })

    const formattedReply = DirectorPositionDefaultPresenter.toHTTP(directorPosition)

    return await reply.sendResponse(formattedReply)
  }
}
