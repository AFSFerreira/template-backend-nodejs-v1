import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateDirectorBoardBodyType } from '@custom-types/http/schemas/director-board/create-director-board-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { CreateDirectorBoardUseCase } from '@use-cases/director-board/create-director-board'
import { getClientIp } from '@utils/http/get-client-ip'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateDirectorBoardController implements IController {
  constructor(
    @inject(CreateDirectorBoardUseCase)
    private readonly useCase: CreateDirectorBoardUseCase,

    @inject(DirectorBoardDefaultPresenter)
    private readonly directorBoardDefaultPresenter: DirectorBoardDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateDirectorBoardBodyType }>, reply: FastifyReply) {
    const { directorBoard } = await this.useCase.execute({
      ...request.body,
      audit: {
        actorPublicId: getRequestUserPublicId(request),
        ipAddress: getClientIp(request),
      },
    })

    const formattedReply = this.directorBoardDefaultPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
