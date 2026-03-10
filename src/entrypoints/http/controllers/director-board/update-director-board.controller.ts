import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateDirectorBoardBodyType } from '@custom-types/http/schemas/director-board/update-director-board-body-schema'
import type { UpdateDirectorBoardParamsType } from '@custom-types/http/schemas/director-board/update-director-board-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UpdateDirectorBoardUseCase } from '@use-cases/director-board/update-director-board'
import type { FastifyReply } from 'fastify'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorBoardController implements IController {
  constructor(private useCase: UpdateDirectorBoardUseCase) {}

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

    const formattedReply = DirectorBoardDefaultPresenter.toHTTP(directorBoard)

    return await reply.sendResponse(formattedReply)
  }
}
