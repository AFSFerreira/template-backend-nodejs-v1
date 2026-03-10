import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateDirectorPositionBodyType } from '@custom-types/http/schemas/director-position/create-director-position-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { CreateDirectorPositionUseCase } from '@use-cases/director-position/create-director-position'
import type { FastifyReply } from 'fastify'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class CreateDirectorPositionController implements IController {
  constructor(private useCase: CreateDirectorPositionUseCase) {}

  async handle(request: ZodRequest<{ body: CreateDirectorPositionBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { directorPosition } = await this.useCase.execute(parsedBody)

    const formattedReply = DirectorPositionDefaultPresenter.toHTTP(directorPosition)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
