import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateDirectorBoardBodyType } from '@custom-types/http/schemas/director-board/update-director-board-body-schema'
import type { UpdateDirectorBoardParamsType } from '@custom-types/http/schemas/director-board/update-director-board-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorBoardWithUserPresenter } from '@http/presenters/director-board/director-board-with-user.presenter'
import { UpdateDirectorBoardUseCase } from '@use-cases/director-board/update-director-board'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateDirectorBoardController implements IController {
  constructor(
    @inject(UpdateDirectorBoardUseCase)
    private readonly useCase: UpdateDirectorBoardUseCase,

    @inject(DirectorBoardWithUserPresenter)
    private readonly directorBoardWithUserPresenter: DirectorBoardWithUserPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateDirectorBoardBodyType; params: UpdateDirectorBoardParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const { directorBoard } = await this.useCase.execute({
      publicId,
      data: request.body,
      requestUserPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.directorBoardWithUserPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply)
  }
}
