import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindDirectorBoardByPublicIdParamsType } from '@custom-types/http/schemas/director-board/find-director-board-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FindDirectorBoardByPublicIdUseCase } from '@use-cases/director-board/find-by-public-id'
import type { FastifyReply } from 'fastify'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class FindDirectorBoardByPublicIdController implements IController {
  constructor(private useCase: FindDirectorBoardByPublicIdUseCase) {}

  async handle(request: ZodRequest<{ params: FindDirectorBoardByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { directorBoard } = await this.useCase.execute({ publicId })

    const formattedReply = DirectorBoardDefaultPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply)
  }
}
