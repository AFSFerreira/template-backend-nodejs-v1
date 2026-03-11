import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateDirectorBoardBodyType } from '@custom-types/http/schemas/director-board/update-director-board-body-schema'
import type { UpdateDirectorBoardParamsType } from '@custom-types/http/schemas/director-board/update-director-board-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { UpdateDirectorBoardUseCase } from '@use-cases/director-board/update-director-board'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorBoardController implements IController {
  constructor(
    @inject(UpdateDirectorBoardUseCase)
    private readonly useCase: UpdateDirectorBoardUseCase,

    @inject(DirectorBoardDefaultPresenter)
    private readonly directorBoardDefaultPresenter: DirectorBoardDefaultPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateDirectorBoardBodyType; params: UpdateDirectorBoardParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const requestUserPublicId = getRequestUserPublicId(request)
    const { directorBoard } = await this.useCase.execute({
      publicId,
      data: parsedBody,
      requestUserPublicId,
    })

    const formattedReply = this.directorBoardDefaultPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply)
  }
}
