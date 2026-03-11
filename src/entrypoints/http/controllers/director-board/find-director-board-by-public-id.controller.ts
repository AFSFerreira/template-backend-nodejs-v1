import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindDirectorBoardByPublicIdParamsType } from '@custom-types/http/schemas/director-board/find-director-board-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DirectorBoardWithUserPresenter } from '@http/presenters/director-board/director-board-with-user.presenter'
import { FindDirectorBoardByPublicIdUseCase } from '@use-cases/director-board/find-by-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindDirectorBoardByPublicIdController implements IController {
  constructor(
    @inject(FindDirectorBoardByPublicIdUseCase)
    private readonly useCase: FindDirectorBoardByPublicIdUseCase,

    @inject(DirectorBoardWithUserPresenter)
    private readonly directorBoardWithUserPresenter: DirectorBoardWithUserPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindDirectorBoardByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { directorBoard } = await this.useCase.execute({ publicId })

    const formattedReply = this.directorBoardWithUserPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply)
  }
}
