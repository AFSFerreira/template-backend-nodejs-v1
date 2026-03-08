import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/http/presenter/director-board/director-board-with-user'
import type { UpdateDirectorBoardBodyType } from '@custom-types/http/schemas/director-board/update-director-board-body-schema'
import type { UpdateDirectorBoardParamsType } from '@custom-types/http/schemas/director-board/update-director-board-params-schema'
import type { FastifyReply } from 'fastify'
import { DirectorBoardPresenter } from '@http/presenters/director-board-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UpdateDirectorBoardUseCase } from '@use-cases/director-board/update-director-board'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function updateDirectorBoard(
  request: ZodRequest<{ body: UpdateDirectorBoardBodyType; params: UpdateDirectorBoardParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body
  const requestUserPublicId = getRequestUserPublicId(request)

  const useCase = container.resolve(UpdateDirectorBoardUseCase)

  const { directorBoard } = await useCase.execute({
    publicId,
    data: parsedBody,
    requestUserPublicId,
  })

  const formattedReply = DirectorBoardPresenter.toHTTP<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>(
    directorBoard,
    tsyringeTokens.presenters.directorBoard.directorBoardWithUser,
  )

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
