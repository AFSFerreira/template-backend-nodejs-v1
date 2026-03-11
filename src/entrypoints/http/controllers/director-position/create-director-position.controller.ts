import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateDirectorPositionBodyType } from '@custom-types/http/schemas/director-position/create-director-position-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { CreateDirectorPositionUseCase } from '@use-cases/director-position/create-director-position'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateDirectorPositionController implements IController {
  constructor(
    @inject(CreateDirectorPositionUseCase)
    private readonly useCase: CreateDirectorPositionUseCase,

    @inject(DirectorPositionDefaultPresenter)
    private readonly directorPositionDefaultPresenter: DirectorPositionDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateDirectorPositionBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { directorPosition } = await this.useCase.execute(parsedBody)

    const formattedReply = this.directorPositionDefaultPresenter.toHTTP(directorPosition)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
